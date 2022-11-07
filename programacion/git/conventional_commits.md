https://www.conventionalcommits.org/en/v1.0.0/

Ejemplo:

feat: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.

A properly formed Git commit subject line should always be able to complete the following sentence:
 * If applied, this commit _with your subject line here_


Types @commitlint/config-conventional (based on the the Angular convention):
  fix:      donde corregimos algo, subirá el último dígito de semver
  feat:     añadimos nueva funcionalidad, subirá el dígito de en medio de semver
  chore:    changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
  docs:     documentation only changes
  perf:     a code change that improves performance
  refactor: a code change that neither fixes a bug nor adds a feature
  style:    changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  test:     adding missing tests or correcting existing tests

Estos 3 no vienen en commitizen-go por defecto:
  build:    canges that affect the build system or external dependencies (example scopes: pip, go.mod, npm)
  ci:       changes to our CI configuration files and scripts
  revert:   revert previous commit. See angular docs

Script en go para poder hacer:
git cz
Y que nos aparezcan unos menus para generar el commit
yay aur/commitizen-go

La tool original (nodejs): https://github.com/commitizen/cz-cli

Script python que abre una serie de menus en la consola para generar los commits con este formato
https://pypi.org/project/conventional-commit/


CLI para verificar el formato, con hooks o con CI (node.js)
https://github.com/conventional-changelog/commitlint
https://commitlint.js.org/#/guides-ci-setup

Para container de docker
RUN apt-get update && apt-get install -y npm \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g --save-dev @commitlint/cli @commitlint/config-conventional && \
    echo "module.exports = {extends: ['/usr/local/lib/node_modules/@commitlint/config-conventional']}" > /commitlint.config.js


Último commit:
commitlint --from=HEAD~1

Pasando el commit a mano:
echo "${CI_COMMIT_MESSAGE}" | commitlint
