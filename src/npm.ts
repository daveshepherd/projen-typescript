import { typescript } from 'projen';
import { NpmCircleCi } from './circleci';

export interface NpmPackageOptions
  extends typescript.TypeScriptProjectOptions {}

export class NpmPackage extends typescript.TypeScriptProject {
  constructor(options: NpmPackageOptions) {
    super({
      autoMerge: false,
      githubOptions: {
        workflows: false,
      },
      gitignore: ['.npmrc', '.vscode'],
      peerDeps: ['projen'],
      projenrcTs: true,
      ...options,
    });
    new NpmCircleCi(this);
  }
}
