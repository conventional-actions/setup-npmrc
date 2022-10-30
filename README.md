# setup-npmrc

A GitHub Action for setting up a .npmrc file for accessing npm repositories.

## Usage

To use the GitHub Action, add the following to your job:

```yaml
- uses: conventional-actions/setup-npmrc@v1
```

### Inputs

| Name       | Default                    | Description             |
|------------|----------------------------|-------------------------|
| `machine`  | `github.com`               | the remote machine name |

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
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).

