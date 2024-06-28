import { circleci, typescript } from 'projen';
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'projen-modules',
  projenrcTs: true,
  autoMerge: false,
  githubOptions: {
    workflows: false,
  },

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
new circleci.Circleci(project, {
  jobs: [
    {
      identifier: 'build',
      resourceClass: circleci.ResourceClass.SMALL,
      docker: [
        {
          image: 'cimg/node:lts',
        },
      ],
      steps: [
        'checkout',
        {
          run: {
            name: 'Install dependencies',
            command: 'yarn install --check-files',
          },
        },
        {
          run: { name: 'build', command: 'npx projen build' },
        },
        {
          run: {
            name: 'Find mutations',
            command: `
git add .
git diff --staged --patch --exit-code > .repo.patch || echo "export SELF_MUTATION_HAPPENED=true" >> $BASH_ENV
            `,
          },
        },
      ],
    },
  ],
  workflows: [
    {
      identifier: 'build',
      jobs: [
        {
          identifier: 'build',
        },
      ],
    },
  ],
});
project.synth();
