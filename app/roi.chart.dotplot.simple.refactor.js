function generateDotPlot(dataCol, plotID, divID, reverseScale, customDomain, scaleModifier, tooltipExtra, varDesc, tooltipExtraLabel, logScale, tooltipExtraOnly){
  console.log("Generating dot plot: " + dataCol);
  var w = 320; //svg width
  var h = 40; //svg height
  var hPadding = 25;
  var vPadding = 20;

  var plotDiv = d3.select("#"+divID)    //Wrap plot and title in div
    .append("div")
    .attr("id", plotID)
    .attr("class", "dotPlot");
  var title = d3.select("div#"+plotID)    //Add title of dot plot
    .append("h3")
    .text(dataCol);
  var svg = d3.select("div#"+plotID)    //create svg
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  var minCol = d3.min(dataset, function(d) {return +d[dataCol];});

  if (reverseScale == "yes"){
    if (typeof customDomain != 'undefined'){
      var xScale = d3.scale.linear()    //create scale
      .domain(customDomain)  // Add '+' to convert from string to number
      .range([w - hPadding, hPadding]).nice();
    }
    else {
      var xScale = d3.scale.linear()    //create scale
      .domain([d3.min(dataset, function(d) { return +d[dataCol]; }), d3.max(dataset, function(d) { return +d[dataCol]; })])  // Add '+' to convert from string to number
      .range([w - hPadding, hPadding]).nice();
    }
  }
  else {
    if (typeof customDomain != 'undefined'){
    	if (logScale === true){
     		var xScale = d3.scale.log().clamp(true)   //create scale
     			.domain(customDomain)  // Add '+' to convert from string to number
      		.range([hPadding, w - hPadding]).nice();    		
    	}
    	else{
    		var xScale = d3.scale.linear()    //create scale
     			.domain(customDomain).nice()  // Add '+' to convert from string to number
      		.range([hPadding, w - hPadding]).nice();   
    	}
    }
    else {
      var xScale = d3.scale.linear()    //create scale
      .domain([d3.min(dataset, function(d) { return + (d[dataCol]/d[scaleModifier]); }), d3.max(dataset, function(d) { return +(d[dataCol]/d[scaleModifier]); })])  // Add '+' to convert from string to number
      .range([hPadding, w - hPadding]).nice();
  }
  };

  var xAxis = d3.svg.axis()   //create axis
    .scale(xScale)
    .orient("bottom")
    .ticks(5);
    // .tickValues(d3.max(dataset, function(d) { return +d[dataCol]; }));
  svg.append("g")
    .attr("class", "dotPlotAxis")
    .attr("transform", "translate(0,"+ (h - vPadding) + ")")
    .call(xAxis);


  var tooltip = d3.select("div#"+plotID)
    .append("div")    // add the tooltip area to the webpage
    // .attr("id", plotID)
    .attr("class", "tooltip")
    .style("opacity", 0);


  // variable description tooltips
  var doctip = d3.select("div#"+plotID+ " h3")
    .append("div")      // add the tooltip area to the webpage
    .attr("class", "tooltip")
    .style("opacity", 0);

  d3.select("div#"+plotID+ " h3")
    .on("mouseover", function(d){
      doctip.transition()
        .duration(200)
        .style("opacity", 1);
        doctip.html("<strong>"+dataCol+"</strong><br/>"+ varDesc)
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 35) + "px");
    })
  .on("mouseout", function(d) {
    doctip.transition()
     .duration(500)
     .style("opacity", 0);
  });

  svg.selectAll("circle")    //create dots
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return xScale(d[dataCol]/d[scaleModifier]);
    })
    .attr("cy", 20)
    .attr("r", 6)
    .attr("id", function(d) { return d["id"]; })
    .attr("class", function(d){
    	if (isNaN(d[dataCol])){
    		return "ignoreDot"
    	}
    	else {
    		return "defaultDot"
    	}
    	});

  svg.selectAll("circle")
  	.data(dataset)
  	.enter()
  	.append("circle")
  	.filter(function(d){return d[dataCol] === NaN;}) // remove values < 0
  	.attr("class","ignoreDot");

  svg.selectAll("circle")    //create dots
    .on("mouseover", function(d) {
    tooltip.transition()
     .duration(200)
     .style("opacity", 1);
    var tooltipValue = d3.format(",.2f");
    if (tooltipExtra != null){
      if (tooltipExtraOnly === true){
        tooltip.html("<strong>" + d["project_name"] + "</strong><br/><span class='tooltipValue'>" + tooltipExtraLabel+": " +d[tooltipExtra]+ "</span>")  
         .style("left", (d3.event.pageX + 3) + "px")
         .style("top", (d3.event.pageY - 60) + "px");
      }
      else {
        tooltip.html("<strong>" + d["project_name"] + "</strong><br/><span class='tooltipValue'>" + dataCol + ": " + tooltipValue(d[dataCol]/d[scaleModifier])+"<br/>"+
             tooltipExtraLabel+": " +d[tooltipExtra]+ "</span>")  
         .style("left", (d3.event.pageX + 3) + "px")
         .style("top", (d3.event.pageY - 60) + "px");
       }
    }

    else {
      tooltip.html("<strong>" + d["project_name"] + "</strong><br/><span class='tooltipValue'>" + dataCol + ": " + tooltipValue(d[dataCol]/d[scaleModifier])+"<br/></span>")  
       .style("left", (d3.event.pageX + 3) + "px")
       .style("top", (d3.event.pageY - 60) + "px");
     };
            })
  .on("mouseout", function(d) {
    tooltip.transition()
     .duration(500)
     .style("opacity", 0);
  });
// var plotMedian = d3.median(dataset, function(d) { return +d[dataCol] })
// //var med = d3.median(+d[dataCol]);
// console.log("median is " + plotMedian);
// var plotMedian = svg.append('line')                // Add median line
//          .attr("class", "plotMedian")
//          .attr("x1", xScale(plotMedian))
//          .attr("y1", 5)
//          .attr("x2", xScale(plotMedian))
//          .attr("y2", 25)
//          .attr("stroke-width", 1)
//          .attr("stroke-dasharray", ("4, 2"))
//          .attr("stroke", "black"); 

  function updateROI(dataCol, plotID, scaleModifier, tooltipExtra, varDesc, tooltipExtraLabel){
    var w = 320; //svg width
    var h = 40; //svg height
    var hPadding = 25;
    var vPadding = 20;

    var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return +(d[dataCol]/d[scaleModifier]); })])  // Add '+' to convert from string to number
    .range([hPadding, w - hPadding]);

    var xAxis = d3.svg.axis()       //create axis
      .scale(xScale)
      .orient("bottom")
      .ticks(4);

    var svg = d3.select('#'+plotID)       // update circles
    svg.selectAll('circle')
      .transition()
      .ease('linear')
      .duration(1000)
      .attr("cx", function(d) {
        return xScale((d[dataCol]/d[scaleModifier]))
      })
    svg.selectAll("circle")    //create dots
      .on("mouseover", function(d) {
      tooltip.transition()
       .duration(200)
       .style("opacity", 1);
      var tooltipValue = d3.format(",.1f");
    if (tooltipExtra != null){
    tooltip.html("<strong>" + d["project_name"] + "</strong><br/><span class='tooltipValue'>" + dataCol + ": " + tooltipValue(d[dataCol]/d[scaleModifier])+"<br/>"+
        d[tooltipExtra]+ "</span>")  
     .style("left", (d3.event.pageX + 3) + "px")
     .style("top", (d3.event.pageY - 60) + "px")}
    else {
    tooltip.html("<strong>" + d["project_name"] + "</strong><br/><span class='tooltipValue'>" + dataCol + ": " + tooltipValue(d[dataCol]/d[scaleModifier])+"<br/></span>")  
     .style("left", (d3.event.pageX + 3) + "px")
     .style("top", (d3.event.pageY - 60) + "px")};
          })
      .on("mouseout", function(d) {
      tooltip.transition()
       .duration(500)
       .style("opacity", 0);
      });
    svg.select(".dotPlotAxis")      // update axis
      .transition()
      .ease('linear')
      .duration(500)
      .call(xAxis);
    svg.select("h3")      // update title
      .transition()
      .ease('linear')
      .duration(500)
      .text(dataCol);

  } // end updateROI

  d3.select('select#ROI')
    .on("change", function() {
    key = this.value;
    if (key == "tnc_dollar"){
      d3.select("span#roiType").text("Per TNC $ (M)");
      updateROI("TNC Ecoregional Portfolio (acres)","tnc_portfolio", "TNC Dollars at Risk (2014$ M)");
      updateROI("Critical Habitat (acres)","critical_habitat", "TNC Dollars at Risk (2014$ M)", "Critical Habitat Species", "Species");          
      updateROI("Species Loss Averted (all taxa)","sp_total", "TNC Dollars at Risk (2014$ M)");
      updateROI("Vertebrate Species Loss Averted","vert_total", "TNC Dollars at Risk (2014$ M)");
      updateROI("Plant Species Loss Averted","plant_total", "TNC Dollars at Risk (2014$ M)");
      updateROI("Bird Species Loss Averted","bird_total", "TNC Dollars at Risk (2014$ M)");
      updateROI("Mammal Species Loss Averted","mammal_total", "TNC Dollars at Risk (2014$ M)");
      updateROI("Herpetofauna Species Loss Averted","herp_total", "TNC Dollars at Risk (2014$ M)");                       
      updateROI("Corridors (acres)", "climate_corridors", "TNC Dollars at Risk (2014$ M)");                       
      updateROI("Interior Protected Habitat (acres)", "new_acres_interior", "TNC Dollars at Risk (2014$ M)");
      updateROI("Carbon Storage (Thousands of Metric Tons CO2)", "co2_total_per_acre", "TNC Dollars at Risk (2014$ M)");
      updateROI("Water Provision Index", "water_provision", "TNC Dollars at Risk (2014$ M)");
    }
    else if (key == "project"){
      d3.select("span#roiType").text("Per Project");                
      updateROI("Species Loss Averted (all taxa)","sp_total", "default");
      updateROI("TNC Ecoregional Portfolio (acres)","tnc_portfolio", "default");
      updateROI("Critical Habitat (acres)","critical_habitat", "default", "Critical Habitat Species");          
      updateROI("Vertebrate Species Loss Averted","vert_total", "default");
      updateROI("Plant Species Loss Averted","plant_total", "default");
      updateROI("Bird Species Loss Averted","bird_total", "default");
      updateROI("Mammal Species Loss Averted","mammal_total", "default");
      updateROI("Herpetofauna Species Loss Averted","herp_total", "default");                       
      updateROI("Corridors (acres)", "climate_corridors", "default");                                 
      updateROI("Interior Protected Habitat (acres)", "new_acres_interior", "default");
      updateROI("Carbon Storage (Thousands of Metric Tons CO2)", "co2_total_per_acre", "default");
      updateROI("Water Provision Index", "water_provision", "default");
    }
    else if (key == "acre"){
      d3.select("span#roiType").text("Per Thousand Acres");       
      updateROI("TNC Ecoregional Portfolio (acres)","tnc_portfolio", "Thousands of Acres");
      updateROI("Critical Habitat (acres)","critical_habitat", "Thousands of Acres", "Critical Habitat Species");         
      updateROI("Species Loss Averted (all taxa)","sp_total", "Thousands of Acres");
      updateROI("Vertebrate Species Loss Averted","vert_total", "Thousands of Acres");
      updateROI("Plant Species Loss Averted","plant_total", "Thousands of Acres");
      updateROI("Bird Species Loss Averted","bird_total", "Thousands of Acres");
      updateROI("Mammal Species Loss Averted","mammal_total", "Thousands of Acres");
      updateROI("Herpetofauna Species Loss Averted","herp_total", "Thousands of Acres");                
      updateROI("Corridors (acres)", "climate_corridors", "Thousands of Acres");                                
      updateROI("Interior Protected Habitat (acres)", "new_acres_interior", "Thousands of Acres");
      updateROI("Carbon Storage (Thousands of Metric Tons CO2)", "co2_total_per_acre", "Thousands of Acres");
      updateROI("Water Provision Index", "water_provision", "Thousands of Acres");                
    }
    else if (key == "project_cost"){
      d3.select("span#roiType").text("Per Project Cost (M $)");       
      updateROI("TNC Ecoregional Portfolio (acres)","tnc_portfolio", "Estimated Project Costs (2014$ M)");  
      updateROI("Critical Habitat (acres)","critical_habitat", "Estimated Project Costs (2014$ M)", "Critical Habitat Species");          
      updateROI("Species Loss Averted (all taxa)","sp_total", "Estimated Project Costs (2014$ M)");
      updateROI("Vertebrate Species Loss Averted","vert_total", "Estimated Project Costs (2014$ M)");
      updateROI("Plant Species Loss Averted","plant_total", "Estimated Project Costs (2014$ M)");
      updateROI("Bird Species Loss Averted","bird_total", "Estimated Project Costs (2014$ M)");
      updateROI("Mammal Species Loss Averted","mammal_total", "Estimated Project Costs (2014$ M)");
      updateROI("Herpetofauna Species Loss Averted","herp_total", "Estimated Project Costs (2014$ M)");       
      updateROI("Corridors (acres)", "climate_corridors", "Estimated Project Costs (2014$ M)");                               
      updateROI("Interior Protected Habitat (acres)", "new_acres_interior", "Estimated Project Costs (2014$ M)");
      updateROI("Carbon Storage (Thousands of Metric Tons CO2)", "co2_total_per_acre", "Estimated Project Costs (2014$ M)");
      updateROI("Water Provision Index", "water_provision", "Estimated Project Costs (2014$ M)");                     
    }  
  }); // end on
// } // end select ROI
} // End dotPlot