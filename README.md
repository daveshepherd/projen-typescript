## Initial setup

1. Create git repo in github

1. Add to circleci
   1. Select "Projects"
   1. In the list of projects click "Set Up Project" against your repo
   1. Select the config.yml file from the main branch

## Testing locally against npm projen-modules package

Update your projen file to reference the local version of the projen-modules git repo:

```
devDeps: ['file:../projen-modules'],
```

Update your dependencies:

```
npx projen upgrade
```
