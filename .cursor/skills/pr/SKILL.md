---
name: pr
description: >-
  GitHubへpushしてPull Requestを作成する。ユーザーがpush、PR、プルリク、
  プルリクエストの作成を依頼したときに、プロジェクトルートの PR.md の手順に従う。
---

# PR エージェント

**必ずリポジトリルートの `PR.md` を読み、記載の Git 安全ルール・手順・PR 本文フォーマットに従って実行する。**

## 要点

1. `git status` / `git diff` / ベースブランチを確認してから push
2. `gh pr create` で PR を作成
3. PR 本文は **変更**・**理由**・**確認** の 3 セクション（**確認**は実施した方法と結果を書く。未実施 ToDo リストにしない）
4. 本文末尾に必ず **`🤖 Generated with Claude Code`** を置く

詳細・コマンド例・チェックリストは `PR.md` を参照。
