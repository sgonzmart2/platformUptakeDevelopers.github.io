import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DMPlatformTableItem } from '../../models/model-dm-platform';
import { FunctionsComponent } from '../../utilities/functions';
import { PlatformsDOAService } from 'src/app/api/DOA/platforms-doa.service';
import { ContextualQuestion } from 'src/app/models/contextual_question';
import { ContextualPotentialAnswerWithChecked } from 'src/app/models/contextual_potential_answer'
import { PlatformCompleteDetails, PlatformCompleteDetailsClass, PlatformContextualWithAnswersProvied } from 'src/app/models/platform';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';
import *  as constants from '../../utilities/constants';

@Component({
  selector: 'app-dm-platform',
  templateUrl: './dm-platform.component.html',
  styleUrls: ['./dm-platform.component.css']
})
export class DmPlatformComponent implements OnInit {
  f = new FunctionsComponent();
  isAdmin = false;
  listOfContextualQuestions: ContextualQuestion[];
  tableDataSource: MatTableDataSource<DMPlatformTableItem>;
  allDataTableItems: DMPlatformTableItem[];
  columnsTitle: string[] = ['name', 'platform_flagged', 'description', 'contextual_info', 'edit_button'];
  showNewPlatform = false;
  isNewPlatform = false;
  listPlatforms: PlatformCompleteDetails[] = []
  isLoading = true;
  isSaving = false;
  indexPlatSelected;
  disableSave = false;

  platformSelected;
  contextualQuestionPSelected: PlatformContextualWithAnswersProvied[] = [];
  selectedFile: File;
  bRemoveLogo = false;
  uploadErrorMsg;
  isInvalidFile = false;
  urlImage;
  extension;
  logoLoaded = false;
  numUserPlatforms = 0;
  // platformForm: FormGroup;
  platformForm = new FormGroup({
    platform_title: new FormControl(''),
    platform_description: new FormControl(''),
    contextualQList: new FormArray([])
  })

  constructor(private platformServices: PlatformsDOAService,
    private formBuilder: FormBuilder,
    private secureStorage: EncryptedStorageService) {
    let user = JSON.parse(this.secureStorage.decryptSecureStorage(constants.user_info));
    let f = new FunctionsComponent();
    this.isAdmin = f.getRol(user.role_id) == constants.rol.GAdmin || f.getRol(user.role_id) == constants.rol.PAdmin
    this.numUserPlatforms = user.corresponding_platform_id.length

    this.listOfContextualQuestions = this.f.getValidContextualQuestions();
    if (this.isAdmin) {
      this.getPlatformsList();
    }
    else {
      this.getPlatformOwnerDetails(user)
    }
  }

  ngOnInit() {
  }

  patch() {
    const control = <FormArray>this.platformForm.get('contextualQList');
    this.listOfContextualQuestions.forEach(qContextual => {
      control.push(this.patchValues(qContextual.question_id, -1))
    });
  }

  patchValues(qId, qAnsId) {
    return this.formBuilder.group({
      question_id: [qId],
      question_answer_id: [qAnsId]
    })
  }

  selectAnswer(answerId, qId) {
    const contextualQListForm = this.platformForm.get('contextualQList') as FormArray;
    let index = contextualQListForm.value.findIndex(x => x.question_id === qId);
    if (index != -1) {
      contextualQListForm.value[index].question_answer_id = answerId
    }
    else {
      contextualQListForm.push(this.patchValues(qId, answerId))
    }
  }

  getPlatformsList() {
    this.platformServices.getPlatformWithCQ().subscribe(
      response => {
        this.listPlatforms = response['platforms'];
        this.updateDataSource();
      })
  }

  getPlatformOwnerDetails(user) {
    this.listPlatforms = []

    user.corresponding_platform_id.forEach(id => {
      this.platformServices.getPlatformWithCQByID(id).subscribe(
        response => {
          this.listPlatforms.push(response['platforms'][0])
          this.updateDataSource();
        })
    })

  }

  updateDataSource() {
    this.allDataTableItems = [];
    let numContextualQuestions = this.listOfContextualQuestions.length;
    let indexPlatform = 0;
    this.listPlatforms.forEach(item => {

      let tableItem: DMPlatformTableItem;
      let contextual_info = ""


      let contexQComplete = 0;
      item.contextual_answers.forEach(cQ => {
        let index = this.listOfContextualQuestions.findIndex(x => x.question_id === cQ.question_id)
        if (index > -1) {
          contexQComplete++;
        }
      })

      if (contexQComplete == numContextualQuestions) {
        contextual_info = "Complete: " + contexQComplete + " of " + numContextualQuestions;
      }
      else {
        contextual_info = "Incomplete: " + contexQComplete + " of " + numContextualQuestions
      }
      let imgUrl;
      if (item.platform_logo_URL == "https://pu.ijs.si:80/api/O0/") {
        imgUrl = "";
        item.platform_logo_URL = "";
      }
      else { imgUrl = item.platform_logo_URL }
      tableItem = {
        platform_id: item.platform_id,
        platform_logo_URL: imgUrl,
        platform_title: item.platform_title,
        platform_description: item.platform_description,
        platform_flagged: item.flagged,
        contextual_info: contextual_info,
        platform_index: indexPlatform
      }
      indexPlatform++;
      this.allDataTableItems.push(tableItem);
      this.isLoading = false;
    });
    this.tableDataSource = new MatTableDataSource(this.allDataTableItems);
    this.tableDataSource.filterPredicate = (data: DMPlatformTableItem, filter: string) => {
      return true;
    }

    if (this.numUserPlatforms == 1) {
      this.edit(0)
    }
  }

  changeView() {
    this.disableSave = false;
    this.isSaving = false;
    this.isNewPlatform = true;
    this.edit(-1)
  }

  cancel() {
    if (this.isAdmin) {
      this.disableSave = false;
      this.isSaving = false;
      this.showNewPlatform = false;
      this.platformSelected = new PlatformCompleteDetailsClass();
      this.contextualQuestionPSelected = [];
      this.updateDataSource();
    }
    else if (this.numUserPlatforms >= 1) {
      this.disableSave = false;
      this.isSaving = false;
      this.showNewPlatform = false;
      this.platformSelected = new PlatformCompleteDetailsClass();
      this.contextualQuestionPSelected = [];
      this.updateDataSource();

    }
    else {
      this.showNewPlatform = false;
      this.edit(0)
    }
  }

  edit(indexPlat) {
    this.disableSave = false;
    this.isSaving = false;
    this.indexPlatSelected = indexPlat;
    this.selectedFile = undefined;
    this.isInvalidFile = false;
    this.showNewPlatform = !this.showNewPlatform;
    if (indexPlat > -1) {
      this.isNewPlatform = false;
      this.platformSelected = this.listPlatforms[indexPlat]
      this.urlImage = this.platformSelected.platform_logo_URL;
      this.logoLoaded = true;


    }
    else {
      this.platformSelected = new PlatformCompleteDetailsClass();
      this.platformSelected.flagged = false;
      this.urlImage = ""
    };

    this.initForm();
    this.contextualQuestionPSelected = [];
    this.listOfContextualQuestions.forEach(item => {
      let indexAnswer = -1;
      if (this.platformSelected.contextual_answers != undefined) {
        indexAnswer = this.platformSelected.contextual_answers.findIndex(x => x.question_id === item.question_id);
      }
      let aux = {} as PlatformContextualWithAnswersProvied;
      aux.question_title = item.question_title;
      aux.question_id = item.question_id;
      aux.question_answer_id = -1;
      aux.potential_answers = [];
      item.potential_answers.forEach(pAns => {
        let cAnswerChecked = {} as ContextualPotentialAnswerWithChecked;
        cAnswerChecked.answer_id = pAns.answer_id;
        cAnswerChecked.answer_orderofappearance = pAns.answer_orderofappearance;
        cAnswerChecked.answer_title = pAns.answer_title;
        cAnswerChecked.checked = false;
        if (indexAnswer > -1) {
          aux.question_answer_id = this.platformSelected.contextual_answers[indexAnswer].question_answer_id;
          if (aux.question_answer_id == pAns.answer_id) {
            this.selectAnswer(cAnswerChecked.answer_id, aux.question_id)
            cAnswerChecked.checked = true;

          }
        }
        aux.potential_answers.push(cAnswerChecked);
      })
      /*
            if (this.platformSelected.contextual_answers != undefined) {
             
              if (index > -1) {
                aux.question_answer_id = ;
                aux.question_answer_title = this.platformSelected.contextual_answers[index].question_answer_title;
                aux.question_id = this.platformSelected.contextual_answers[index].question_id;
              }
            }
      
      */
      this.contextualQuestionPSelected.push(aux)
    })
  }


  onFileSelected(imageInput) {
    this.uploadErrorMsg = null;
    this.isInvalidFile = false;
    this.urlImage = "";
    this.selectedFile = <File>imageInput.target.files[0];

    this.logoLoaded = false;
    //this.onUpload(imageFor);

    const files = imageInput.target.files;
    if (files.length === 0)
      return;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.uploadErrorMsg = "Only images are supported.";
      this.bRemoveLogo = true;
      this.isInvalidFile = true;
      return;
    }

    const reader = new FileReader();
    //this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.urlImage = reader.result;
      this.logoLoaded = true;
      this.extension = files[0].name;
    }
  }

  removeLogo() {
    this.uploadErrorMsg = null;
    this.isInvalidFile = false;
    this.urlImage = "";
    this.bRemoveLogo = true;
    this.logoLoaded = false;
  }

  save() {
    this.isSaving = true;

    this.disableSave = true;
    let body = {} as PlatformCompleteDetails;
    if (this.platformSelected.platform_id != undefined) {
      body.platform_id = this.platformSelected.platform_id;
      if (this.platformSelected.platform_logo_URL != null || this.platformSelected.platform_logo_URL != undefined) {
        if (!this.bRemoveLogo) {
          body.platform_logo_URL = this.platformSelected.platform_logo_URL.replace("https://pu.ijs.si:80/api/O0/", '');

        }
        else {
          this.platformSelected.platform_logo_URL = ""
          body.platform_logo_URL = "";
        }
      }
    }
    else {
      body.platform_logo_URL = "";
    }


    body.platform_title = this.platformForm.value['platform_title'];
    body.platform_description = this.platformForm.value['platform_description'];
    body.flagged = this.platformSelected.flagged;
    body.contextual_answers = [];
    body.contextual_answers = this.platformForm.value['contextualQList']
    this.platformSelected.platform_title = body.platform_title;
    this.platformSelected.platform_description = body.platform_description;
    if (this.isNewPlatform) {
      this.platformServices.insertNewPlatform(body).subscribe(
        response => {
          let idPlatformInserted = response.platform_id;

          this.platformSelected.platform_id = idPlatformInserted;
          this.platformSelected.contextual_answers = body.contextual_answers

          //this.listPlatforms[this.indexPlatSelected] = this.platformSelected;
          this.updateDataSource();

          if (this.logoLoaded) {
            let name = this.platformSelected.platform_title + "_" + this.extension
            const fd = new FormData();
            fd.append('logo', this.selectedFile);
            fd.append('platform_id', idPlatformInserted);
            fd.append('name', name);
            this.platformServices.uploadNewPlatformImage(fd).subscribe(response => {
              this.platformSelected.platform_logo_URL = "https://pu.ijs.si:80/api/O0/" + name
              this.listPlatforms.push(this.platformSelected)
              this.cancel();
            },
              error => {
                console.log("error new saving image", error)
                this.listPlatforms.push(this.platformSelected)
                //this.statisticsService.updateStatisticsListInfo;
              });
          }
          else {
            this.listPlatforms.push(this.platformSelected)
            this.cancel();
          }
        },
        error => {
          console.log("error new platform", error)
          //this.statisticsService.updateStatisticsListInfo;
        });
    }
    else {
      this.platformServices.updatePlatformInfo(body).subscribe(
        response => {
          this.platformSelected.contextual_answers = body.contextual_answers

          this.updateDataSource();

          if (this.selectedFile != undefined) {
            let name = this.platformSelected.platform_title + "_" + this.extension
            const fd = new FormData();
            fd.append('logo', this.selectedFile);
            fd.append('platform_id', this.platformSelected.platform_id);
            fd.append('name', name);

            this.platformServices.uploadNewPlatformImage(fd).subscribe(response => {
              this.platformSelected.platform_logo_URL = "https://pu.ijs.si:80/api/O0/" + name
              this.listPlatforms[this.indexPlatSelected] = this.platformSelected;
              this.cancel();
            })
          }
          else {
            this.listPlatforms[this.indexPlatSelected] = this.platformSelected;
            this.cancel();
          }

        },
        error => {
          console.log("error update platform", error)
          //this.statisticsService.updateStatisticsListInfo;
        });
    }
  }

  initForm() {
    let title;
    let description;
    if (this.platformSelected.platform_id != undefined) {
      title = this.platformSelected.platform_title;
      description = this.platformSelected.platform_description
    }
    this.platformForm = this.formBuilder.group({
      platform_title: [title, Validators.required],
      platform_description: [description],
      contextualQList: new FormArray([])
    })
  }
}
