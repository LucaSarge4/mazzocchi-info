import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { AuthGuardService } from './services/auth.guard.service';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';
import { InformativaDialogComponent } from './table/informativa-dialog.component';
import { TableComponent } from './table/table.component';
import { TableValuePipe } from './table/value.pipe';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        TableComponent,
        CreateUserComponent,
        TableValuePipe,
        InformativaDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
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
