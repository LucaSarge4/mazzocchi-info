import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { AuthGuardService } from './services/auth.guard.service';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';
import { TableComponent } from './table/table.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        TableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
    ],
    providers: [
        AuthService,
        AuthGuardService,
        BackendService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
