# KII ATLAS: Pages CMS編集運用

## 対象と編集方法
- 同じGitHubリポジトリ `fantactics/setouchi-cultural-economic-atlas` を使用。
- Pages CMS (`https://app.pagescms.org/`) にログインし、リポジトリを開く。
- `main` ブランチで **「KII ATLAS｜エッセイ」** を選ぶと既存の9記事が表示される。
- 本文はリッチテキスト方式で編集でき、タイトルとリード文も更新できる。
- 保存すると `src/content/kii-essays/<slug>.md` が更新され、サイト再ビルド後に公開内容へ反映される。
- SETOUCHI ATLASの60本は従来どおり別の「エッセイ」コレクションに属する。

## データ移行
- 移行前の原稿データは `src/data/kiiArticles.js` に残してあり、Git履歴で復元可能。
- 9件の原稿は見出しと段落の順番を維持してMarkdown化した。
- 題名、導入、カテゴリ、地域、自然条件タグ、画像URL、代替テキスト、写真クレジット、参考文献はMarkdown frontmatterにも保持。
- `src/data/kiiCmsArticles.js` がMarkdown frontmatterを公開サイトの一覧・地域・自然条件の各ページに渡す。
- 個別エッセイページではMarkdown Contentを描画。既存slug、URL、ナビゲーション、写真、配色、index制御は変えない。
- 写真情報や出典はCMS側の入力欄に表示せず、既存値を保持する（`.pages.yml` の `settings.content.merge`）。

## 安全性
- URLを保護するため、Pages CMSの新規作成・ファイル改名・削除を無効。
- `scripts/check-kii-cms-articles.mjs` が9原稿のメタデータ・写真・出典・slugを検査。
- `scripts/check-kii-cms-rendered.mjs` がサイト生成後の9ページとKII独立配布版を検証。
- サイト共通のActionsでもSET0UCHIのページ表示とKIIサイトのルート・検索非掲載設定を引き続き検査。
- 公開後の手動変更についてもCIが構造チェックを行うが、実ブラウザでの細かな見た目の違いまでは保証できない。

## 注意
- この段階では既存9本の編集が対象。新規作成機能や写真アップロード機能は未対応。
- `KII ATLAS` は事前公開段階で検索エンジンへの掲載を制限している。この方針は変更しない。
