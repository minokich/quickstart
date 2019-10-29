import { Component } from "@angular/core";
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl
} from "@angular/platform-browser";

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
  `,
  styles: [
    `
      .block {
        border: solid 1px;
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
  myName: string = "田中";
  myName2: string = "山口";
  myName3: string = "Hatanaka";
  constructor(private sanitizer: DomSanitizer) {
    this.safeMsg = sanitizer.bypassSecurityTrustHtml(this.html);
    this.safeUrl = sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
