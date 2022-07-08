import { Component, OnInit } from '@angular/core';
import *  as constants from '../../utilities/constants';
import { ContextualQuestion, ContextualQuestionClass, ContextualQuestionToSave, itemSaveOrderCQ, saveOrderArrayCQ } from 'src/app/models/contextual_question';
import { ContextualQDOAService } from 'src/app/api/DOA/contextual-q-doa.service';
import { ContextualPotentialAnswer } from 'src/app/models/contextual_potential_answer';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

@Component({
  selector: 'app-dm-contextual',
  templateUrl: './dm-contextual.component.html',
  styleUrls: ['./dm-contextual.component.css']
})
export class DmContextualComponent implements OnInit {
  initalList: ContextualQuestion[];
  showNewContextualQ = false;
  submitted = false;
  errorMsg = "";
  all_contextualQs: ContextualQuestion[] = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_contextualQuestions));
  contextualQ_selected: ContextualQuestion;

  potential_answers: ContextualPotentialAnswer[] = [];
  newCQ = false;

  showSaveButton = false;
  constructor(private contextualQDoa: ContextualQDOAService,
    private secureStorage: EncryptedStorageService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.contextualQDoa.getContextualQList().subscribe(
      response => {
        let list = response['contextual_questions'];

        list.sort(function (a, b) {
          return a.question_orderofappearance - b.question_orderofappearance;
        });


        list.forEach(cQ => {
          let listAnswers = cQ.potential_answers;
          listAnswers.sort(function (a, b) {
            return a.answer_orderofappearance - b.answer_orderofappearance;
          });
          cQ.potential_answers = listAnswers;
          cQ.originalOrder = cQ.question_orderofappearance;
        })
        this.secureStorage.secureLocalStorage(constants.lSN_contextualQuestions, JSON.stringify(list))
        this.initalList = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_contextualQuestions));
        this.all_contextualQs = list;
        let orderList = [];
        list.forEach(cQ => { orderList.push(cQ.question_orderofappearance) });

      });
  }

  onSubmit() { }

  edit(data: ContextualQuestion) {
    this.errorMsg = "";
    this.newCQ = false;
    this.contextualQ_selected = data;
    this.potential_answers = data.potential_answers;
    this.showNewContextualQ = !this.showNewContextualQ;
  }

  save() {

    let body = this.createBody(this.contextualQ_selected);
    if (this.newCQ) {
      this.contextualQDoa.insertNewContextualQuestion(body).subscribe(
        response => {
          this.changeView();
          //this.statisticsService.updateStatisticsListInfo;
        },
        error => {
          this.errorMsg = "Status: " + error.status + " error msg: " + error.error.msg
          console.log("error", error)
          //this.statisticsService.updateStatisticsListInfo;
        });
    }
    else {
      this.contextualQDoa.updateListContextualQuestion(body).subscribe(
        response => {
          this.changeView();
          //this.statisticsService.updateStatisticsListInfo;
        },
        error => {
          this.errorMsg = "Status: " + error.status + " error msg: " + error.error.msg;
          console.log("error", error)
          //this.statisticsService.updateStatisticsListInfo;
        });
    }

    this.newCQ = false;
  }

  cancel() {
    this.errorMsg = "";
    this.newCQ = false;
    this.loadData();
    this.potential_answers = [];
    this.showNewContextualQ = false;
  }

  changeView() {
    this.errorMsg = "";
    this.newCQ = true;
    this.contextualQ_selected = new ContextualQuestionClass();
    this.potential_answers = [];
    this.contextualQ_selected.flagged = false;
    this.addNewPotentialAnswers(2);
    this.showNewContextualQ = !this.showNewContextualQ;
  }

  addNewPotentialAnswers(num) {
    let order = this.potential_answers.length;
    for (var i = 0; i < num; i++) {
      let newPotentialAnswer = {} as ContextualPotentialAnswer;
      newPotentialAnswer.answer_orderofappearance = i + 1 + order;
      this.potential_answers.push(newPotentialAnswer)
    }
  }

  removePotentialAnswers(i) {
    this.potential_answers.splice(i, 1);
  }

  saveOrder() {
    this.showSaveButton = false;
    let contextQToUpdateOrders = {} as saveOrderArrayCQ;

    let arrayOrder: itemSaveOrderCQ[] = []
    this.all_contextualQs.forEach(cQuest => {
      let itemSaveOrderCQ = {} as itemSaveOrderCQ;
      //let cQuestionChangeOrder = {} as ContextualQuestion;
      if (cQuest.originalOrder != cQuest.question_orderofappearance) {
        itemSaveOrderCQ.question_id = cQuest.question_id;
        itemSaveOrderCQ.orderofappearance = cQuest.question_orderofappearance;
        arrayOrder.push(itemSaveOrderCQ);
      }
    })

    contextQToUpdateOrders.questions_order = arrayOrder;

    this.contextualQDoa.updateOrderContextualQuestions(contextQToUpdateOrders).subscribe(
      response => {
        //this.changeView();
        this.loadData();
        //this.statisticsService.updateStatisticsListInfo;
      },
      error => {
        console.log("error", error)
        //this.statisticsService.updateStatisticsListInfo;
      });


  }

  createBody(item: ContextualQuestion) {
    let body = {} as ContextualQuestionToSave;

    if (item.question_id != undefined) {
      body.question_id = item.question_id;
    }

    if (this.newCQ) {
      body.question_orderofappearance = this.all_contextualQs.length + 1;
      body.recommendation = true;
      body.question_nrofanswers = 0;
    }
    else {
      body.question_orderofappearance = item.question_orderofappearance;
      body.recommendation = item.recommendation;
      body.question_nrofanswers = item.nrofanswers;
    }

    body.question_title = item.question_title;
    body.question_alternativetitle = item.question_alternativetitle;
    body.potential_answers = this.potential_answers;
    body.flagged = item.flagged;

    return body;
  }

  cancelOrder() {
    this.showSaveButton = false;
    this.loadData();
  }

  drop(event) {
    this.showSaveButton = true;
    moveItemInArray(this.all_contextualQs, event.previousIndex, event.currentIndex);
    let index = 1;
    this.all_contextualQs.forEach(contexQ => {
      contexQ.question_orderofappearance = index;
      index++;
    })
  }

  orderAnswers(event) {
    moveItemInArray(this.potential_answers, event.previousIndex, event.currentIndex);
    let index = 1;
    this.potential_answers.forEach(pAnswer => {
      pAnswer.answer_orderofappearance = index;
      index++;
    })
  }
}
