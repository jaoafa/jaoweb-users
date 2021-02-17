# jaoweb-users

`users.jaoafa.com`でホストするユーザページプロジェクト

## Overview

jao Minecraft Serverに一度でも参加したことのある利用者の情報を表示するサイトです。

現行の[`jaoafa.com/user`](https://jaoafa.com/user/)とは以下のように異なる予定です。

- ユーザのデータをクライアントサイド・API経由で取得することにより、レスポンスタイムが改善される
- Vue.js利用によって静的ファイルで運用できる
- 情報量が増える
- フロントエンドのソースコード等を公開可能になる
- 他者からのIssueやプルリクエストを受けられやすくなる

ヒラタケによるWebサイト再制作を待たずに独立して運用するため、デザインがメインWebサイトと異なり、質の低いものとなると思われます。ヒラタケの多忙が改善して時間が取れればCSSを書いてもらうことをお願いするかもしれません。

## Development

### Environment

- NodeJS (Tested with v15.4.0)
- Yarn (Tested with v1.22.5)
- Framework: Nuxt.js
- Language: Vue 2, TypeScript
- Code Formatter/Lint: ESLint + Prettier

### Linter

- ESLint: TypeScript / JavaScript / Vue Linter
- CommitLint: Commit message Linter
- Stylelint: Stylesheet Linter

### Other

CommitLintによってコミットメッセージに対してのルールが設定されています。このルールに合致しない場合コミットが通りません。[ルール](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#rules)

[Vue.jsのスタイルガイド](https://jp.vuejs.org/v2/style-guide/index.html) を参考にしてください。  
必ずこれに沿うというわけではありませんが、大筋はこれを用います。もし現行のコードでこれから外れているものがある場合は今後スタイルガイドへ合わせます。

## 表示予定項目

以下の項目を表示予定です。一部の情報はユーザのアクションによって表示させます。

- スタッフの場合Verifiedマーク（Twitter的な）
- MinecraftID
- MinecraftUUID
- 初ログイン日時（〜ヶ月前とかの表記）
- 最終ログイン日時（〜ヶ月前とかの表記）
- 累計ログイン時間
- 権限
- 投票回数
- MCBans評価値
- MCBans Ban履歴（〜ヶ月前とかの表記）
- Discord連携情報・サブアカウント情報
- 取得jSA実績一覧
- ログイン履歴直近10件
- PeriodMatch2直近10件
- 処罰数カウンタ
- 各種処罰直近10件（GBan・LBan・VBan等は別） 

その他、ほしい情報があればご連絡ください。

## システム・その他

`api.jaoafa.com`のVersion2 APIを使用してクライアントサイドからデータの取得を行います。reCAPTCHAv3による認証を必要とさせます。サーバサイドプログラムは一般公開されていません。

Vue.js等の技術勉強と並行して制作します。完成日はかなり先になります。  
jao Minecraft Serverで活動しているユーザに限りますが、もし何かしら協力してくれる方がいれば言ってください。アイデア提供やプロジェクトへの参加をしてもらうかもしれません。

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## ライセンス

jaoLicenseかMIT Licenseで運用します。アイデア転用を防ぐためにjaoLicenseを適用するかもしれません。
