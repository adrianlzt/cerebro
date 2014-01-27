function draw_with_data(data, parent_id) {
  var g = d3.select(parent_id)
            .append("svg")
              .attr("width", "152.4mm")
              .attr("height", "152.4mm")
              .attr("viewBox", "0 0 152.4 152.4")
              .attr("stroke-width", "0.5")
              .attr("style", "stroke:black;fill:black");
  g.append("defs");
  var ctx = {
      "scale": 1.0,
      "tx": 0.0,
      "ty": 0.0
  };
(function (g) {
  g.attr("class", "plotroot xscalable yscalable");
  (function (g) {
    d3.select("defs")
  .append("svg:clipPath")
    .attr("id", parent_id + "_clippath0")
    .append("svg:path")
      .attr("d", " M5,1 L 23.82 1 23.82 130.76 5 130.76 z");g.attr("clip-path", "url(#" + parent_id + "_clippath0)");
    (function (g) {
      g.attr("stroke", "none")
       .attr("fill", "#4C404B")
       .attr("font-family", "'PT Sans','Helvetica Neue','Helvetica',sans-serif")
       .style("font-size", "3.18px")
       .attr("class", "guide ylabels");
      g.append("svg:text")
         .attr("x", 22.82)
         .attr("y", 185.08)
         .attr("text-anchor", "end")
         .style("dominant-baseline", "central")
      .call(function(text) {
  text.text("-0.5");
})
;
      g.append("svg:text")
         .attr("x", 22.82)
         .attr("y", -50.32)
         .attr("text-anchor", "end")
         .style("dominant-baseline", "central")
      .call(function(text) {
  text.text("1.5");
})
;
      g.append("svg:text")
         .attr("x", 22.82)
         .attr("y", 67.38)
         .attr("text-anchor", "end")
         .style("dominant-baseline", "central")
      .call(function(text) {
  text.text("0.5");
})
;
      g.append("svg:text")
         .attr("x", 22.82)
         .attr("y", 126.23)
         .attr("text-anchor", "end")
         .style("dominant-baseline", "central")
      .call(function(text) {
  text.text("0.0");
})
;
      g.append("svg:text")
         .attr("x", 22.82)
         .attr("y", 243.92)
         .attr("text-anchor", "end")
         .style("dominant-baseline", "central")
      .call(function(text) {
  text.text("-1.0");
})
;
      g.append("svg:text")
         .attr("x", 22.82)
         .attr("y", 8.53)
         .attr("text-anchor", "end")
         .style("dominant-baseline", "central")
      .call(function(text) {
  text.text("1.0");
})
;
      g.append("svg:text")
         .attr("x", 22.82)
         .attr("y", 302.77)
         .attr("text-anchor", "end")
         .style("dominant-baseline", "central")
      .call(function(text) {
  text.text("-1.5");
})
;
      g.append("svg:text")
         .attr("x", 22.82)
         .attr("y", -109.17)
         .attr("text-anchor", "end")
         .style("dominant-baseline", "central")
      .call(function(text) {
  text.text("2.0");
})
;
      g.append("svg:text")
         .attr("x", 22.82)
         .attr("y", -168.01)
         .attr("text-anchor", "end")
         .style("dominant-baseline", "central")
      .call(function(text) {
  text.text("2.5");
})
;
    }(g.append("g")));
    (function (g) {
      g.attr("stroke", "none")
       .attr("fill", "#362A35")
       .attr("font-family", "'PT Sans','Helvetica Neue','Helvetica',sans-serif")
       .style("font-size", "3.88px");
      g.append("svg:text")
         .attr("x", 9.17)
         .attr("y", 67.38)
         .attr("text-anchor", "middle")
         .style("dominant-baseline", "central")
         .attr("transform", "rotate(-90, 9.17, 67.38)")
      .call(function(text) {
  text.text("y");
})
;
    }(g.append("g")));
  }(g.append("g")));
  (function (g) {
    d3.select("defs")
  .append("svg:clipPath")
    .attr("id", parent_id + "_clippath1")
    .append("svg:path")
      .attr("d", " M11.46,129.76 L 159.76 129.76 159.76 147.4 11.46 147.4 z");g.attr("clip-path", "url(#" + parent_id + "_clippath1)");
    (function (g) {
      g.attr("stroke", "none")
       .attr("fill", "#4C404B")
       .attr("font-family", "'PT Sans','Helvetica Neue','Helvetica',sans-serif")
       .style("font-size", "3.18px")
       .attr("class", "guide xlabels");
      g.append("svg:text")
         .attr("x", -89.27)
         .attr("y", 136.05)
         .attr("text-anchor", "middle")
      .call(function(text) {
  text.text("-100");
})
;
      g.append("svg:text")
         .attr("x", -30.98)
         .attr("y", 136.05)
         .attr("text-anchor", "middle")
      .call(function(text) {
  text.text("-50");
})
;
      g.append("svg:text")
         .attr("x", 260.49)
         .attr("y", 136.05)
         .attr("text-anchor", "middle")
      .call(function(text) {
  text.text("200");
})
;
      g.append("svg:text")
         .attr("x", 318.78)
         .attr("y", 136.05)
         .attr("text-anchor", "middle")
      .call(function(text) {
  text.text("250");
})
;
      g.append("svg:text")
         .attr("x", 27.31)
         .attr("y", 136.05)
         .attr("text-anchor", "middle")
      .call(function(text) {
  text.text("0");
})
;
      g.append("svg:text")
         .attr("x", 202.2)
         .attr("y", 136.05)
         .attr("text-anchor", "middle")
      .call(function(text) {
  text.text("150");
})
;
      g.append("svg:text")
         .attr("x", 143.9)
         .attr("y", 136.05)
         .attr("text-anchor", "middle")
      .call(function(text) {
  text.text("100");
})
;
      g.append("svg:text")
         .attr("x", -147.57)
         .attr("y", 136.05)
         .attr("text-anchor", "middle")
      .call(function(text) {
  text.text("-150");
})
;
      g.append("svg:text")
         .attr("x", 85.61)
         .attr("y", 136.05)
         .attr("text-anchor", "middle")
      .call(function(text) {
  text.text("50");
})
;
    }(g.append("g")));
    (function (g) {
      g.attr("stroke", "none")
       .attr("fill", "#362A35")
       .attr("font-family", "'PT Sans','Helvetica Neue','Helvetica',sans-serif")
       .style("font-size", "3.88px");
      g.append("svg:text")
         .attr("x", 85.61)
         .attr("y", 145.4)
         .attr("text-anchor", "middle")
      .call(function(text) {
  text.text("x");
})
;
    }(g.append("g")));
  }(g.append("g")));
  (function (g) {
    g.on("mouseover", guide_background_mouseover("#C6C6C9"))
     .on("mouseout", guide_background_mouseout("#F0F0F3"))
     .call(zoom_behavior(ctx))
;
    (function (g) {
      d3.select("defs")
  .append("svg:clipPath")
    .attr("id", parent_id + "_clippath2")
    .append("svg:path")
      .attr("d", " M23.82,5 L 147.4 5 147.4 129.76 23.82 129.76 z");g.attr("clip-path", "url(#" + parent_id + "_clippath2)");
      (function (g) {
        g.attr("class", "guide background")
         .attr("stroke", "#F1F1F5")
         .attr("fill", "#FAFAFA");
        g.append("svg:path")
           .attr("d", "M23.82,5 L 147.4 5 147.4 129.76 23.82 129.76 z");
      }(g.append("g")));
      (function (g) {
        g.attr("stroke", "#F0F0F3")
         .attr("stroke-width", 0.2)
         .attr("class", "guide ygridlines xfixed");
        g.append("svg:path")
           .attr("d", "M23.82,185.08 L 147.4 185.08");
        g.append("svg:path")
           .attr("d", "M23.82,-50.32 L 147.4 -50.32");
        g.append("svg:path")
           .attr("d", "M23.82,67.38 L 147.4 67.38");
        g.append("svg:path")
           .attr("d", "M23.82,126.23 L 147.4 126.23");
        g.append("svg:path")
           .attr("d", "M23.82,243.92 L 147.4 243.92");
        g.append("svg:path")
           .attr("d", "M23.82,8.53 L 147.4 8.53");
        g.append("svg:path")
           .attr("d", "M23.82,302.77 L 147.4 302.77");
        g.append("svg:path")
           .attr("d", "M23.82,-109.17 L 147.4 -109.17");
        g.append("svg:path")
           .attr("d", "M23.82,-168.01 L 147.4 -168.01");
      }(g.append("g")));
      (function (g) {
        g.attr("stroke", "#F0F0F3")
         .attr("stroke-width", 0.2)
         .attr("class", "guide xgridlines yfixed");
        g.append("svg:path")
           .attr("d", "M-89.27,5 L -89.27 129.76");
        g.append("svg:path")
           .attr("d", "M-30.98,5 L -30.98 129.76");
        g.append("svg:path")
           .attr("d", "M260.49,5 L 260.49 129.76");
        g.append("svg:path")
           .attr("d", "M318.78,5 L 318.78 129.76");
        g.append("svg:path")
           .attr("d", "M27.31,5 L 27.31 129.76");
        g.append("svg:path")
           .attr("d", "M202.2,5 L 202.2 129.76");
        g.append("svg:path")
           .attr("d", "M143.9,5 L 143.9 129.76");
        g.append("svg:path")
           .attr("d", "M-147.57,5 L -147.57 129.76");
        g.append("svg:path")
           .attr("d", "M85.61,5 L 85.61 129.76");
      }(g.append("g")));
    }(g.append("g")));
    (function (g) {
      d3.select("defs")
  .append("svg:clipPath")
    .attr("id", parent_id + "_clippath3")
    .append("svg:path")
      .attr("d", " M23.82,5 L 147.4 5 147.4 129.76 23.82 129.76 z");g.attr("clip-path", "url(#" + parent_id + "_clippath3)");
      (function (g) {
        g.attr("class", "plotpanel");
        (function (g) {
          g.attr("stroke-width", 0.3);
          (function (g) {
            g.attr("stroke-width", 0.3);
g.selectAll("form0")
                  .data(d3.zip(data[0],data[1]))
                  .enter()
                  .append("circle")
.attr("cx", function(d) { return d[0]; })
.attr("cy", function(d) { return d[1]; })
.attr("r", 0.6)
.attr("class", "geometry color_LCHab(70.0,60.0,240.0)_")
.on("mouseout", geom_point_mouseover(0.30), false)
.on("mouseover", geom_point_mouseover(3.00), false)
.attr("stroke", "#0096DD")
.attr("fill", "#00BFFF")
;
          }(g.append("g")));
        }(g.append("g")));
      }(g.append("g")));
    }(g.append("g")));
    (function (g) {
      d3.select("defs")
  .append("svg:clipPath")
    .attr("id", parent_id + "_clippath4")
    .append("svg:path")
      .attr("d", " M23.82,5 L 147.4 5 147.4 129.76 23.82 129.76 z");g.attr("clip-path", "url(#" + parent_id + "_clippath4)");
      (function (g) {
        g.attr("stroke", "none")
         .attr("class", "guide zoomslider")
         .attr("opacity", 0.00);
        (function (g) {
          g.attr("stroke", "#6A6A6A")
           .attr("stroke-opacity", 0.00)
           .attr("stroke-width", 0.3)
           .attr("fill", "#EAEAEA")
           .on("click", zoomin_behavior(ctx))
.on("dblclick", function() { d3.event.stopPropagation(); })
.on("mouseover", zoomslider_button_mouseover("#cd5c5c"))
.on("mouseout", zoomslider_button_mouseover("#6a6a6a"))
;
          g.append("svg:path")
             .attr("d", "M140.4,8 L 144.4 8 144.4 12 140.4 12 z");
          (function (g) {
            g.attr("fill", "#6A6A6A")
             .attr("class", "button_logo");
            g.append("svg:path")
               .attr("d", "M141.2,9.6 L 142 9.6 142 8.8 142.8 8.8 142.8 9.6 143.6 9.6 143.6 10.4 142.8 10.4 142.8 11.2 142 11.2 142 10.4 141.2 10.4 z");
          }(g.append("g")));
        }(g.append("g")));
        (function (g) {
          g.attr("fill", "#EAEAEA")
           .on("click", zoomslider_track_behavior(ctx, 114.4, 131.4));
          g.append("svg:path")
             .attr("d", "M120.9,8 L 139.9 8 139.9 12 120.9 12 z");
        }(g.append("g")));
        (function (g) {
          g.attr("fill", "#6A6A6A")
           .attr("class", "zoomslider_thumb")
           .call(zoomslider_behavior(ctx, 114.4, 131.4))
.on("mouseover", zoomslider_thumb_mouseover("#cd5c5c"))
.on("mouseout", zoomslider_thumb_mouseover("#6a6a6a"))
;
          g.append("svg:path")
             .attr("d", "M129.4,8 L 131.4 8 131.4 12 129.4 12 z");
        }(g.append("g")));
        (function (g) {
          g.attr("stroke", "#6A6A6A")
           .attr("stroke-opacity", 0.00)
           .attr("stroke-width", 0.3)
           .attr("fill", "#EAEAEA")
           .on("click", zoomout_behavior(ctx))
.on("dblclick", function() { d3.event.stopPropagation(); })
.on("mouseover", zoomslider_button_mouseover("#cd5c5c"))
.on("mouseout", zoomslider_button_mouseover("#6a6a6a"))
;
          g.append("svg:path")
             .attr("d", "M116.4,8 L 120.4 8 120.4 12 116.4 12 z");
          (function (g) {
            g.attr("fill", "#6A6A6A")
             .attr("class", "button_logo");
            g.append("svg:path")
               .attr("d", "M117.2,9.6 L 119.6 9.6 119.6 10.4 117.2 10.4 z");
          }(g.append("g")));
        }(g.append("g")));
      }(g.append("g")));
    }(g.append("g")));
  }(g.append("g")));
}(g.append("g")));
    d3.select(parent_id)
      .selectAll("path")
      .each(function() {
          var sw = parseFloat(window.getComputedStyle(this).getPropertyValue("stroke-width"));
          d3.select(this)
            .attr("vector-effect", "non-scaling-stroke")
            .style("stroke-width", sw + "mm");
      });
}

var data = [
  [28.48018867924528,29.646069182389933,30.811949685534586,31.977830188679242,33.1437106918239,34.30959119496855,35.4754716981132,36.64135220125786,37.80723270440251,38.973113207547165,40.13899371069182,41.30487421383647,42.470754716981126,43.63663522012578,44.80251572327043,45.96839622641508,47.134276729559744,48.30015723270439,49.46603773584905,50.631918238993705,51.797798742138355,52.96367924528301,54.12955974842767,55.295440251572316,56.46132075471697,57.62720125786163,58.79308176100628,59.958962264150934,61.12484276729559,62.29072327044024,63.456603773584895,64.62248427672955,65.7883647798742,66.95424528301885,68.1201257861635,69.28600628930816,70.45188679245283,71.61776729559747,72.78364779874212,73.94952830188679,75.11540880503144,76.2812893081761,77.44716981132075,78.6130503144654,79.77893081761005,80.9448113207547,82.11069182389936,83.27657232704402,84.44245283018867,85.60833333333332,86.77421383647797,87.94009433962263,89.10597484276728,90.27185534591193,91.4377358490566,92.60361635220124,93.76949685534589,94.93537735849056,96.1012578616352,97.26713836477985,98.43301886792452,99.59889937106917,100.76477987421381,101.93066037735846,103.09654088050313,104.26242138364778,105.42830188679243,106.59418238993709,107.76006289308174,108.92594339622639,110.09182389937105,111.2577044025157,112.42358490566035,113.58946540880501,114.75534591194966,115.92122641509431,117.08710691823899,118.25298742138364,119.41886792452829,120.58474842767295,121.7506289308176,122.91650943396225,124.08238993710691,125.24827044025156,126.41415094339621,127.58003144654087,128.74591194968554,129.91179245283018,131.07767295597483,132.24355345911948,133.40943396226413,134.57531446540878,135.74119496855343,136.90707547169808,138.07295597484273,139.2388364779874,140.40471698113205,141.5705974842767,142.73647798742138,143.90235849056603],
  [125.45006386202934,125.17881089212707,121.49818762391054,120.55175595782119,120.3637441579676,119.01378682918117,118.87950753901303,118.06160911588924,116.81116751620584,115.81773016197565,110.53231264968026,109.36793625597124,109.24919766674958,109.17907750298927,109.09219977561568,108.80003145471659,107.2974328586435,107.0588940160058,106.78921628831613,105.837895714573,105.65079593876443,104.28272809152135,103.39564995992014,103.13368806215342,102.97292243855325,102.79644865548887,101.53357052372903,99.40425008614244,98.29663083965622,97.54476420323849,97.03173702783907,95.62443086629746,94.90656432449529,92.73296334565026,92.15779220332227,90.43492572058433,90.05139472187729,89.87090416081092,89.31560155026514,89.14911675644058,88.72299030930645,87.4281498555867,86.81804288989565,84.40221326323693,83.90328265179423,83.10023004369883,76.35368872183273,75.38683866870728,74.32830221202707,71.62182938689078,66.97019063495313,66.57911420135675,64.6499894779701,61.86231570031037,61.413619221210354,61.180217885078555,60.98865869945128,60.69554894426954,58.624726704281265,54.26566633699295,52.5368701823358,52.21582454061223,51.420289863817274,48.97772076260987,48.473091125179835,48.142972785794164,48.09929735115681,47.252302871742806,44.123021068545434,43.03796242407997,39.15104925489667,38.770101696296074,36.411259481673454,35.51147425105697,34.60344674190037,34.440177365235655,32.72650945320539,31.60367377412813,31.55185992519087,29.532369591078364,26.59506857295575,25.69223114120439,23.51046629404375,22.31355476233856,21.820915093313854,21.629910610284732,19.981203112111174,19.112527587213577,18.335374953972355,15.403753329056082,15.359554378485342,15.035935092197251,14.276992410219513,13.17137894922487,12.720221319473545,12.530175600423664,12.435031332406767,12.377678440586857,11.672429437612134,10.758323697266789]];

var draw = function(parent_id) {
    draw_with_data(data, parent_id);
};
