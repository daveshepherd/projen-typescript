# projen-modules

## Getting Started

```sh
yarn install
npx projen build
```

## Testing locally against npm projen-modules package


Update your projen file to reference the local version of the projen-modules git repo:

```
devDeps: ['file:../projen-modules'],
```

Update your dependencies:

```
npx projen upgrade
```
