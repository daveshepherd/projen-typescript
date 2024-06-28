import { typescript } from 'projen';
import { NpmCircleCi } from './circleci';
import { CodeOwners, CodeOwnersOptions } from './codeowners';
import { mergeOptions } from './utils/merge-options';

type TypeScriptProjectOptionsCustom = Omit<
typescript.TypeScriptProjectOptions,
'defaultReleaseBranch'
>;

export interface NpmPackageOptions extends TypeScriptProjectOptionsCustom {
  /**
   * Options used to generate the CODEOWNERS file
   */
  codeOwnersOptions: CodeOwnersOptions;
  /**
   * The default release branch for this project.
   * @defaultValue "main"
   */
  defaultReleaseBranch?: string;
}
function getOptions(options: NpmPackageOptions) {
  const { name } = options;

  const defaults = {
    name,
    autoMerge: false,
    defaultReleaseBranch: 'main',
    githubOptions: {
      workflows: false,
    },
    gitignore: ['.npmrc', '.vscode'],
    peerDeps: ['projen'],
    pullRequestTemplateContents: [
      '### Background',
      '_Short description of issue being resolved or a feature being added._',
      '',
      '**JIRA TICKET**: [SAB-](https://unibuddy.atlassian.net/browse/SAB-)',
      '',
      '### Problems Encountered / Decisions Made / Potential Solutions Abandoned',
      '_Any problems you had when working on the PR and what decisions or trade-offs you had to make._',
      '',
      '### Check List',
      '* [ ] Added tests for all new code.',
      '* [ ] Added comments and documentation for new code.',
    ],
    projenrcTs: true,
    readme: {
      filename: 'README.md',
      contents: `# ${name}

Example README
    `,
    },
  } satisfies Partial<NpmPackageOptions>;

  return mergeOptions(defaults, options);
}

export class NpmPackage extends typescript.TypeScriptProject {
  constructor(options: NpmPackageOptions) {
    const mergedOptions = getOptions(options);

    super({
      ...mergedOptions,
    });

    new CodeOwners(this, mergedOptions.codeOwnersOptions);
    new NpmCircleCi(this);
  }
}
