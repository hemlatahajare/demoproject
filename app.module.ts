import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudopComponent } from './crudop/crudop.component'; 
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MainService } from './services/main.service';
import { FileUploadModule } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CrudopComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
