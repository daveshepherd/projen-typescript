import { NpmPackage } from 'projen-modules';

const project = new NpmPackage({
  codeOwners: ['sabre'],
  defaultReleaseBranch: 'main',
  name: 'projen-modules',
  devDeps: ['projen-modules@^0.0.11'],
});

project.synth();
