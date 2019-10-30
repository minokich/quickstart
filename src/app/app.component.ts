import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl
} from "@angular/platform-browser";

import { EventComponent } from "./event.component";
import { BooksComponent } from "./books.component";
import { WingsComponent } from "./wings.component";

@Component({
  selector: "my-app",
  template: `
    <div class="block">
      <h3>バインディングの基本</h3>
      <h1>Hello {{ member?.name }}</h1>
      <img src="{{ image }}" />
    </div>
    <div class="block">
      <h3>プロパティバインディング</h3>
      <table border="1">
        <tr>
          <td [attr.rowspan]="len">結合</td>
          <td>1</td>
        </tr>
        <tr>
          <td>2</td>
        </tr>
        <tr>
          <td>3</td>
        </tr>
      </table>
    </div>
    <div class="block">
      <h3>クラスバインディング</h3>
      <p class="red bold" [class]="clazz">
        [class] で指定 => classで指定したred boldが上書きされて消滅
      </p>
      <p class="bold" [class.blue]="classFlag">
        [class.blue] で指定 => classで指定したboldが残っている
      </p>
    </div>
    <div class="block">
      <h3>スタイルバインディング</h3>
      <p [style.background-color]="bgColor">16進数で色指定</p>
      <p [style.background-color]="bgRed ? 'red' : ''">フラグで指定</p>
      <input type="button" value="フラグ切り替え" (click)="styleFlagChange()" />
    </div>
    <div class="block">
      <h3>イベントバインディング</h3>
      <input type="button" (click)="timeShow()" value="現在時刻" />
      {{ msg }}
      <div class="box" on-mousemove="mouseMove($event)">
        <p>screen : {{ mousePotion.screenX }}x{{ mousePotion.screenY }}</p>
        <p>page : {{ mousePotion.pageX }}x{{ mousePotion.pageY }}</p>
        <p>client : {{ mousePotion.clientX }}x{{ mousePotion.clientY }}</p>
        <p>offset : {{ mousePotion.offsetX }}x{{ mousePotion.offsetY }}</p>
      </div>

      <div>
        <h4>kedown</h4>
        <form>
          <label for="key">キー入力</label>
          <input id="key" name="key" (keydown)="keyDownEvent($event)" />
        </form>
        <div>キーコード : {{ keyProp.which }}</div>
        <div [hidden]="!keyProp.altKey">[ALT]</div>
        <div [hidden]="!keyProp.ctrlKey">[CTRL]</div>
        <div [hidden]="!keyProp.shiftKey">[SHIFT]</div>
      </div>
      <div>
        <h4>デフォルト動作の抑制</h4>
        <form>
          <label for="zip">郵便番号：</label>
          <input
            id="zip"
            name="zip"
            type="text"
            size="10"
            (keypress)="mask($event)"
          />
        </form>
      </div>
      <div>
        <h4>イベントのバブリング(親要素への伝播)キャンセル</h4>
        <div id="outter" (click)="onclick1()">
          outter
          <div id="inner" (click)="onclick2($event)">inner</div>
        </div>
      </div>
      <div>
        <h4>テンプレート参照変数(要素内)</h4>
        <input
          #txt
          id="txt"
          name="txt"
          type="text"
          (input)="addListItem(txt.value)"
        />
        <ul [innerHTML]="liHtml"></ul>
      </div>
      <div>
        <h4>テンプレート参照変数(要素外)</h4>
        <label>姓<input #last type="text" (change)="(0)"/></label><br />
        <label>名<input #first type="text" (change)="(0)"/></label>
        <div>こんにちは、{{ last.value }}{{ first.value }}さん</div>
      </div>
      <div>
        <h4>keyup.enter</h4>
        <input
          #txtEn
          id="txtEn"
          name="txtEn"
          type="text"
          (keyup.enter)="addListItemEn(txtEn.value)"
        />
        <ul [innerHTML]="liHtmlEn"></ul>
      </div>
    </div>
    <div class="block">
      <h3>innerHtmlと外部リソースの埋め込み</h3>
      <div [innerHTML]="safeMsg"></div>
      <iframe [src]="safeUrl"></iframe>
    </div>
    <div class="block">
      <div>
        <h3>基本の双方向バインディング</h3>
        <form>
          <label for="wBind">名前:</label>
          <input id="wBind" name="wBind" type="text" [(ngModel)]="myName" />
          <div>こんにちは、{{ myName }}さん</div>
        </form>
      </div>
      <div>
        <h3>ngModelChangeを使った双方向バインディング</h3>
        <form>
          <label for="wBind2">名前:</label>
          <input
            id="wBind2"
            name="wBind2"
            type="text"
            [ngModel]="myName2"
            (ngModelChange)="myName2 = $event"
          />
          <div>こんにちは、{{ myName2 }}さん</div>
        </form>
      </div>
      <div>
        <h3>バインディング時にデータの加工を行う</h3>
        <small>アルファベットを大文字に</small>
        <form>
          <label for="wBind3">名前:</label>
          <input
            id="wBind3"
            name="wBind3"
            type="text"
            [ngModel]="myName3"
            (ngModelChange)="myName3 = $event.toUpperCase()"
          />
          <div>こんにちは、{{ myName3 }}さん</div>
        </form>
      </div>
    </div>
    <div class="block">
      <h3>パイプ</h3>
      <div>
        <h4>文字列の整形</h4>
        <p>元の文字列:{{ pipeTitle }}</p>
        <p>uppercase:{{ pipeTitle | uppercase }}</p>
        <p>lowercase:{{ pipeTitle | lowercase }}</p>
        <p>titlecase:{{ pipeTitle | titlecase }}</p>
      </div>
      <div>
        <h4>objectのjson形式変換</h4>
        <pre>{{ obj | json }}</pre>
        <small>※undefinedのものやfunctionは変換されていない</small>
      </div>
      <div>
        <h4>文字列の切り出し</h4>
        <ul>
          <li>{{ sliceStr }}(元の文字列)</li>
          <li>{{ sliceStr | slice: 3 }}(3)</li>
          <li>{{ sliceStr | slice: 3:5 }}(3 : 5)</li>
          <li>{{ sliceStr | slice: 7 }}(7)</li>
          <li>{{ sliceStr | slice: -3 }}(-3)</li>
          <li>{{ sliceStr | slice: -3:-2 }}(-3 : -2)</li>
          <li>{{ sliceStr | slice: -10 }}(-10)</li>
        </ul>
      </div>
      <div>
        <h4>文字列の切り出し</h4>
        <ul>
          <li>{{ sliceAry }}(元の配列)</li>
          <li>{{ sliceAry | slice: 3 }}(3)</li>
          <li>{{ sliceAry | slice: 3:5 }}(3 : 5)</li>
          <li>{{ sliceAry | slice: 7 }}(7)</li>
          <li>{{ sliceAry | slice: -3 }}(-3)</li>
          <li>{{ sliceAry | slice: -3:-2 }}(-3 : -2)</li>
          <li>{{ sliceAry | slice: -10 }}(-10)</li>
        </ul>
      </div>
      <div>
        <h4>数値の整形</h4>
        <ul>
          <li>元の数値 : {{ pipePrice | number }}</li>
          <li>少数第二位(5.0-2) : {{ pipePrice | number: "5.0-2" }}</li>
          <li>整数(1.0-0) : {{ pipePrice | number: "1.0-0" }}</li>
        </ul>
      </div>
      <div>
        <h4>数値を貨幣へ変換</h4>
        <ul>
          <li>デフォルト : {{ pipePrice | currency }}</li>
          <li>コード : {{ pipePrice | currency: "JPY" }}</li>
          <li>単位(円) : {{ pipePrice | currency: "JPY":true }}</li>
          <li>単位(ユーロ) : {{ pipePrice | currency: "EUR":true }}</li>
          <li>桁数指定 : {{ pipePrice | currency: "JPY":true:"1.0-1" }}</li>
        </ul>
      </div>
      <div>
        <h4>数値をパーセント形式に変換する</h4>
        <ul>
          <li>デフォルト : {{ pipeParcent | percent }}</li>
          <li>少数第一位 : {{ pipeParcent | percent: "1.0-1" }}</li>
        </ul>
      </div>
      <div>
        <h4>日付/時刻の整形</h4>
        <ul>
          <li>整形なし : {{ pipeDate }}</li>
          <li>整形あり(デフォルト) : {{ pipeDate | date }}</li>
          <li>整形あり(medium) : {{ pipeDate | date: "medium" }}</li>
          <li>整形あり(書式指定) : {{ pipeDate | date: "y MM dd (EEE) " }}</li>
        </ul>
      </div>
      <div>
        <h4>数値によって文字列の表示を切り替える</h4>
        <p>
          favUsers:
          <span *ngFor="let favUser of favUsers">
            {{ favUser }}
          </span>
        </p>
        <p>favMessages:{{ favUsers.length | i18nPlural: favMessages }}</p>
        <input #userName type="text" />
        <input
          type="button"
          (click)="pushArrayItem(userName.value); userName.value = ''"
          value="いいね！"
        />
        <input type="button" (click)="popArrayItem()" value="pop" />
      </div>
      <div>
        <h4></h4>
        <ul>
          <li *ngFor="let m of members">
            {{ m.sex | i18nSelect: messages }}は{{ m.name }}です。
          </li>
        </ul>
      </div>
    </div>
    <!-- 4-2 -->
    <div class="block">
      <h3>4-2 ディレクティブ</h3>
      <div>
        <h4>ngIf</h4>
        <form>
          <label for="show">表示/非表示</label>
          <input type="checkbox" name="show" id="show" [(ngModel)]="showFlag" />
        </form>
        <h5>elseのものを別に指定する場合</h5>
        <div *ngIf="showFlag; else elseContent">
          <p>文章だよおおおおおおおおおおお</p>
        </div>
        <ng-template #elseContent>
          <div><p>非表示中</p></div>
        </ng-template>
        <h5>then...elseでそれぞれ表示するテンプレートを指定</h5>
        <div *ngIf="showFlag; then trueContent; else elseContent2">
          ここの中は無視される
        </div>
        <ng-template #trueContent>
          <p>表示中2</p>
        </ng-template>
        <ng-template #elseContent2>
          <p>非表示中2</p>
        </ng-template>
      </div>
      <div>
        <h4>ngSwitch</h4>
        <form>
          <select name="season" [(ngModel)]="season">
            <option value="">四季を選択</option>
            <option value="spring">春</option>
            <option value="summer">夏</option>
            <option value="autumn">秋</option>
            <option value="winter">冬</option>
          </select>
        </form>
        <div [ngSwitch]="season">
          <span *ngSwitchCase="'spring'">春が選択されています。</span>
          <span *ngSwitchCase="'summer'">夏が選択されています。</span>
          <span *ngSwitchCase="'autumn'">秋が選択されています。</span>
          <span *ngSwitchCase="'winter'">冬が選択されています。</span>
          <span *ngSwitchDefault>選択してください</span>
        </div>
      </div>
      <div>
        <h4>ngFor</h4>
        <table class="table" border="1">
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Price</th>
            <th>Publisher</th>
          </tr>
          <tr *ngFor="let book of books">
            <td>{{ book.isbn }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.price | currency: "JPY":true }}</td>
            <td>{{ book.publisher }}</td>
          </tr>
        </table>

        <h5>ngForのループ内で使える特殊変数</h5>
        <table border="1">
          <tr>
            <th>値</th>
            <th>index</th>
            <th>first</th>
            <th>last</th>
            <th>odd(奇数)</th>
            <th>even(偶数)</th>
          </tr>
          <tr
            *ngFor="
              let obj of eto;
              index as i;
              first as first;
              last as last;
              odd as odd;
              even as even
            "
          >
            <td>{{ obj }}</td>
            <td>{{ i }}</td>
            <td>{{ first ? "◯" : "-" }}</td>
            <td>{{ last ? "◯" : "-" }}</td>
            <td>{{ odd ? "◯" : "-" }}</td>
            <td>{{ even ? "◯" : "-" }}</td>
          </tr>
        </table>

        <h5>異なる要素のセットを繰り返し表示</h5>
        <ng-container *ngFor="let article of articles">
          <header>{{ article.title }}</header>
          <div>{{ article.body }}</div>
          <footer ng-repeat-end>{{ article.author }}</footer>
        </ng-container>

        <h5>アイテムの増減とトラッキング</h5>
        <table class="table" border="1">
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Price</th>
            <th>Publisher</th>
          </tr>
          <tr *ngFor="let book2 of books2; trackBy: trackFn">
            <td>{{ book2.isbn }}</td>
            <td>{{ book2.title }}</td>
            <td>{{ book2.price | currency: "JPY":true }}</td>
            <td>{{ book2.publisher }}</td>
          </tr>
        </table>

        <input type="button" (click)="addBooks()" value="追加" />
        <input type="button" (click)="removeBooks()" value="削除" />

        <h5>ページング</h5>
        <table class="table" border="1">
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Price</th>
            <th>Publisher</th>
          </tr>
          <tr *ngFor="let book3 of books3 | slice: start:start + bookLen">
            <td>{{ book3.isbn }}</td>
            <td>{{ book3.title }}</td>
            <td>{{ book3.price | currency: "JPY":true }}</td>
            <td>{{ book3.publisher }}</td>
          </tr>
        </table>

        <ul class="pagination">
          <li><a href="#" (click)="pager(0)">1</a></li>
          <li><a href="#" (click)="pager(1)">2</a></li>
          <li><a href="#" (click)="pager(2)">3</a></li>
        </ul>
      </div>
      <div>
        <h4>ngStyle</h4>
        <form>
          <input type="button" (click)="back = !back" value="背景色" />
          <input type="button" (click)="fore = !fore" value="文字色" />
          <input type="button" (click)="space = !space" value="padding" />
        </form>
        <div [ngStyle]="styles">
          <p>あああああああああああ、ああああああ</p>
        </div>
        <div>
          <div>
            <h4>ngClass</h4>
            <form>
              <input
                type="button"
                (click)="ngClassStyles.back = !ngClassStyles.back"
                value="背景色"
              />
              <input
                type="button"
                (click)="ngClassStyles.fore = !ngClassStyles.fore"
                value="文字色"
              />
              <input
                type="button"
                (click)="ngClassStyles.space = !ngClassStyles.space"
                value="padding"
              />
            </form>
            <div [ngClass]="ngClassStyles">
              <p>あああああああああああ、ああああああ</p>
            </div>
          </div>
        </div>
        <div>
          <h4>ngPlural</h4>
          <div [ngPlural]="pluralFavs.length">
            <ng-template ngPluralCase="=0">[いいね！]されていません。</ng-template>
            <ng-template ngPluralCase="=1">1人にだけ[いいね！]されています。</ng-template>
            <ng-template ngPluralCase="other">{{pluralFavs.length}}人に[いいね！]されています。</ng-template>
            <form>
              <input type="button" (click)="pluralFavs.push('000')" value="いいね追加">
              <input type="button" (click)="pluralFavs.pop()" value="いいね取り消し">
            </form>
          </div>
        </div>

        <div>
          <h4>ngTemplateOutlet</h4>
          <ng-template #myTemp let-isbn="isbn" let-title="title" let-price="price" let-publisher="publisher">
            <ul>
              <li>{{isbn}}</li>
              <li>{{title}}</li>
              <li>{{price}}円</li>
              <li>{{publisher}}</li>
            </ul>
          </ng-template>
  
          <select name="temp-book" [(ngModel)]="tempBook">
            <option *ngFor="let b of books; let i = index" [value]="i">
            {{b.title}}
            </option> 
          </select>
          <ng-container *ngTemplateOutlet="myTemp; context: books[tempBook]">
          </ng-container>
        </div>

        <div>
          <h4>ngComponentOutlet</h4>
          <ng-container *ngComponentOutlet="bunner">
          </ng-container>
        </div>

      </div><!-- ディレクティブ -->
      
    </div><!-- 全体 -->
  `,
  styles: [
    `
      .block {
        border: solid 1px;
        padding: 20px 0;
      }
      .box {
        margin: 50px;
        width: 300px;
        height: 300px;
        border: solid 1px #000;
      }
      .red {
        color: red;
      }
      .blue {
        color: blue;
      }
      .bold {
        font-weight: bold;
      }
      #outter {
        height: 200px;
        widht: 350px;
        margin: 50px;
        padding: 10px;
        border: 1px solid #000;
      }
      #inner {
        height: 10px;
        width: 100px;
        margin: 50px auto auto 30px;
        padding: 20px;
        border: 1px solid #000;
      }
      .table {
        border: 1px solid black;
      }
      .back {
        background-color: #f00;
      }
      .fore {
        color: #fff;
      }
      .space {
        padding: 15px;
      }
    `
  ]
})
export class AppComponent {
  //クラスバインディング
  clazz: string = "blue";
  classFlag: boolean = true;
  // スタイルバインディング
  bgColor: string = "#0ff";
  bgRed: boolean = true;
  // プロパティとか
  len: number = 3;
  member = {
    name: "Takashi",
    age: 25
  };
  styleFlagChange() {
    this.bgRed = !this.bgRed;
  }
  msg: string = "---";
  timeShow() {
    this.msg = new Date().toLocaleString();
  }
  mousePotion = {
    screenX: 0,
    screenY: 0,
    pageX: 0,
    pageY: 0,
    clientX: 0,
    clientY: 0,
    offsetX: 0,
    offsetY: 0
  };
  mouseMove(e: any) {
    this.mousePotion.screenX = e.screenX;
    this.mousePotion.screenY = e.screenY;
    this.mousePotion.pageX = e.pageX;
    this.mousePotion.pageY = e.pageY;
    this.mousePotion.clientX = e.clientX;
    this.mousePotion.clientY = e.clientY;
    this.mousePotion.offsetX = e.offsetX;
    this.mousePotion.offsetY = e.offsetY;
  }
  keyProp = {
    which: "",
    altKey: false,
    ctrlKey: false,
    shiftKey: false
  };
  keyDownEvent(e: any) {
    this.keyProp.which = e.which;
    this.keyProp.altKey = e.altKey;
    this.keyProp.ctrlKey = e.ctrlKey;
    this.keyProp.shiftKey = e.shiftKey;
  }
  mask(e: any) {
    const k = e.which;
    if (!((k >= 48 && k <= 57) || k === 45 || k === 8 || k === 0)) {
      e.preventDefault();
    }
  }
  onclick1(e: any) {
    console.log("outterをクリック");
  }
  onclick2(e: any) {
    e.stopPropagation();
    console.log("innerをクリック");
  }
  liHtml: string = "";
  addListItem(input: string) {
    this.liHtml += `<li>${input}</li>`;
  }
  liHtmlEn: string = "";
  addListItemEn(input: string) {
    this.liHtmlEn += `<li>${input}</li>`;
  }
  safeMsg: SafeHtml;
  safeUrl: SafeResourceUrl;
  image: string = "http://www.wings.msn.to/image/wings.jpg";
  html: string = `
    <p>hogehogehogehoge</p>
    <input type="button" onclick="alert('HOGE')" value="ボタン" />
  `;
  url: string = "http://www.wings.msn.to/";
  // 双方向バインディング
  myName: string = "田中";
  myName2: string = "山口";
  myName3: string = "Hatanaka";
  // パイプ
  pipeTitle: string = "ＷＩＮＧＳ project";
  obj: any = {
    name: "Takashi",
    gender: undefined,
    birth: new Date(2007, 7, 15),
    age: 12,
    family: ["Taro", "Jiro", "Tanaka"],
    work: function() {
      console.log("Hello World!");
    },
    other: {
      favorite: "肉",
      memo: "イカす"
    }
  };
  sliceStr: string = "アイウエオカキクケコ";
  sliceAry: string[] = [
    "あ",
    "い",
    "う",
    "え",
    "お",
    "か",
    "き",
    "く",
    "け",
    "こ"
  ];
  pipePrice: number = 3500.1256;
  pipeParcent: number = 0.123456;
  pipeDate: Date = new Date();
  favUsers: string[] = ["田中", "山田", "田島"];
  favMessages: any = {
    "=0": "[いいね！]されていません。",
    "=1": "1人だけ[いいね！]と言ってくれています。",
    other: "#人が[いいね！]と言っています。"
  };
  pushArrayItem(name: string) {
    this.favUsers.push(name);
  }
  popArrayItem() {
    this.favUsers.pop();
  }
  members: any[] = [
    {
      name: "たかし",
      sex: "female"
    },
    {
      name: "John",
      sex: "male"
    },
    {
      name: "MR.X",
      sex: "unknown"
    }
  ];
  messages = {
    male: "彼",
    female: "彼女",
    unknown: "不明"
  };

  //4-2 : ディレクティブ
  // ngIf
  showFlag: boolean = false;
  //ngSwitch
  season: string = "";
  //ngFor
  books: { isbn: string; title: string; price: number; publisher: string }[] = [
    {
      isbn: "978-4-7741-8411-1",
      title: "改定新版 Javascript 本格入門",
      price: 2980,
      publisher: "技術評論社"
    },
    {
      isbn: "978-4-7741-8411-2",
      title: "AAAA",
      price: 2000,
      publisher: "A社"
    },
    {
      isbn: "978-4-7741-8411-3",
      title: "BBBB",
      price: 3000,
      publisher: "B社"
    },
    {
      isbn: "978-4-7741-8411-4",
      title: "CCC",
      price: 4000,
      publisher: "C社"
    }
  ];
  eto: string[] = [
    "子",
    "丑",
    "寅",
    "卯",
    "辰",
    "巳",
    "午",
    "未",
    "申",
    "酉",
    "戌",
    "亥"
  ];
  articles: { title: string; body: string; author: string }[] = [
    { title: "1のタイトル", body: "1のボディ", author: "1の作者" },
    { title: "2のタイトル", body: "2のボディ", author: "2の作者" },
    { title: "3のタイトル", body: "3のボディ", author: "3の作者" }
  ];
  books2: {
    isbn: string;
    title: string;
    price: number;
    publisher: string;
  }[] = [
    {
      isbn: "978-4-7741-8411-1",
      title: "改定新版 Javascript 本格入門",
      price: 2980,
      publisher: "技術評論社"
    },
    {
      isbn: "978-4-7741-8411-2",
      title: "AAAA",
      price: 2000,
      publisher: "A社"
    },
    {
      isbn: "978-4-7741-8411-3",
      title: "BBBB",
      price: 3000,
      publisher: "B社"
    },
    {
      isbn: "978-4-7741-8411-4",
      title: "CCC",
      price: 4000,
      publisher: "C社"
    }
  ];
  addBooks(): void {
    const booksCnt = this.books2.length + 1;
    this.books2.push({
      isbn: "978-4-7741-8411-" + booksCnt,
      title: booksCnt + "さん",
      price: booksCnt * 1000,
      publisher: booksCnt + "社"
    });
  }
  removeBooks(): void {
    this.books2.pop();
  }
  trackFn(index: any, book: any) {
    return book.isbn;
  }

  start: number = 0;
  bookLen: number = 3;
  books3: {
    isbn: string;
    title: string;
    price: number;
    publisher: string;
  }[] = [
    {
      isbn: "978-4-7741-8411-1",
      title: "改定新版 Javascript 本格入門",
      price: 2980,
      publisher: "技術評論社"
    },
    {
      isbn: "978-4-7741-8411-2",
      title: "AAAA",
      price: 2000,
      publisher: "A社"
    },
    {
      isbn: "978-4-7741-8411-3",
      title: "BBBB",
      price: 3000,
      publisher: "B社"
    },
    {
      isbn: "978-4-7741-8411-4",
      title: "CCC",
      price: 4000,
      publisher: "C社"
    },
    {
      isbn: "978-4-7741-8411-5",
      title: "CCC",
      price: 4000,
      publisher: "C社"
    },
    {
      isbn: "978-4-7741-8411-6",
      title: "CCC",
      price: 4000,
      publisher: "C社"
    },
    {
      isbn: "978-4-7741-8411-7",
      title: "CCC",
      price: 4000,
      publisher: "C社"
    }
  ];
  pager(page: number) {
    this.start = this.bookLen * page;
  }
  //ngStyle
  back: boolean = true;
  fore: boolean = true;
  space: boolean = true;
  get styles() {
    return {
      backgroundColor: this.back ? "#f00" : "",
      color: this.fore ? "#fff" : "#000",
      fontWeight: "bold",
      "padding.px": this.space ? 15 : 5
    };
  }
  ngClassStyles = {
    back: false,
    fore: false,
    space: false
  };
  pluralFavs: string[] = ['aaa','bbb','ccc']
  tempBook: number=0;

  //
  interval: any;
  comps = [EventComponent,BooksComponent,WingsComponent]
  current = 0; 
  bunner :any = EventComponent;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.current = (this.current + 1) % this.comps.length;
      this.bunner = this.comps[this.current];
    },3000)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  constructor(private sanitizer: DomSanitizer) {
    this.safeMsg = sanitizer.bypassSecurityTrustHtml(this.html);
    this.safeUrl = sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
