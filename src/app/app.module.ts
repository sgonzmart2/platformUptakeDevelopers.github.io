import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common/';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoComponent } from './info/info.component';
import { InDepthInformationComponent } from './in-depth-information/in-depth-information.component';
import { DataManagementComponent } from './data-management/data-management.component';
import { ProfileComponent } from './profile/profile.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ChartsModule } from 'ng2-charts';
import { PCGlobalScoreComponent } from './pComparison/pc-global-score/pc-global-score.component';
import { PCMenuComponent } from './pComparison/pc-menu/pc-menu.component';
import { PCStatisticsComponent } from './pComparison/pc-statistics/pc-statistics.component';
import { PCUserMenuComponent } from './pComparison/user/pc-user-menu/pc-user-menu.component';
import { PCDimensionTechnicalComponent } from './pComparison/dimension/pc-dimension-technical/pc-dimension-technical.component';
import { PCDimensionBusinessComponent } from './pComparison/dimension/pc-dimension-business/pc-dimension-business.component';
import { PCDimensionMenuComponent } from './pComparison/dimension/pc-dimension-menu/pc-dimension-menu.component';
import { PCDimensionContextualComponent } from './pComparison/dimension/pc-dimension-contextual/pc-dimension-contextual.component';
import { PMUserMenuComponent } from './monitoring/user/pm-user-menu/pm-user-menu.component';
import { PMDimensionContextualComponent } from './monitoring/dimension/pm-dimension-contextual/pm-dimension-contextual.component';
import { PMDimensionMenuComponent } from './monitoring/dimension/pm-dimension-menu/pm-dimension-menu.component';
import { PMDimensionBusinessComponent } from './monitoring/dimension/pm-dimension-business/pm-dimension-business.component';
import { PMDimensionTechnicalComponent } from './monitoring/dimension/pm-dimension-technical/pm-dimension-technical.component';
import { PMStatisticsComponent } from './monitoring/pm-statistics/pm-statistics.component';
import { PlatformSelectorComponent } from './monitoring/platform-selector/platform-selector.component';
import { MonitoringMenuComponent } from './monitoring/monitoring-menu/monitoring-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InDeepFeedbackComponent } from './in-depth-information/in-deep-feedback/in-deep-feedback.component';
import { InDeepRatingsComponent } from './in-depth-information/in-deep-ratings/in-deep-ratings.component';
import { DmPlatformComponent } from './data-management/dm-platform/dm-platform.component';
import { DmKpiDefinitionComponent } from './data-management/dm-kpi-definition/dm-kpi-definition.component';
import { DmKpiValuesComponent } from './data-management/dm-kpi-values/dm-kpi-values.component';
import { DmMeasurementPeriodComponent } from './data-management/dm-measurement-period/dm-measurement-period.component';
import { ModalEvolutionComponent } from './components/modal-evolution/modal-evolution.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DmKpiComponent } from './data-management/dm-kpi/dm-kpi.component';
import { DmStatisticsComponent } from './data-management/dm-statistics/dm-statistics.component';
import { InDeepPlatformSelectorComponent } from './in-depth-information/in-deep-platform-selector/in-deep-platform-selector.component';
import { DmStatisticsMenuComponent } from './data-management/dm-statistics-menu/dm-statistics-menu.component';
import { DmStatisticsValuesComponent } from './data-management/dm-statistics-values/dm-statistics-values.component';
import { DmContextualComponent } from './data-management/dm-contextual/dm-contextual.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalEvolutionKpiComponent } from './components/modal-evolution-kpi/modal-evolution-kpi.component';
import { ModalNoAuthComponent } from './components/modal-no-auth/modal-no-auth.component';
import { ModalNoPermisionsComponent } from './components/modal-no-permisions/modal-no-permisions.component';
import { ModalEvolutionStatisticsComponent } from './components/modal-evolution-statistics/modal-evolution-statistics.component';
import { SafePipe } from './safe.pipe';
import { PmTabComponent } from './monitoring/user/pm-tab/pm-tab.component';
import { PcTabComponent } from './pComparison/user/pc-tab/pc-tab.component';
import { ModalDetailsInDeepComponent } from './components/modal-details-in-deep/modal-details-in-deep.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InfoComponent,
    InDepthInformationComponent,
    DataManagementComponent,
    ProfileComponent,
    PCGlobalScoreComponent,
    PCMenuComponent,
    PCStatisticsComponent,
    PCUserMenuComponent,
    PCDimensionTechnicalComponent,
    PCDimensionBusinessComponent,
    PCDimensionMenuComponent,
    PCDimensionContextualComponent,
    PMUserMenuComponent,
    PMDimensionContextualComponent,
    PMDimensionMenuComponent,
    PMDimensionBusinessComponent,
    PMDimensionTechnicalComponent,
    PMStatisticsComponent,
    PlatformSelectorComponent,
    MonitoringMenuComponent,
    InDeepFeedbackComponent,
    InDeepRatingsComponent,
    DmPlatformComponent,
    DmKpiDefinitionComponent,
    DmKpiValuesComponent,
    DmMeasurementPeriodComponent,
    ModalEvolutionComponent,
    ModalEvolutionKpiComponent,
    PageNotFoundComponent,
    DmKpiComponent,
    DmStatisticsComponent,
    InDeepPlatformSelectorComponent,
    DmStatisticsMenuComponent,
    DmStatisticsValuesComponent,
    DmContextualComponent,
    ModalNoAuthComponent,
    ModalNoPermisionsComponent,
    ModalEvolutionStatisticsComponent,
    SafePipe,
    PmTabComponent,
    PcTabComponent,
    ModalDetailsInDeepComponent,
  ],
  imports: [
    BrowserModule,
    UiModule,
    NgbModule,
    DragDropModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatDialogModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 110,
      outerStrokeWidth: 5,
      innerStrokeWidth: 14,
      backgroundColor: "white",
      outerStrokeColor: "#23A6AD",
      innerStrokeColor: "#EEECEC",
      animationDuration: 300,
      showZeroOuterStroke: true,
      animation: true,
      showUnits: true,
      responsive: true,
      showImage: false,
      toFixed: 0,
      units: '',
      maxPercent: 100,
      space: -10,
      imageWidth: 200,
      imageHeight: 200,
      backgroundStrokeWidth: 10,
      titleFontSize: '36',
      subtitleFontSize: '36'
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ModalEvolutionComponent, ModalEvolutionKpiComponent, ModalNoAuthComponent, ModalNoPermisionsComponent, ModalEvolutionStatisticsComponent, ModalDetailsInDeepComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

