// GENERATE MAP ---------------------------
function generateMap(width, height, backgroundMap, mapScale){
console.log("Generating map");      
  var w2 = width; //Width and height
  var h2 = height;
  var plotDiv = d3.select("#map");
  var title = d3.select("div#map")
  var svg = d3.select("div#map")
    .append("svg")
    .attr("width", w2)
    .attr("height", h2);

  var projection = d3.geo.albersUsa()   //Define map projection
    .translate([w2/2, h2/2])
    .scale([mapScale]);
  var tooltip = d3.select(".projectInfo")
    .append("div")      // add the tooltip area to the webpage
    .attr("class", "tooltip")
    .style("opacity", 0);

  var path = d3.geo.path().projection(projection);      //Define path generator
             
  //Load in GeoJSON data
  d3.json(backgroundMap, function(json) {
    
  //Bind data and create one path per GeoJSON feature
  svg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "#ecede7");

  svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return projection([d["lon"], d["lat"]])[0];
    })
    .attr("cy", function(d) {
      return projection([d["lon"], d["lat"]])[1];
    })
    .attr("r", 6)
    .style("fill", "darkgrey")
    .style("strong", "white")
    .style("opacity", 0.75)
    .attr("id", function(d) { return d["id"]; })   // experiment
    .on("mouseover", function(d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 1);
      tooltip.html(d["project_name"])
        .style("left", (d3.event.pageX + 3) + "px")
        .style("top", (d3.event.pageY - 30) + "px")
    })
    .on("mouseout", function(d){
      tooltip.transition()
        .duration(500)
        .style("opacity", 0.0)
     })
    .on("click", function(d) {
      d3.selectAll("circle")
        .style("fill", "darkgrey") // reset colors to grey
        .style("stroke", "#fff")
        .style("stroke-width", 1)
        .classed("activeDot", false)
      var sel = d3.selectAll("#" + d["id"]);
      sel.moveToFront(sel);
      d3.selectAll("#" + d["id"])
        .transition()
        .duration(500)
        .ease("linear")
        .attr("r", 7)
        .attr("class", "activeDot")
      d3.select("span.projectName")
        .text(d["project_name"]);
    });
  }); // end d3 json
} // end map
