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

## 保存テスト結果（2026-11-07）
- Pages CMS から `setouchi-sushi-not-nigiri.md` の保存には成功。
- フロントマターのトップレベル項目は残ったが、`rich-text` が本文中の `<sup>` 脚注HTMLを自動変換してしまい、複数出典へのリンクが失われる問題を検出。
- テスト保存による変更は、元の原稿に完全復元済み（mainのファイルと同じ内容・blob SHA）。
- 対策として本文編集を `type: code` / `format: markdown` に変更。WYSIWYGではなくソース編集となるが、埋め込みHTMLを保護するための暫定措置。
- 次回はこの新しい設定で保存差分を再確認する。完全な視覚編集には脚注・出典参照の形式統一が必要。

## 編集情報の同期（作業ブランチ内）
- `src/data/essayMarkdownMetadata.js` を追加。対応するMarkdownがある場合、タイトル・副題・導入文・分類・地名・キーワードの原稿メタデータを優先する。
- ホームページ、エッセイ一覧、関連作品推薦用の公開記事集合に適用。
- JavaScriptからMarkdownへ移行していない記事は従来の情報を使用する。
- 本文、写真ギャラリー、本文脚注、記事URLはこの変更の対象外。
- GitHub Actionsの検証完了後にマージ可否を判断。

## Markdown原稿の網羅状況（2026-11-07）
- GitHubのリポジトリツリーを再調査し、作業前は `src/content/essays/` にMarkdownが57ファイルあることを確認。
- `src/data/quageoSetouchiEssays.js` から次の3本をMarkdownへ転記：
  - `chichibugahama-sky-in-tide.md`
  - `ogushi-theatron-sea-as-stage.md`
  - `tatsuno-water-castle-and-soy-sauce.md`
- 作業ブランチでは合計60本。3記事は見出し・段落本文を移した。heroPhotoやoriginalPhotoSequenceは引き続き既存JavaScriptのメタデータを参照するため、写真は削除せず維持する。
- 追加後の GitHub Actions（Validate ATLAS sites / Editorial PR validation）両方成功。
- まだMarkdown化されていない記事は残る。特に `farmland-or-solar`, `after-the-solar-farm` や旧研究版の記事の取り扱いを区別して整理すること。
- CMSのソース編集で本文中のHTML脚注を保持できるかは、修正後の実機保存テストを完了するまで未確認。

## 2026-11-07: 限定的な視覚編集（試験）
- フロントマターと本文が簡素で、HTML脚注のない3本を対象として、Pages CMSに独立した「視覚編集テスト」編集画面を追加。
  - 父母ヶ浜 `chichibugahama-sky-in-tide.md`
  - 大串半島 `ogushi-theatron-sea-as-stage.md`
  - 龍野 `tatsuno-water-castle-and-soy-sauce.md`
- これらの独立編集画面は `rich-text` / `format: markdown`。画像挿入は安全性確認まで無効。
- 一般エッセイ一覧の本文欄は引き続き `code` / `format: markdown`。脚注HTMLを含む記事には視覚編集を使用しない。
- 複数のUIが同じファイルを対象とするため、同時編集・上書きに注意。保存前後の差分比較が必要。
- 視覚編集テストでは見出し、段落、強調、URL、写真メタデータと段落順序が保たれることを確認するまで本番運用しない。

## Markdown照合メモ
- `src/data/bookArticles.js` の記事slug42件に対し、Markdownは38件に対応（作業ブランチの調査）。
- 未対応は `farmland-or-solar`, `after-the-solar-farm`, `tadano-shido-industrial-ecosystem`, `miura-matsuyama-small-boiler-revolution`。
- 後者2件はアーカイブ研究記事として扱われるため、公開エッセイと混同しない。
- 他のデータファイルのエッセイも個別に照合する必要がある。

## 視覚編集・父母ヶ浜の保存検証（2026-11-07）
- Pages CMSの視覚編集テスト画面から `chichibugahama-sky-in-tide.md` の末尾に「視覚編集テスト」を追加して保存。
- 保存前後で、本文からテスト文字列を取り除いた内容が完全一致。見出し、段落の欠落なし。
- YAMLフロントマターのキー `slug,title,subtitle,lead,part,cities,keywords,migration` はすべて残存。YAML配列と引用符はCMSによって正規化。
- テスト文を除去し、保存前の原稿そのものに復元。復元後のGit blob SHAは元原稿と一致。
- HTML脚注を持つ原稿は以前のリッチテキストテストで脚注表記が変換されたため、今回の成功結果を流用しない。
- 次は大串半島・龍野の同様の画面表示と保存テスト、そして本文HTMLの安全な表記移行を検討。

## 視覚編集・第2回保存検証（2026-11-07）
- 大串半島 `ogushi-theatron-sea-as-stage.md` と龍野 `tatsuno-water-castle-and-soy-sauce.md` の両方でCMSからのテスト文字列追記を確認。
- どちらもテスト文字列を除いた本文が事前原稿と完全一致し、見出しと段落は維持された。フロントマターのキーも完全保持。
- 2件とも原本へ復元し、Git blob SHAが元原稿と一致。
- 父母ヶ浜を含めて3記事の単純な視覚編集往復テストに成功。ただし脚注HTMLを含む記事への適用を意味しない。

## 出典リンク付き視覚編集のパイロット（2026-11-07）
- 対象: `setouchi-sushi-not-nigiri.md`（「瀬戸内の寿司は握らず、分ける」）。本文16か所、合計23件のソース参照。
- 編集前: `<sup class="book-footnotes"><a href="#source-2">[2]</a>...</sup>` のHTML脚注。
- 編集後: `[2](#source-2)` というMarkdown標準の内部リンク。リンク先 `id=source-2` や `sources` メタデータは変更しない。
- 本文内のアンカータグのみ変換し、出典タイトル・URL・写真・本文テキストを維持。表示時はCSSで上付き脚注らしくスタイルを指定。
- Pages CMSに「視覚編集テスト｜瀬戸内の寿司（脚注あり）」を追加。一般エッセイ一覧のソース編集方式はそのまま維持。
- 次の受入試験: テスト文字列を保存後、23件すべての `#source-N` アンカー、16箇所の注記グループ、記事本文、`sources`、`heroPhoto` が不変か検査。保存後の差分確認まで既存記事全般には展開しない。
- 留意: 上付き脚注の文字の間隔や複数リンクの並びなど、HTML版と完全なピクセル一致は保証しない。

## 出典付き記事の視覚編集・第1回往復テスト（2026-11-07）
- 「瀬戸内の寿司は握らず、分ける」についてCMSから本文末尾への追記保存に成功。
- 本文の出典アンカー23件・フロントマターの全10キーは維持された。
- 本文に隠していた `<!-- photoIds: photo-matsuyama-zushi-shared-bowl -->` のHTMLコメントがWYSIWYG保存で消失することを確認。**視覚編集はHTMLコメントを保護しない**。
- 対処: テスト文を除去して原稿を復元した上で、当該写真配置情報をフロントマターの `editorialPhotoPlacements` 配列へ移動。本文中のHTMLコメントは削除（バックアップはGit履歴に残る）。
- `editorialPhotoPlacements` は将来の写真配置用に保存する編集メタデータであり、現在の公開写真描画を変更するものではない。
- 出典アンカー23件と出典一覧・ヒーロー写真の情報はそのまま残している。
- この新しい構成については**再保存テストが未実施**。実際のCMS保存後に `editorialPhotoPlacements` が保持されるか確認する必要がある。

## 出典付き記事の視覚編集・第2回往復テスト（2026-11-07）
- CMS側で「視覚編集テスト2」を追記し保存。
- 本文出典リンク23件は完全保持。写真配置メタデータ `editorialPhotoPlacements` と `photo-matsuyama-zushi-shared-bowl` が維持された。
- ほかのフロントマターキーも維持。文章と見出しの内容は保持され、空行1行のみ正規化。
- テスト文は除去し、原稿を保存前のファイル内容に復元。Git blob SHA一致。
- 留意: HTMLコメントを含む未変換原稿は、視覚編集でコメントが消えることが既に確認されている。既存60記事の無条件一括切替は行わない。

## 全60本の本文形式監査と第2段階の視覚編集対象（2026-11-07）
- `src/content/essays/` のMarkdown60本について、本文HTML脚注、HTMLコメント、Markdown出典リンク、埋込画像記法を確認。
- 既にHTML脚注なしの4本は `chichibugahama-sky-in-tide`, `ogushi-theatron-sea-as-stage`, `tatsuno-water-castle-and-soy-sauce`, `setouchi-sushi-not-nigiri`。前3本は単純な視覚編集往復試験成功、寿司は出典23件とフロントマター写真配置を維持する往復試験成功。
- 残る56本に旧式のHTML脚注が残っていた。HTMLコメントによる写真位置情報がある記事も多く、無差別に視覚編集へ移行しない。
- 第2段階として、本文内にHTMLコメントがなく、脚注をMarkdownへ一対一変換できる次の3本を追加:
  - `hijiki-tidal-time`: 脚注13箇所・リンク31件
  - `awaji-onion-rice-field`: 脚注8箇所・リンク13件
  - `fish-waste-to-feed-and-citrus`: 脚注8箇所・リンク14件
- これらは本文のHTML脚注をMarkdownリンクに置換したのみ。出典・写真等のフロントマターは変更していない。
- Pages CMSに3つの独立した視覚編集テスト項目を設けた。一般エッセイ一覧の本文は安全のためソース編集を維持。
- 現時点で4本は視覚編集の保存試験済み、新規3本は変換・画面設定済みだが、CMSからの再保存テストは未実施。
