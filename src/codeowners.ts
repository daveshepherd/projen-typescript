import { TextFile } from 'projen';
import { NpmPackage } from './npm';
export type CodeOwner = 'ibex' | 'kaizen' | 'sabre';

export type CodeOwnersOptions = {
  owners: Array<CodeOwner>;
};

export class CodeOwners {
  constructor(project: NpmPackage, options: CodeOwnersOptions) {
    project.npmignore?.addPatterns('CODEOWNERS');

    new TextFile(project, 'CODEOWNERS', {
      lines: options.owners.map((owner) => `* @unibuddy/${owner}`),
    });
  }
}
