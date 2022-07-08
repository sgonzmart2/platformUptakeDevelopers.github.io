import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import *  as constants from '../../utilities/constants';
import { ScoresService } from '../api/scores.service';

@Injectable({
  providedIn: 'root'
})
export class ScoresDOAService {

  constructor(private http: HttpClient) { }

  private getScoreOfDimesionPlatformForPeriod(plat_id, dimension_id, period_id): Observable<number> {
    let service: ScoresService = new ScoresService(this.http, null, null);
    return service.getScoreByPlatformPeriodAndDimension(plat_id, period_id, dimension_id);
  }

  private getScoreOfDimesionPlatformForPeriodByUserWeights(plat_id, dimension_id, period_id): Observable<number> {
    let service: ScoresService = new ScoresService(this.http, null, null);
    return service.getScoreByPlatformPeriodAndDimensionWithUserWeights(plat_id, period_id, dimension_id);
  }

  private getScoreOfClusterPlatformForPeriod(plat_id, cluster_id, period_id): Observable<number> {
    let service: ScoresService = new ScoresService(this.http, null, null);
    return service.getScoreByPlatformPeriodAndCluster(plat_id, period_id, cluster_id);
  }

  private getScoreOfClusterPlatformForPeriodWithUserWeights(plat_id, cluster_id, period_id): Observable<number> {
    let service: ScoresService = new ScoresService(this.http, null, null);
    return service.getScoreByPlatformPeriodAndClusterWithUserWeights(plat_id, period_id, cluster_id);
  }
  scoreOfDimensionAndPlatformForPeriod(dimension_id, plat_id, period_id): Observable<number> {

    let number
    var subject = new Subject<number>();
    this.getScoreOfDimesionPlatformForPeriod(plat_id, dimension_id, period_id).subscribe(
      response => {
        let scoreList = response['scores'];
        scoreList.forEach(element => {
          if (element.period_id == period_id) {
            number = element.score
            subject.next(number);
          }
        })
      });
    return subject.asObservable();
  }

  scoreOfDimensionAndPlatformForPeriodLoggedUser(dimension_id, plat_id, period_id): Observable<number> {
    let number
    var subject = new Subject<number>();
    this.getScoreOfDimesionPlatformForPeriodByUserWeights(plat_id, dimension_id, period_id).subscribe(
      response => {
        let scoreList = response['scores'];
        if (scoreList.length > 0) {
          scoreList.forEach(element => {
            if (element.period_id == period_id) {
              number = element.score
              subject.next(number);
            }
          })
        }
        else
          subject.next(null);
      },
      error => {
        console.log("error", error)
      });
    return subject.asObservable();
  }

  scoreOfClusterAndPlatformForPeriod(cluster_id, plat_id, period_id): Observable<number> {

    let number
    var subject = new Subject<number>();
    this.getScoreOfClusterPlatformForPeriod(plat_id, cluster_id, period_id).subscribe(
      response => {
        let scoreList = response['scores'];
        scoreList.forEach(element => {
          if (element.period_id == period_id) {
            number = element.score
            subject.next(number);
          }
        })
      });
    return subject.asObservable();
  }

  scoreOfClusterAndPlatformForPeriodLoggedUser(cluster_id, plat_id, period_id): Observable<number> {

    let number
    var subject = new Subject<number>();
    this.getScoreOfClusterPlatformForPeriodWithUserWeights(plat_id, cluster_id, period_id).subscribe(
      response => {
        let scoreList = response['scores'];
        scoreList.forEach(element => {
          if (element.period_id == period_id) {
            number = element.score
            subject.next(number);
          }
        })
      });
    return subject.asObservable();
  }


  scoreEvolutionOfPlatformDimesionOrCluster(platform_id, isDimension: boolean, score_id) {
    let service: ScoresService = new ScoresService(this.http, null, null);

    if (isDimension) {
      return service.getScoreEvolutionOfPlatformAndDimensionOrCluster(platform_id, 'dimension_id', score_id);
    }
    else {
      return service.getScoreEvolutionOfPlatformAndDimensionOrCluster(platform_id, 'cluster_id', score_id);
    }
  }
}
