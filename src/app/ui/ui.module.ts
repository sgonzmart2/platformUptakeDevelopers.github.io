import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule, MatProgressBarModule, MatTooltipModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, AlertMessageComponent, SidenavMenuComponent, LayoutComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSidenavModule,
    MatSortModule,
    MatSlideToggleModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    CdkTableModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatProgressBarModule,
    MatDividerModule,
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AlertMessageComponent,
    AppRoutingModule,
    SidenavMenuComponent,
    CommonModule,
    HttpClientModule,
    CdkTableModule,
    FormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatProgressBarModule,
    MatDividerModule
  ]
})
export class UiModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
