import { Component } from "@angular/core";
import { Book } from "./books";

@Component({
  selector: "my-app",
  template: `
    <div>
      <span *ngFor="let b of books">
        [<a href="#" (click)="onclick(b)">{{ b.title }}</a
        >]
      </span>
    </div>
    <hr />
    <detail-book [item]="selected"></detail-book>
  `
})
export class AppComponent {
  selected: Book;
  books: Book[] = [
    {
      isbn: "978-4-7973-9523-5",
      title: "１分で話せ",
      price: 1400,
      publisher: "SBクリエイティブ"
    },
    {
      isbn: "978-4-7741-9706-7",
      title: "はじめてのフロントエンド開発",
      price: 2600,
      publisher: "技術評論社"
    },
    {
      isbn: "978-4-7775-1765-7",
      title: "Vue風景CGテクニックガイド",
      price: 3000,
      publisher: "工学社"
    },
    {
      isbn: "978-4-0436-3603-7",
      title: "アラビアの夜の種族",
      price: 2000,
      publisher: "角川書店"
    }
  ];

  onclick(book: Book) {
    this.selected = book;
  }
}
