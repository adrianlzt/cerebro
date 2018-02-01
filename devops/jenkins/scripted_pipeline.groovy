def call(Map config) {
  properties ([
    pipelineTriggers ([
       gitlab(
         triggerOnPush: true,
         triggerOnMergeRequest: true,
         noteRegex: "Jenkins please retry a build",
         setBuildDescription: true,
         branchFilterType: 'All',
         secretToken: config.token
       )
    ]),
    gitLabConnection("GitLab")
  ])
  try {
    node("docker") {
      stage("Checkout") {
        checkout scm
      }
      stage("Build") {
        sh "make"
      }
      stage("Test") {
        sh "make test"
      }
      if (env.gitlabActionType == 'TAG_PUSH') {
        stage("Tag") {
          sh "make tag"
          sh "make images"
        }
      }
      if (env.gitlabActionType == 'TAG_PUSH') {
        stage("Push") {
          withCredentials([usernamePassword(credentialsId: 'docker_registry', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
            sh "make push"
          }
        }
      }
    }
    mattermostSend color: "good", channel: config.mattermost_channel, message: "Build OK: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>). Event: ${env.gitlabActionType}. Ref: ${env.gitlabTargetBranch}"
  } catch (exc) {
    mattermostSend color: "danger", channel: config.mattermost_channel, message: "Build error: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>). Event: ${env.gitlabActionType}. Ref: ${env.gitlabTargetBranch}"
  }
}
