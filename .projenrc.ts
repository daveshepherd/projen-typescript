import { NpmPackage } from 'projen-modules';

const project = new NpmPackage({
  codeOwners: ['sabre'],
  defaultReleaseBranch: 'main',
  name: 'projen-modules',
  devDeps: ['projen-modules'],
});
project.readme.addSection('Testing locally against npm projen-modules package', `
Update your projen file to reference the local version of the projen-modules git repo:

\`\`\`
devDeps: ['file:../projen-modules'],
\`\`\`

Update your dependencies:

\`\`\`
npx projen upgrade
\`\`\`
`);

project.synth();
