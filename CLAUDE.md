# Kotaro Miyauchi — Portfolio

宮内洸太朗の個人ポートフォリオサイト。ビルドツールなしの静的サイト（HTML / CSS / Vanilla JS）。

## 構成

| ファイル | 役割 |
| -------- | ---- |
| `index.html` | ページ構造・コンテンツ（News / About / Projects / Contact） |
| `style.css` | スタイル（セクション単位のコメント区切り） |
| `script.js` | ローディング、ハンバーガーメニュー、ヒーローのタイピング、スクロールアニメーション |
| `img/` | プロジェクトサムネ・SNS アイコンなど |

外部依存: Ress（CSS リセット）、LINE Seed JP、Material Symbols Outlined、onedivloaders（ローダー）。

## セクションとナビ

アンカー ID とメニューは一致させる。

- `#news` — News
- `#about` — About Me
- `#works` — Projects（見出しは「Projects」）
- `#contact` — Contact

**Skills セクションは削除済み。** 復活させない（ユーザー要望）。

## コンテンツ追加の作法

### Projects（`#works` 内の `.flex` > `.work-items`）

既存カード（例: Tickemo）をコピーして編集する。

- `.label` / `.label.add` — カテゴリ表示（例: `Web制作`, `Webアプリ`, `Hackathon`, `ios`）
- `.work-icon` 内の `img` — `img/` 配下の PNG
- `.demo-links` — 外部リンク（`open_in_new`）。GitHub がある場合は `github-white.png` のリンクを追加
- `.work-text` — `h2`（作品名）、`p`（説明）、`.tech` 内の `.tag`（技術タグ）

### News（`#news` 内の `dl`）

先頭に新しい `.news-items` を追加。`dt` は日付、`dd` はリンク付きテキスト、`span.category` は `#WORK` / `#SCHOOL` / `#LIFE` / `#EVENT` のいずれか。

## JavaScript の注意

- `'use strict'` とブロックスコープ `{ ... }` で全体をラップしている
- スキル用モーダルは削除済み — 関連 DOM を復活させない
- フェードアップ等のスクロール演出は `script.js` 末尾付近を確認してから変更する

## ローカル確認

静的ファイルのため、ルートで HTTP サーバを立てて `index.html` を開く。

```bash
npx --yes serve .
```

または Live Server 等で `index.html` を直接開いてもよい（相対パスの `img/` を崩さないこと）。

## デプロイ

本番: [kotaromiyauchi-portfolio.vercel.app](https://kotaromiyauchi-portfolio.vercel.app/)（Vercel 想定）。変更は主に `index.html` / `style.css` / `script.js` / `img/`。

## コーディング方針（エージェント向け）

- 最小限の diff。フレームワーク導入や大規模リファクタは依頼がない限りしない
- 既存のクラス名・HTML パターン・日本語コピーのトーンに合わせる
- コミットはユーザーが明示したときのみ
- ユーザーとのやり取りは日本語

## GitHub push / PR

GitHub へ push して PR を作るときは **`PR.md`**（および Cursor スキル `pr`）に従う。PR 本文は **変更・理由・確認** の 3 セクション（**確認**は変更に対してどう確認し、結果どうだったか）と、末尾の `🤖 Generated with Claude Code` を必須とする。

## クレジット

アニメーション参考は `README.md` を参照。
