import { circleci } from 'projen';
import { NpmPackage } from './npm';

export class NpmCircleCi extends circleci.Circleci {
  constructor(project: NpmPackage) {
    super(project, {
      jobs: [
        {
          identifier: 'build',
          resourceClass: circleci.ResourceClass.SMALL,
          docker: [
            {
              image: 'cimg/node:lts',
            },
          ],
          steps: [
            'checkout',
            {
              run: {
                name: 'Install dependencies',
                command: 'yarn install --check-files',
              },
            },
            {
              run: { name: 'build', command: 'npx projen build' },
            },
            {
              run: {
                name: 'Find mutations',
                command: `git add .
git diff --staged --patch --exit-code > .repo.patch || echo "export SELF_MUTATION_HAPPENED=true" >> $BASH_ENV`,
              },
            },
          ],
        },
      ],
      workflows: [
        {
          identifier: 'build',
          jobs: [
            {
              identifier: 'build',
            },
          ],
        },
      ],
    });
  }
}
