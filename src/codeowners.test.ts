import { synthSnapshot } from 'projen/lib/util/synth.js';
import { NpmPackage } from './npm';

describe('CodeOwners', () => {
  it('matches the snapshot', () => {
    const project = new NpmPackage({
      name: 'test',
      codeOwnersOptions: {
        owners: ['sabre'],
      },
    });

    const output = synthSnapshot(project).CODEOWNERS;

    expect(output).toMatchSnapshot();
  });
});
