## d-anime-app

<img src="https://raw.githubusercontent.com/atmarksharp/d-anime-app/master/icon.png" alt="icon" style="max-width: 200px;"/>

dアニメストアを表示するだけのOSX向けアプリです。[Electron](http://electron.atom.io/)をベースに作っています。

自分用に作ったので、動作の保証はできません。

ブラウザで見るのに比べて、ウィンドウがコンパクトになります。Afloatなどで最前面表示したいときにも便利です。

OSX向けに作っていますが、コードを修正すればWindows/Linuxでも動作します。

## ショートカットキー

- Command + [+/=]: 拡大
- Command + [-]: 縮小
- Command + [0]: 原寸表示

## ビルド

```bash
npm install
npm run-script build-osx
```

完成した実行ファイルは `built/` 以下に配置されます。
