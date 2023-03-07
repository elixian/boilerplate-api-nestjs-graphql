# Documentation technique

## Gestion du versionning

### [release-it]()

```bash
yar add relase-it -D
```

then add config file ```.release-it.json```

```json
{
  "git":{
    "requireBranch":"main",
    "commitMessage":"chore: release v${version}"

  },
  "hooks":{
    "before:init": ["git pull", "yarn lint"],
    "after:bump": ["npx auto-changelog -p"]

  }
}
```

### [Commitlint](https://github.com/conventional-changelog/commitlint)

```bash
yarn add @commitlint/cli -D
yarn add @commitlint/config-conventional -D
```

then add config file ```.commitlintrc.json```

```json
{
    "extends": ["@commitlint/config-angular"],
    "rules": {
      "subject-case": [
        2,
        "always",
        ["sentence-case", "start-case", "pascal-case", "upper-case", "lower-case"]
      ],
      "type-enum": [
        2,
        "always",
        [
          "build",
          "chore",
          "ci",
          "docs",
          "feat",
          "fix",
          "perf",
          "refactor",
          "revert",
          "lint",
          "test",
          "example"
        ]
      ]
    }
  }
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

## Uniformisation de la configuration editeur

Ajouter l'extension VSCode editorconfig et creer un fichier ```.editorconfig ```

```yml
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```
