# Pages CMS 編集移行メモ（SETOUCHI ATLAS）

## 現在の仕組み
- サイトは Astro + GitHub Pages。
- 本文データの多くは `src/data/bookArticles.js` などの JavaScript にある。
- `src/pages/book/[slug].astro` は `src/content/essays/*.md` を参照し、該当 slug の Markdown がある場合に本文を優先表示する。
- `getStaticPaths()` は現在も JavaScript 側の既存記事を列挙している。

## 第1段階（このブランチ）
- `.pages.yml` で Markdown エッセイ編集メニューを設定。
- 既存 URL とページデザインを変更しない。
- 新規記事の作成、改名、削除は CMS 上で禁止。既存の JS 記事リストと乖離する事故を防ぐため。
- 公開時には現在の GitHub Actions / Astro ビルドを使用する。

## 次の段階
1. 全記事の最終的な原稿（編集オーバーライドを含む）を一記事ずつ確定する。
2. slug が同じ Markdown を作り、ページ表示が JS 原稿と同等以上であることを検証する。
3. タイトルや導入文が一覧・SEO・関連記事にも反映されるように、記事メタデータの単一ソース化を進める。
4. 写真やキャプションは既存 ID を保持する。挿入画像のアップロード先は `public/images/essays`。
5. すべての公開経路で動作を検証してから新規記事の作成を解禁する。

## 注意点
- Markdown 本文だけ更新しても、現在の一覧表示や関連記事に使われる JS 側タイトルまで更新されるとは限らない。
- JavaScript 側に残る記事は Pages CMS にまだ並ばない。
- Astro ビルド、公開 URL、写真表示の実機確認を完了してから main にマージする。
