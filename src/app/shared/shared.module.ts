import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { QuillModule } from "ngx-quill";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";

//we create sharemodule in order to avoid creating the same httpclient objects and keep only 1 in the entire project
@NgModule({

  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule
  ],
  // we add also these modules in exports array so they get public api and other modules can see them
  exports: [
    HttpClientModule,
    QuillModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule
  ]
})

export class SharedModule {

}
