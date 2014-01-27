https://code.google.com/p/google-motion-charts-with-r/

googleVis is an R package providing an interface between R and the Google Chart Tools. The functions of the package allow the user to visualise data with the Google Chart Tools without uploading their data to Google.

The output of googleVis functions is html code that contains the data and references to JavaScript functions hosted by Google. To view the output a browser with Flash and Internet connection is required, the actual chart is rendered in the browser.

install.packages("googleVis")
library(googleVis)
demo(WorldBank)
