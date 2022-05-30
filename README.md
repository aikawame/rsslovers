# RSS愛好会

## 概要

[RSS愛好会](https://rss.wor.jp/) は、新聞社等のサイトでRSSフィードが配信されていない場合に代わりにフィード配信を行うためのサービスです。

ウェブサイトのフロントエンド、管理システム、クローラーの3つに大きく機能分割されています。

### フロントエンド

RSS愛好会のウェブサイト本体です。

- 言語: TypeScript 4.7
- フレームワーク: Next.js 12.x
- Linter: ESLint
- CI/CD: Vercel
- インフラ: Vercel

### 管理システム

フィードの管理システムです。

[Googleスプレッドシート](https://docs.google.com/spreadsheets/d/1TZf0LKn42hoE-5Q2y0gnhJY4Gsju_wcVw4zW6CLBbU8/edit?usp=sharing) 上のフィードデータをJSONに変換し、Amazon S3にアップロードします。

アップロードされたJSONファイルはフロントエンドから呼び出されます。

- 言語: TypeScript 4.7
- Linter: ESLint
- CI/CD: GitHub Actions
- デプロイ: Clasp
- インフラ: Google App Script

### クローラー

RSS愛好会で配信するためのフィードを各外部サイトから収集するためのクローラーです。

- 言語: Ruby 2.7
- フレームワーク: Ruby on Rails 7.0
- Linter: RuboCop
- CI/CD: GitHub Actions
- デプロイ: Serverless Framework
- インフラ: AWS Lambda

## コントリビュート

### 手順

1. ソースコードを [フォーク](https://github.com/aikawame/rsslovers/fork) します。
2. ブランチを切ります。 ( `git checkout -b feature/hogehoge` )
3. 変更をコミットします。 ( `git commit -am ':sparkles: 何やらを追加する'` )
4. ブランチをプッシュします。 ( `git push origin feature/hogehoge` )
5. プルリクエストを作成します。

### コミット

- コミットメッセージの先頭に [gitmoji](https://gitmoji.dev/) を使用してください。
- コミットメッセージは「○○する」といった動詞で記述してください。

### テスト

現在はESLintおよびRuboCopによるコーディングスタイルの検証のみ行っています。

### プルリクエスト

`main` ブランチに対して行ってください。  
その際、改修対象機能群のテストを全て通過する必要があります。

### デプロイ

プルリクエストがマージされた際に、変更対象に応じたCI/CDが自動的に実行されます。
