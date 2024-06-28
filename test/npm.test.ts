import { synthSnapshot } from 'projen/lib/util/synth';
import { NpmPackage } from '../src/npm';

describe('NPM Package', () => {
  it('synthesizes', () => {
    const project = new NpmPackage({
      defaultReleaseBranch: 'main',
      name: 'test',
    });

    const output = synthSnapshot(project);

    expect(output).toMatchSnapshot();
  });
});
