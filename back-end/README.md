# biotec

## コマンドラインによる処理

- ランダムにコドン配列を生成する
```bash
$ ts-node tools/main.ts create --size 200 -o ./data/in
```

- 翻訳
```bash
$ ts-node tools/main.ts translate -i ./data/in -o ./data/out
```

- 最適化
```bash
$ ts-node tools/main.ts optimize -i ./data/in -o ./data/out
```

- 制限酵素が、配列に存在するかをチェックする。
```bash
$ ts-node tools/main.ts check --rease EcoRI,TestI,TestII,TestIII,TestIV -i ./data/out -o ./data/check
```
- サイズで抽出する。
```bash
$ ts-node tools/main.ts extract -i ./data/out -o ./data/out
```

- コマンドヘルプ
```bash
 $ ts-node tools/main.ts -h
 # ex. ts-node tools/nedb.ts import -d ./db/master/restraction-enzyme-table -i ./import/restraction-enzyme-table.db
```

# マスタ情報操作

- データのインポート
```bash
 $ ts-node tools/nedb.ts import -d <db-table> -i <import file>
 # ex. ts-node tools/nedb.ts import -d ./db/master/restraction-enzyme-table -i ./import/restraction-enzyme-table.db
```

- コマンドヘルプ
```bash
 $ ts-node tools/nedb.ts -h
 # ex. ts-node tools/nedb.ts import -d ./db/master/restraction-enzyme-table -i ./import/restraction-enzyme-table.db
```
