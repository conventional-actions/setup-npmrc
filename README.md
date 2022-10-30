# setup-npmrc

A GitHub Action for setting up a .npmrc file for accessing npm repositories.

## Usage

To use the GitHub Action, add the following to your job:

```yaml
- uses: conventional-actions/setup-npmrc@v1
```

### Inputs

| Name           | Default           | Description                                                                                                                                                                |
|----------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `always-auth`  | `false`           | Set always-auth in npmrc.                                                                                                                                                  |
| `registry-url` |                   | Registry to set up for auth. Will set the registry in a project level .npmrc file.                                                                                         |
| `scope`        |                   | Optional scope for authenticating against scoped registries. Will fall back to the repository owner when using the GitHub Packages registry (https://npm.pkg.github.com/). |
| `token`        | `${github.token}` | Token to use for authenticating to the registry                                                                                                                            |

### Outputs

No outputs

### Example

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: conventional-actions/setup-npmrc@v1
        with:
          always-auth: true
          registry-url: https://registry.npmjs.org/
          scope: @conventional-actions
          token: ${{ secrets.NPM_TOKEN }}
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).

