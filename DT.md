# Documentation technique

## Gestion du versionning

### [Commitlint](https://github.com/conventional-changelog/commitlint)

```bash
yarn add @commitlint/cli -D
yarn add @commitlint/config-conventional -D
```

## [commitizen](https://commitizen.github.io/cz-cli/)
```bash
yarn add commitizen -D or yarn add commitizen -g
yarn add cz-conventional-changelog -D
```

Feel free to use a target local to your project.
```bash
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

## [cz-emoji](https://github.com/ngryman/cz-emoji) (optional)
Note: this requires [changes to commitlint](https://github.com/ngryman/cz-emoji#commitlint).
```bash
yarn add cz-emoji -D
```

Replaces `cz-conventional-changelog`.
```bash
echo '{ "path": "cz-emoji" }' > ~/.czrc
```

Optionally use unicode instead of [gitmoji](https://gitmoji.dev/) by editing the `~/.czrc`:
```bash
{
  "path" : "cz-emoji",
      "cz-emoji": {
        "symbol": true
      }

}

```
