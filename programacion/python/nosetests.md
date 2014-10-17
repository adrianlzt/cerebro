pip install nose
pip install coverage

nosetestsets
  busca y ejecuta los tests

nosetests -s -v --with-cov cyclops --cover-erase \
    --cover-branches --cover-xml-file=target/site/cobertura/coverage.xml --cover-xml \
    --with-xunit --xunit-file=target/surefire-reports/TEST-nosetests.xml

  -s, --nocapture        Don't capture stdout (any stdout output will be printed immediately)
  -v, --verbose          Be more verbose
  --with-cov cyclops     Importa el modulo cyclops
  --cover-erase          Erase previously collected coverage statistics before run
  --cover-branches       Include branch coverage in coverage report
  --cover-xml            Produce XML coverage information
  --cover-xml-file=FILE  Produce XML coverage information in file
  --with-xunit           Enable plugin Xunit: This plugin provides test results in the standard XUnit XML format.
  --xunit-file=FILE      Path to xml file to store the xunit report in. Default is nosetests.xml in the working directory



  --cover-html           Produce HTML coverage information

nosetests -s -v --cover-erase --cover-branches --cover-html --with-cov
  genera un directorio cover/ con los resultados
  Si ponemos al final un nombre, buscara ese modulo para hacer los test.
