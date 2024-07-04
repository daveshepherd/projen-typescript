import { NpmPackage } from 'projen-modules';

const project = new NpmPackage({
  codeOwners: ['sabre'],
  defaultReleaseBranch: 'main',
  name: 'projen-modules',
  devDeps: ['file:../projen-modules'],
});

project.synth();
