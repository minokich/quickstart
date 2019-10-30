import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { EventComponent } from "./event.component";
import { BooksComponent } from "./books.component";
import { WingsComponent } from "./wings.component";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, EventComponent, BooksComponent, WingsComponent],
  entryComponents: [EventComponent, BooksComponent, WingsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
