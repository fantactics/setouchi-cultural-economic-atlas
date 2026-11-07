# SETOUCHI ATLAS: Pages CMS 導入・Markdown編集移行

## 2026-11-07 確認結果
- サイトは Astro + GitHub Pages。現在の表示ルートは `src/pages/book/[slug].astro`。
- `src/content/essays/*.md` を同名 slug の公開記事に重ねて表示する仕組みがすでにある。
- `four-salt-fields.md`, `kojima-from-cotton-to-jeans.md`, `sanuki-store-the-rain.md`, `setouchi-sushi-not-nigiri.md` の既存Markdown原稿を実際に確認した。
- したがって全記事をゼロから変換するのではなく、既存MarkdownのCMS編集対応を最優先し、未変換の記事だけを後で抽出する。
- `getStaticPaths()` と記事一覧・関連記事などの基礎データはまだ JavaScript に依存している。Markdownを追加するだけで新規記事を公開できるとは限らない。

## 第1段階（このドラフトPR）
- `.pages.yml` に既存Markdown編集設定を置く。
- `settings.content.merge: true` を必須とする。これがないとPages CMSは設定にないフィールド（写真・出典・調査リンクなど）を保存時に削除しうる。
- 事故防止のため、作成・改名・削除は禁止。URL用 slug は編集不可。
- 公開中の文章、URL、デザイン、記事ページの表示ロジックは変更しない。

## 検証事項（マージ前）
1. Pages CMS で作業ブランチを選択し、記事一覧が出ることを確認。
2. 既存のMarkdownの記事を1本開き、タイトル・本文を読み込めることを確認。
3. **バックアップと差分検証を前提に** ダミー変更を保存・差分比較し、`sources`, `heroPhoto`, `heroPhotoId`, `researchLinks`, `migration` などが失われないことを確認。本文中のHTML脚注等も確認。
4. Astroビルドでエラーがないこと、記事ページと一覧のリンク・写真・SEOが崩れないことを確認。
5. 必要に応じて本文編集後のSEO・一覧側のタイトル同期の仕組みを追加。

## 第2段階
- 既存Markdownと公開記事一覧との網羅的な照合。未移行の記事だけMarkdown化。
- JS側の重複メタデータの整理、一覧・関連記事・SEOの同一データ化。
- 写真管理・新規記事公開をCMSで行えるように拡張し、作成制限を解除。

## KII ATLAS
- リポジトリと原稿形式を特定してから別途設定。SETOUCHIの設定を無検証で流用しない。
