import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "my-app",
  template: `
    <form [formGroup]="myForm" (ngSubmit)="show()">
      <div>
        <label for="mail">mail:</label>
        <input id="mail" name="mail" type="email" [formControl]="mail" />
        <span *ngIf="mail.errors?.required">メールアドレスは必須です。</span>
        <span *ngIf="mail.errors?.email"
          >メールアドレスの正しい形式で入力してください</span
        >
      </div>
      <div>
        <label for="passwd">password:</label>
        <input
          id="passwd"
          name="passwd"
          type="password"
          [formControl]="passwd"
        />
        <span *ngIf="passwd.errors?.required && passwd.dirty"
          >passwordは必須です。</span
        >
        <span *ngIf="passwd.errors?.minlength && passwd.dirty"
          >passwordは6文字以上で入力してください。</span
        >
      </div>
      <div>
        <label for="name">name:</label>
        <input id="name" name="name" type="text" [formControl]="name" />
        <span *ngIf="name.errors?.required">必須</span>
        <span *ngIf="name.errors?.minlength">3文字以上</span>
        <span *ngIf="name.errors?.maxlength">10文字以内</span>
      </div>
      <div>
        <label for="memo"></label>
        <textarea
          name="memo"
          id="memo"
          cols="30"
          rows="10"
          [formControl]="memo"
        >
        </textarea>
        <span *ngIf="memo.errors?.maxlength">30文字以内</span>
      </div>
    </form>
  `
})
export class AppComponent {
  constructor(private builder: FormBuilder) {}
  mail = new FormControl("hoge@example.com", [
    Validators.required,
    Validators.email
  ]);
  passwd = new FormControl("", [Validators.required, Validators.minLength(6)]);
  name = new FormControl("John Do", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(10)
  ]);
  memo = new FormControl("memo", [Validators.maxLength(30)]);
  myForm = this.builder.group({
    mail: this.mail,
    passwd: this.passwd,
    name: this.name,
    memo: this.memo
  });
  show() {
    console.log("mail:" + this.mail.value);
    console.log("passwd:" + this.passwd.value);
    console.log("name:" + this.name.value);
    console.log("memo:" + this.memo.value);
    console.log("all:");
    console.log(this.myForm.value);
  }
}
