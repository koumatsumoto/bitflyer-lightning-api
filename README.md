# npm-package-template-2024

## 初回設定

GitHub Template Repository としてこのリポジトリを使って新しいリポジトリを作った後は、以下のコマンドで正しいリポジトリの名前に置き換えて使う。

```
TEMPLATE_REPOSITOY_NAME=npm-package-template-2024
REPOSITORY_NAME=
sed -i s/$TEMPLATE_REPOSITOY_NAME/$REPOSITORY_NAME/ README.md ./package.json ./package-lock.json
```
