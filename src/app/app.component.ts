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
      <h3>innerHtmlと外部リソースの埋め込み</h3>
      <div [innerHTML]="safeMsg"></div>
      <iframe [src]="safeUrl"></iframe>
    </div>
  `,
  styles: [
    `
      .block {
        border: solid 1px;
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
  safeMsg: SafeHtml;
  SafeUrl: SafeResourceUrl;
  image: string = "http://www.wings.msn.to/image/wings.jpg";
  msg: string = `
    <p>hogehogehogehoge</p>
    <input type="button" onclick="alert('HOGE')" value="ボタン" />
  `;
  url: string = "http://www.wings.msn.to/";

  constructor(private sanitizer: DomSanitizer) {
    this.safeMsg = sanitizer.bypassSecurityTrustHtml(this.msg);
    this.SafeUrl = sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
