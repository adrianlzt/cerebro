https://www.conventionalcommits.org/en/v1.0.0/

Ejemplo:

feat: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.



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
