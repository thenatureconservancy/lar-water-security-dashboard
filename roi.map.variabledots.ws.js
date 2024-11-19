// GENERATE MAP ---------------------------
function generateMapVariableDots(width, height, mapExtent, mapScale, dataset){
console.log("Generating map");      
  var w2 = width; //Width and height
  var h2 = height;
  var plotDiv = d3.select("#map");
  var title = d3.select("div#map")
  var svg = d3.select("div#map")
    .append("svg")
    .attr("width", w2)
    .attr("height", h2);

  if (mapExtent === 'us'){
    var backgroundMap = 'data/us-states.json';
    var projection = d3.geo.albersUsa()   //Define map projection
     .translate([w2/2, h2/2])
     .scale([mapScale]);
  } 
  else if (mapExtent === 'sa'){
    var backgroundMap = 'data/countries2.json';    
    var projection = d3.geo.mercator()   //Define map projection
      .center([-80,-15])
      .scale([mapScale])
      .translate([w2/2, h2/2]);
  }

  var tooltip = d3.select(".projectInfo")
    .append("div")      // add the tooltip area to the webpage
    .attr("class", "tooltip")
    .style("opacity", 0);

  var path = d3.geo.path()
    .projection(projection);      //Define path generator
             

  //Load in GeoJSON data
  d3.json(backgroundMap, function(json) {
    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "map-land");

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
      .attr("r", 7)
      .attr("id", function(d) { return d["id"]; })   // experiment
      .attr("class", "defaultDot")
      .on("mouseover", function(d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", 1);
        tooltip.html("<strong>"+d["project_name"]+"</strong><br/><table>" +
            "<tr><td>"+xdimensions[mapcol]+ ":</td><td>"+(d[xdimensions[mapcol]])+"</td></tr>" +
            "</table>"               
            )
          .style("left", (d3.event.pageX + 3) + "px")
          .style("top", (d3.event.pageY - 30) + "px")
      })
      .on("mouseout", function(d){
        tooltip.transition()
          .duration(500)
          .style("opacity", 0.0)
       })
  		selectDots();
  }); // end d3 json


  // get columns of csv
  var mapcol = 0; // default starting column

  var xcolumns = d3.keys(dataset[0]),
    xexcluded = mapExcludedColumns;
    
  var xdimensions = _(xcolumns)   // get dimensions of data
    .difference(xexcluded);

  var xextents = _(xdimensions)   // get extents for each dimension
    .map(function(col) {
      return [0, d3.max(dataset, function(d) { return parseFloat(d[col]) })]
    });

  // change dotsize
  function dotsize(i) {
    var dotScale = d3.scale.linear()
      .domain(xextents[mapcol])
      .range([5, 20]);
    mapcol = i;
    dotScale.domain(xextents[i]);
    svg.selectAll('circle')
      .transition()
      .ease('linear')
      .duration(1000)
      .attr("r", function(d) { 
          return dotScale(d[xdimensions[mapcol]]); 
        })
  };

  function dotsizeReverse(i) {
    var dotScale = d3.scale.linear()
      .domain(xextents[mapcol])
      .range([20, 4]);
    mapcol = i;
    dotScale.domain(xextents[i]);
    svg.selectAll('circle')
      .transition()
      .ease('linear')
      .duration(1000)
      .attr("r", function(d) { 
          return dotScale(d[xdimensions[mapcol]]); 
        })
  };

  function dotsizeCat(i) {
    console.log(xdimensions[i]);
    catDomain = categoryAttributes[(xdimensions[i])]["domain"];
    console.log(catDomain);
    catRange = categoryAttributes[(xdimensions[i])]["range"];
    console.log(catRange);
    var dotScale = d3.scale.ordinal()
      .domain(catDomain)
      .range(catRange);
    mapcol = i;
    svg.selectAll('circle')
      .transition()
      .ease('linear')
      .duration(1000)
      .attr("r", function(d) { 
          return dotScale(d[xdimensions[mapcol]]); 
        })
  }

  // build drop down
  d3.select("#mapdotsize")
    .selectAll("option")
    .data(xdimensions)
    .enter().append("option")
      .attr("value", function(d,i) { return i; })
      .text(function(d) { return d; })
      .each(function(d,i) {
        if (i == mapcol) d3.select(this).attr("selected", "yes");
      });

  d3.select("#mapdotsize")
    .on("change", function() {
      catTest = (mapCategories.indexOf(xdimensions[this.selectedIndex]));
      if (catTest != -1) {
        console.log("Category!");
        dotsizeCat(this.selectedIndex);
      }
      else {
      	reverseDotsTest = (mapReverseDots.indexOf(xdimensions[this.selectedIndex]));
      	if (reverseDotsTest != -1) {
        	console.log("Reverse Dots!");
        	dotsizeReverse(this.selectedIndex);
      	}
      	else {
        dotsize(this.selectedIndex);
      	}
      } 
    });


} // end map



