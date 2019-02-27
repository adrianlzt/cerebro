https://github.com/gonum/plot/wiki/Example-plots

go get gonum.org/v1/plot/...


import (
  "gonum.org/v1/plot"
  "gonum.org/v1/plot/plotter"
  "gonum.org/v1/plot/plotutil"
  "gonum.org/v1/plot/vg"
)


  p, err := plot.New()
  if err != nil {
    panic(err)
  }

  p.Title.Text = "Big-O"
  p.X.Label.Text = "Tamaño array"
  p.Y.Label.Text = "Valores"

  err = plotutil.AddLinePoints(p,
    "Time", benchmarkTimePoints(data),
    "MemAlloc", benchmarkMemAllocations(data),
    "MemUse", benchmarkMemUse(data))
  if err != nil {
    panic(err)
  }

  // Save the plot to a PNG file.
  if err := p.Save(16*vg.Inch, 16*vg.Inch, "points.png"); err != nil {
    panic(err)
  }



func benchmarkTimePoints(data map[int]testing.BenchmarkResult) plotter.XYs {
  pts := plotter.XYs{}

  sortedMapIntString(data,
    func(k int, v testing.BenchmarkResult) {
      pts = append(pts, plotter.XY{X: float64(k), Y: float64(v.NsPerOp())})
    })
  return pts
}

