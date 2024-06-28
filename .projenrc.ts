import { NpmPackage } from './src/npm';

const project = new NpmPackage({
  defaultReleaseBranch: 'main',
  name: 'projen-modules',
});
project.synth();
