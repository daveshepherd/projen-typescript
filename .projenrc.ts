import { NpmPackage } from './src/npm';

const project = new NpmPackage({
  name: 'projen-modules',
  codeOwnersOptions: { owners: ['sabre'] },
});

project.synth();
