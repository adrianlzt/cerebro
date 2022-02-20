Soluciones open source de analítica web.
Equivalentes a google analytics.

https://matomo.org/
https://posthog.com/

# Matomo
## helm
https://artifacthub.io/packages/helm/t3n/matomo

Configurar el ingress para poner el dominio que queramos.
Al realizar la config inicial, en el navegador, dejar los parámetros que vienen por defecto en la db.

Cambiar también la pass de la db y el "salt".


Si al configurar el "Sitio de internet" nos da este error:
Se ha producido un error al añadir el sitio de internet:
- SQLSTATE[42S02]: Base table or view not found: 1146 Table 'matomo.matomo_custom_dimensions' doesn't exist

Entrar en la db y crear esta tabla:
CREATE TABLE `matomo_custom_dimensions` (
  `idcustomdimension` bigint(20) unsigned NOT NULL,
  `idsite` bigint(20) unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `index` smallint(5) unsigned NOT NULL,
  `scope` varchar(10) NOT NULL,
  `active` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `extractions` text NOT NULL,
  `case_sensitive` tinyint(3) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`idcustomdimension`,`idsite`),
  UNIQUE KEY `uniq_hash` (`idsite`,`scope`,`index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
