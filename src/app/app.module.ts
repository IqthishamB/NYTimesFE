import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './core/loader/loader.component';
import { LoaderService } from './core/loader/loader.service';
import { AuthGuard } from './gaurds/auth.guard';
import { ErrorInterceptor } from './helper/error.interceptor';
import { FakeBackendInterceptor } from './helper/fake-backend.interceptor';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { LoaderInterceptor } from './helper/loader.interceptor';
import { HomeComponent } from './news/home/home.component';
import { LoginComponent } from './news/login/login.component';
import { RegisterComponent } from './news/register/register.component';
import { StoriesComponent } from './news/stories/stories.component';
import { AuthenticationService } from './services/authentication.service';
import { SharedModule } from './SharedModule';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    StoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    SharedModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AppRoutingModule,
    LoaderService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
