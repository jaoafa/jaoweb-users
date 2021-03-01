# jaoweb-users

jao Minecraft Server Users

jao Minecraft Serverに一度でも参加したことのある利用者の情報を表示するサイトです。

## Development

### Environment

- NodeJS (Tested with v15.4.0)
- Yarn (Tested with v1.22.5)
- Framework: Vue 2, Nuxt.js
- Language: TypeScript
- Code Formatter/Lint: ESLint + Prettier

### Linter

- ESLint: TypeScript / JavaScript / Vue Linter
- CommitLint: Commit message Linter
- Stylelint: Stylesheet Linter

### Other

CommitLintによってコミットメッセージに対してのルールが設定されています。このルールに合致しない場合コミットが通りません。

- 原則的に、次の形式でコミットメッセージを指定してください: `type(scope): subject` (e.g. `fix(home): message`)
  - `type`, `subject` は必須、 `scope` は必須ではありません
- `type-enum`: `type` は必ず次のいずれかにしなければなりません
  - `build`: ビルド関連
  - `ci`: CI関連
  - `chore`: いろいろ
  - `docs`: ドキュメント関連
  - `feat`: 新機能
  - `fix`: 修正
  - `perf`: パフォーマンス改善
  - `refactor`: リファクタリング
  - `revert`: コミットの取り消し
  - `style`: コードスタイルの修正
  - `test`: テストコミット
- `type-case`: `type` は必ず小文字でなければなりません (NG: `FIX` / OK: `fix`)
- `type-empty`: `type` は必ず含めなければなりません (NG: `test message` / OK: `test: message`)
- `scope-case`: `scope` は必ず小文字でなければなりません (NG: `fix(HOME): message` / OK: `fix:(home): message`)
- `subject-case`: `subject` は必ず次のいずれかの書式でなければなりません `sentence-case`, `start-case`, `pascal-case`, `upper-case`
- `subject-empty`: `subject` は必ず含めなければなりません (NG: `fix:` / OK: `fix: message`)
- `subject-full-stop`: `subject` は `.` 以外で終えてください (NG: `fix: message.` / OK: `fix: message`)

など 詳しくは: [ルール](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#rules)

[Vue.jsのスタイルガイド](https://jp.vuejs.org/v2/style-guide/index.html) を参考にしてください。必ずこれに沿うというわけではありませんが、大筋はこれを用います。

## Backend System

基本的に `api.jaoafa.com` のVersion2 APIを使用してクライアントサイドからデータの取得を行います（一部v1のAPIを使っています）。reCAPTCHAv3による認証を必要とさせます。サーバサイドプログラムは一般公開されていません。

## Issue, Pull Requests

このプロジェクトにおいては Issue や Pull Requests などを受け付けています。

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

ライセンスは**独自のライセンスである[jaoLicense](https://github.com/jaoafa/jao-Minecraft-Server/blob/master/jaoLICENSE.md)を適用**します。
