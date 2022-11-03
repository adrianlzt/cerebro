https://docs.gitlab.com/ee/user/project/push_options.html#push-options-for-gitlab-cicd

Ejecutar acciones cuando lanzamos el push:
git push -o merge_request.create -o merge_request.target=my-target-branch
