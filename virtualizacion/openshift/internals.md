# Creando app
Al crear una app, al hacer el build del dockerfile se añaden los siguientes step:
Step 8 : ENV "OPENSHIFT_BUILD_NAME" "golang-ex-1" "OPENSHIFT_BUILD_NAMESPACE" "myproject" "OPENSHIFT_BUILD_SOURCE" "https://github.com/openshift/golang-ex" "OPENSHIFT_BUILD_COMMIT" "bfa8a811ae477bd4e43fc739f146a2b2c1cb63c4"
Step 9 : LABEL "io.openshift.build.commit.author" "Ben Parees \u003cbparees@users.noreply.github.com\u003e" "io.openshift.build.commit.date" "Mon Dec 12 10:18:16 2016 -0500" "io.openshift.build.commit.id" "bfa8a811ae477bd4e43fc739f146a2b2c1cb63c4" "io.openshift.build.commit.ref" "master" "io.openshift.build.commit.message" "Merge pull request #18 from guangxuli/fix_branch" "io.openshift.build.source-location" "https://github.com/openshift/golang-ex"

