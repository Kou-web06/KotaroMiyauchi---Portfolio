# PR エージェント

GitHub へ push し、Pull Request を作成するワークフロー。ユーザーが「push して」「PR 作って」「プルリク出して」などと依頼したとき、このファイルの手順に従う。

## 前提

- `gh` CLI がインストール済みで認証済みであること
- リモート `origin` が GitHub を指していること
- `CLAUDE.md` のプロジェクト方針（最小 diff・日本語応答）に従う

## Git 安全ルール

- **git config は変更しない**
- **force push（特に main/master）・hard reset 等の破壊的操作はユーザー明示時のみ**
- **--no-verify 等でフックをスキップしない**（ユーザー明示時のみ）
- **コミットはユーザーが依頼したとき、または本 PR ワークフローの一環として明示的にコミットまで含める依頼があったときのみ**
- **main/master への force push は禁止**（依頼があっても警告する）
- コミットメッセージは `git log` の文体に合わせ、1〜2 文で「なぜ」を書く

## 実行手順

### 1. 状態確認（並列で実行）

```bash
git status
git diff
git diff --staged
git branch -vv
git log -5 --oneline
```

- 未コミットの変更がある → ユーザーが PR 作成まで依頼している場合のみステージ・コミット
- ベースブランチ（通常 `main` または `master`）を特定する

### 2. ブランチ

- すでに feature ブランチにいる → そのまま利用
- `main` / `master` 上で作業している → 変更内容に沿ったブランチ名を切る（例: `feat/qlear-project`, `chore/remove-skills`）

```bash
git checkout -b <branch-name>
```

### 3. コミット（必要な場合）

- `.env` や資格情報はコミットしない
- 関連ファイルのみ `git add`

```bash
git commit -m "$(cat <<'EOF'
<1〜2文のコミットメッセージ>

EOF
)"
```

### 4. Push

```bash
git push -u origin HEAD
```

upstream が未設定の初回 push では `-u` を付ける。

### 5. Pull Request 作成

**タイトル**: 変更の要点を 1 行（基本は日本語。リポジトリに合わせた言語）。

**本文**: 必ず次の 3 セクション + 末尾クレジット。**セクション名はこの表記のまま**（変更・理由・確認）。

```markdown
## 変更

- （箇条書きで何を変えたか）

## 理由

- （なぜその変更が必要か）

## 確認

- （変更内容ごとに「どう確認したか」と「結果」を書く。実施済みの事実のみ）

---

🤖 Generated with Claude Code
```

**クレジット行は PR 本文の最下部に必ず 1 行入れる。** 文言は `🤖 Generated with Claude Code` をそのまま使う（省略・改変しない）。

```bash
gh pr create --title "<PRタイトル>" --body "$(cat <<'EOF'
## 変更

- 

## 理由

- 

## 確認

- 

---

🤖 Generated with Claude Code
EOF
)"
```

ベースブランチが `main` でない場合:

```bash
gh pr create --base <base-branch> --title "..." --body "$(cat <<'EOF'
...
EOF
)"
```

### 6. 完了報告

- 作成した **PR の URL** をユーザーに返す
- コミットに含めたファイルの要約を短く伝える

## PR 本文の書き方

| セクション | 内容 |
| ---------- | ---- |
| **変更** | ファイル・機能単位の事実。推測より diff に基づく記述 |
| **理由** | ユーザー要望・バグ・UX 改善などの背景 |
| **確認** | **実施した確認方法と結果**。「何を」「どう試し」「どうなったか」を変更に対応づけて書く。未実施の ToDo チェックリストにはしない |

PR 作成前に、変更に関係する範囲をエージェント自身が可能な限り確認し、このセクションには **確認済みの結果** だけを書く。確認できなかった項目は「未確認（理由）」と明記する。

### 確認セクションの書き方

- 1 項目 = **対象（どの変更か）** + **方法（手順・環境）** + **結果（期待どおり／問題なし 等）**
- 例: 「Projects に Qlear を追加 → ローカルで `index.html` を開きカード・App Store リンクをクリック → 画像表示・リンク先とも問題なし」

## このリポジトリでの確認例（記載例）

```markdown
## 確認

- Projects の Qlear カード: `npx serve` でローカル表示し、サムネと App Store リンクが意図どおり表示されることを確認した
- ハンバーガーメニュー: News / About / Projects / Contact 各アンカーへ遷移し、Skills リンクがないことを確認した
- モバイル幅（DevTools 375px）: Projects グリッドのレイアウト崩れがないことを確認した
```

## 失敗時

- `gh auth` エラー → ユーザーに `gh auth login` を案内
- push 拒否 → リモートとの差分を説明し、rebase/merge はユーザー確認後
- 空 PR（変更なし）→ PR を作らず、状態を報告する
