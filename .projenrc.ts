import { NpmPackage } from 'projen-jsii';

const project = new NpmPackage({
  codeOwners: ['sabre'],
  defaultReleaseBranch: 'main',
  name: 'projen-modules',
  devDeps: ['file:../projen-jsii'],
});

project.synth();
