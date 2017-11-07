Podemos encadenar jobs mediante "Acciones para ejecutar despues".
Las tareas asi unidas podremos verlas en la vista de pipe unidas mediante flechas.

Si queremos unir varios jobs a uno "padre", pondremos sus nombres separados por comas en la sección de "Downstream Project Names" (para el caso del "Build other projects (manual stepp)")


El plugin solo permite ejecutar manualmente los siguientes pasos en caso de que el upstream job sea succeeded o unstable:
src/main/java/au/com/centrumsystems/hudson/plugin/buildpipeline/PipelineBuild.java:445
    public boolean isReadyToBeManuallyBuilt() {
      return  this.currentBuild == null && (upstreamBuildSucceeded() || upstreamBuildUnstable()) && hasBuildPermission();
    }

