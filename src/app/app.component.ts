import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  template: `
    <form #myForm="ngForm" (ngSubmit)="show()" novalidate>
      <div>
        <label for="mail">メールアドレス：</label>
        <input
          id="mail"
          name="mail"
          type="email"
          [(ngModel)]="user.mail"
          #mail="ngModel"
          required
          email
        />
        <span *ngIf="mail.errors?.required">メールアドレスは必須です。</span>
        <span *ngIf="mail.errors?.email"
          >メールアドレスを正しい形式で入力してください。</span
        >
      </div>
      <div>
        <label for="passwd">パスワード：</label>
        <input
          id="passwd"
          name="passwd"
          type="password"
          [(ngModel)]="user.passwd"
          required
          minlength="6"
          #passwd="ngModel"
        />
        <span *ngIf="passwd.errors?.required && passwd.dirty"
          >パスワードは必須です。</span
        >
        <span *ngIf="passwd.errors?.minlength && passwd.dirty"
          >パスワードは6文字以上で入力してください。</span
        >
      </div>
      <div>
        <label for="name">名前：</label>
        <input
          id="name"
          name="name"
          type="text"
          [(ngModel)]="user.name"
          required
          minlength="3"
          maxlength="10"
          #name="ngModel"
        />
        <span *ngIf="name.errors?.required">名前は必須です。</span>
        <span *ngIf="name.errors?.minlength"
          >名前は3文字以上で入力してください。</span
        >
        <span *ngIf="name.errors?.maxlength"
          >名前は10文字以内で入力してください。</span
        >
      </div>
      <div>
        <label for="memo">備考：</label>
        <textarea
          id="memo"
          name="memo"
          rows="5"
          cols="30"
          [(ngModel)]="user.memo"
          #memo="ngModel"
          (input)="memoCountUpdate()"
        ></textarea>
        <p [ngStyle]="countStyle">{{ count }}</p>
      </div>
      <div>
        <ng-container *ngFor="let item of selectItems; index as i">
          <label>
            <input
              type="radio"
              name="pet"
              [(ngModel)]="user.pet"
              [value]="item.value"
              [checked]="item.value === user.pet"
              (change)="selectShow(i)"
            />
            {{ item.label }} </label
          ><br />
        </ng-container>
      </div>
      <div>
        <ng-container *ngFor="let item of checkItems; index as i">
          <label>
            <input
              type="checkbox"
              name="eat{{ i }}"
              [(ngModel)]="checkItems[i].selected"
              [value]="item.value"
              (change)="checkShow(i)"
            />
            {{ item.label }} </label
          ><br />
        </ng-container>
      </div>
      <div>
        <input
          type="submit"
          value="送信"
          [disabled]="myForm.invalid || myForm.submitted"
        />
        <input type="reset" value="リセット" [disabled]="myForm.pristine" />
      </div>
    </form>
    <pre>{{ myForm.value | json }}</pre>
  `
})
export class AppComponent {
  maxCount: number = 100;
  count: number = this.maxCount;
  countStyle = {
    color: "#00f",
    fontWeight: "nomal"
  };
  user = {
    mail: "hoge@example.com",
    passwd: "",
    name: "John Do",
    memo: "",
    pet: "cat"
  };
  selectItems: { label: string; value: string }[] = [
    { label: "犬", value: "dog" },
    { label: "猫", value: "cat" },
    { label: "ハムスター", value: "hamster" },
    { label: "金魚", value: "fish" },
    { label: "亀", value: "turtle" }
  ];
  checkItems: { label: string; value: string; selected: boolean }[] = [
    { label: "肉", value: "meet", selected: false },
    { label: "油", value: "oil", selected: false },
    { label: "米", value: "rice", selected: false }
  ];
  show() {
    console.log("name:" + this.user.name);
    console.log("memo:" + this.user.memo);
  }
  selectShow(i: number) {
    console.log("label:" + this.selectItems[i].label);
    console.log("value:" + this.selectItems[i].value);
  }
  checkShow(i: number) {
    console.log(this.checkItems[i]);
  }
  memoCountUpdate() {
    this.count = this.maxCount - this.user.memo.length;
    if (this.count > 10) {
      this.countStyle = {
        color: "#00f",
        fontWeight: "nomal"
      };
    } else if (this.count > 0) {
      this.countStyle = {
        color: "#f0f",
        fontWeight: "nomal"
      };
    } else {
      this.countStyle = {
        color: "#f00",
        fontWeight: "bold"
      };
    }
  }
}
