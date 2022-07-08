import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContextualService } from '../api/contextual.service';
import *  as constants from '../../utilities/constants';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

@Injectable({
  providedIn: 'root'
})
export class ContextualQDOAService {

  contextualQService: ContextualService
  constructor(private http: HttpClient,
    private secureStorage: EncryptedStorageService) {
    this.contextualQService = new ContextualService(this.http, null, null);
  }

  public getContextualQList() {

    return this.contextualQService.getContextualQuestions();
  }

  public getContextualQuestions() {
    let contextualList = [];
    this.getContextualQList().subscribe(
      response => {
        contextualList = response["contextual_questions"];
        this.secureStorage.secureLocalStorage(constants.lSN_contextualQuestions, JSON.stringify(contextualList))
      });
  }


  getDevQuestAndRatingsByPlatform(platform_id) {
    return this.contextualQService.getDevQAndRatingsByPlatformId(platform_id);
  }

  public updateDeveloperQuestionTypes() {
    let listDeveloperQTypes = [];
    this.contextualQService.getDeveloperQuestionTypes().subscribe(
      response => {
        listDeveloperQTypes = response['developer_question_types'];
        this.secureStorage.secureLocalStorage(constants.lSN_developer_question_types, JSON.stringify(listDeveloperQTypes))
      });
  }

  getDevelopersComments(platform_id, developerquestion_id) {
    return this.contextualQService.getDevelopersComments(platform_id, developerquestion_id);
  }

  getPlatformFeedback(platform_id) {
    return this.contextualQService.getDevFeedbacksByPlatformId(platform_id);
  }

  insertNewContextualQuestion(body) {
    return this.contextualQService.insertNewContextualQuestions(body)
  }

  updateListContextualQuestion(body) {
    return this.contextualQService.updateContextualQuestions(body)
  }

  updateOrderContextualQuestions(body) {
    return this.contextualQService.updateOrderCQuestions(body);
  }

}
