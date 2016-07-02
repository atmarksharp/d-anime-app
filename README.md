## d-anime-app

<img src="https://raw.githubusercontent.com/atmarksharp/d-anime-app/master/icon.png" alt="icon" style="max-width: 200px;"/>

dアニメストアを表示するだけのOSX向けアプリです。[Electron](http://electron.atom.io/)をベースに作っています。

自分用に作ったので、動作の保証はできません。

ブラウザで見るのに比べて、ウィンドウがコンパクトになります。Afloatなどで最前面表示したいときにも便利です。

OSX向けに作っていますが、コードを修正すればWindows/Linuxでも動作します。

## ショートカットキー

- Backspace: 戻る
- Shift + Backspace: 進む
- Command + [+/=]: 拡大
- Command + [-]: 縮小
- Command + [0]: 原寸表示

## ビルド

まずはリポジトリをクローン。

```bash
git clone https://github.com/atmarksharp/d-anime-app
```

次に[Using Widevine CDM Plugin](http://electron.atom.io/docs/tutorial/using-widevine-cdm-plugin/)の手順に従い、`libwidevinecdm.dylib` 及び `widevinecdmadapter.plugin`をプロジェクトのルートフォルダにコピーします。

```bash
cd d-anime-app/
cp /path/to/libwidevinecdm.dylib libwidevinecdm.dylib
cp /path/to/widevinecdmadapter.plugin widevinecdmadapter.plugin
```

さらにWidevine CDMのバージョンに応じて、`main.js`の以下の部分を修正します。

```js
app.commandLine.appendSwitch('widevine-cdm-path', `${app.getAppPath()}/widevinecdmadapter.plugin`);
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866');
```

そして以下のスクリプトを実行。アプリケーションが生成されます。

```bash
npm install
npm run-script build-osx
```

完成したアプリケーションは `built/` 以下にあります。
