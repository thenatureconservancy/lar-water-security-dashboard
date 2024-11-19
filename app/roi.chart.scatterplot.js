// Generate scatter plot ----------------
function generateScatterPlot(dataset){
	console.log("generating scatter plot");
	var w = 540;
	var h = 400;
	var wPadding = 70;
	var hPadding = 40;
	xcol = 0,						// active x column
	ycol = 0;						// active y column
	dotcol = 0;						// active z column				

	// get columns of csv
	var xcolumns = d3.keys(dataset[0]),
      xexcluded = excludedColumns;
			
	var ycolumns = d3.keys(dataset[1]),
      yexcluded = excludedColumns;
			
	var xdimensions = _(xcolumns)		// get dimensions of data
		.difference(xexcluded);
	var ydimensions = _(ycolumns)		// get dimensions of data
		.difference(yexcluded);

	console.log(ydimensions);

  var xextents = _(xdimensions)		// get extents for each dimension
    .map(function(col) {
      return [0, d3.max(dataset, function(d) { return parseFloat(d[col]) })]
    });
  var yextents = _(ydimensions)		// get extents for each dimension
    .map(function(col) {
      return [0, d3.max(dataset, function(d) { return parseFloat(d[col]) })]
    });

  var xScale = d3.scale.linear()		// create scale functions
				.domain(xextents[xcol])
				.range([wPadding, w - (wPadding * 2)]),
      yScale = d3.scale.linear()
				.domain(yextents[ycol])
				.range([h - hPadding, hPadding]),
      dotScale = d3.scale.linear()
				.domain(xextents[dotcol])
				.range([3, 30]);

	var tooltip = d3.select("body").append("div")		// add tooltip
	    .attr("class", "tooltip")
	    .style("opacity", 0);
		var xAxis = d3.svg.axis() 			//Define X axis
		  .scale(xScale)
		  .orient("bottom")
		  .ticks(5);
		var yAxis = d3.svg.axis() 			//Define Y axis
		  .scale(yScale)
		  .orient("left")
		  .ticks(5);

		var svg = d3.select('#scatterplot')			// create svg element	
			.append("svg")
			.attr("width", w)
			.attr("height", h);

		// // create gray background
			// svg.append("rect")
			// .attr("class", "scatterplotBackground")
			// .attr("x", wPadding)
			// .attr("y", hPadding)
			// .attr("width", w-wPadding*3)
			// .attr("height", h-hPadding*2)
			// .attr("opacity", .5)
			// .attr("fill", "#ecede7");				

		// create circles
	  svg.selectAll('circle')
	    .data(dataset)
	   	.enter()
	   	.append('circle')
	     //.attr("fill", function(d) { return color[d.group]; })
	     .attr("id", function(d) { return d["id"]; }) 
	     .attr("cx", function(d) { 
	     		return xScale(d[xdimensions[xcol]]); 
	     	})
	     .attr("cy", function(d) { 
	     		return yScale(d[ydimensions[ycol]]); 
	     	})
	     .attr("r", 6)
	     	.style("opacity", .9)
				.style("stroke", "#fff")
				.style("stroke-width", 1)

		 	.on("mouseover", function(d) {
				tooltip.transition()
 					.duration(200)
 					.style("opacity", .95);
				tooltip.html("<strong>"+d["project_name"]+"</strong><br/><table>" +
					"<tr><td>"+xdimensions[xcol]+ "</td><td>"+format(d[xdimensions[xcol]])+"</td></tr>" +
					"<tr><td>"+ydimensions[ycol]+ "</td><td>" +format(d[ydimensions[ycol]])+"</td></tr>" +
					// "<tr><td>"+xdimensions[dotcol]+ "</td><td>" +format(d[xdimensions[dotcol]])+"</td></tr>" +
					"</table>"	  					 
					// +"<span class='yAttrTooltip'>"+dimensions[xcol]+ "/"+dimensions[ycol]+": </span>" + (d[dimensions[xcol]]/d[dimensions[ycol]]).toFixed(2) // Calculate ratio
					)
 					.style("left", (d3.event.pageX + 3) + "px")
 					.style("top", (d3.event.pageY - 60) + "px")
					})
			 .on("mouseout", function(d){
			 		tooltip.transition()
	 					.duration(500)
	 					.style("opacity", 0.0)
			 })

		//Create X axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + (h - hPadding) + ")")
			.call(xAxis)
			.append("text")
				.attr("id", "xAxisLabel")				
				.attr("class", "axis label")
				.attr("x", wPadding)
				.attr("y", 36)
				.style("text-anchor", "start")
				.text(xdimensions[xcol]);

		    var xmedian = d3.median(dataset, function(d) { return + d[xdimensions[xcol]] })
  			console.log("median is " + xmedian);
  			var xplotMedian = svg.append('line')                // Add median line
           .attr("class", "xPlotMedian")
           .attr("x1", xScale(xmedian))
           .attr("y1", hPadding)
           .attr("x2", xScale(xmedian))
           .attr("y2", h-(hPadding))
           .attr("stroke-width", 2)
           .attr("stroke-dasharray", ("2, 2"))
           .attr("stroke", "darkgrey"); 
		
		//Create Y axis
		svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + wPadding + ",0)")
			.call(yAxis)
	    .append("text")
				.attr("id", "yAxisLabel")	
	      .attr("class", "axis label")
	      .attr("transform", "rotate(-90)")
	      .attr("x", hPadding -h)
	      .attr("y", -wPadding+10 )
	      .attr("dy", "1em")
	      .style("text-anchor", "start")
				.text(ydimensions[ycol]);

		    var ymedian = d3.median(dataset, function(d) { return + d[ydimensions[ycol]] })
  			console.log("median is " + ymedian);
  			var yplotMedian = svg.append('line')                // Add median line
           .attr("class", "yPlotMedian")
           .attr("x1", wPadding)
           .attr("y1", yScale(ymedian))
           .attr("x2", w-(wPadding*2))
           .attr("y2", yScale(ymedian))
           .attr("stroke-width", 2)
           .attr("stroke-dasharray", ("2, 2"))
           .attr("stroke", "darkgrey"); 

	// change x axis
  function xaxis(i) {
    xcol = i;
    console.log("xCol is "+xdimensions[i]); // name of active column
    xScale.domain(xextents[i]);
		svg.selectAll(".xPlotMedian").remove()
				.transition()
				.ease('linear')
				.duration(5000)
		    var xmedian = d3.median(dataset, function(d) { return + d[xdimensions[xcol]] })
  			console.log("median is " + xmedian);
  			var xplotMedian = svg.append('line')                // Add median line
           .attr("class", "xPlotMedian")
           .attr("x1", xScale(xmedian))
           .attr("y1", hPadding)
           .attr("x2", xScale(xmedian))
           .attr("y2", h-(hPadding))
           .attr("stroke-width", 1)
           .attr("stroke-dasharray", ("4, 2"))
           .attr("stroke", "darkgrey");

    svg.selectAll('circle')
      .transition()
      .ease('linear')
      .duration(1000)    
      .attr("class", function(d){
      	if ((isNaN(d[xdimensions[i]])) || (isNaN(d[ydimensions[ycol]]))){
      		return "ignoreDot"
      	}
      	else {
      		return "defaultDot"
      	}
      	}) 
      .attr("cx", function(d) { return xScale(d[xdimensions[i]]); })
      .attr("cy", function(d) { return yScale(d[ydimensions[ycol]]); })
      //.attr("r", function(d){return d[dimensions["Acres"]]/20000;}); // size dots according to x
    svg.select(".x.axis").remove();
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + (h - hPadding) + ")")
			.call(xAxis)
			.append("text")
				.attr("id", "xAxisLabel")				
				.attr("class", "axis label")
				.attr("x", wPadding)
				.attr("y", 36)
				.style("text-anchor", "start")
				.text(xdimensions[i]);

    // Remove NaN
    // svg.selectAll('circle')
    //   .attr("cy", function(d){ return}
    // };

		
		//Update X axis	      
		svg.select(".x.axis")
	    	.transition()
	    	.duration(1000)
				.call(xAxis);
  };

  // change y axis
  function yaxis(i) {
  	console.log("i is "+i);
    ycol = i;
    console.log("yCol is "+ydimensions[i]); // name of active column
    yScale.domain(yextents[i]);
		svg.selectAll(".yPlotMedian").remove()
				.transition()
				.ease('linear')
				.duration(5000)
		    var ymedian = d3.median(dataset, function(d) { return + d[ydimensions[ycol]] })
  			console.log("median is " + ymedian);
  			var xplotMedian = svg.append('line')                // Add median line
           .attr("class", "yPlotMedian")
           .attr("x1", wPadding)
           .attr("y1", yScale(ymedian))
           .attr("x2", w-(wPadding*2))
           .attr("y2", yScale(ymedian))
           .attr("stroke-width", 1)
           .attr("stroke-dasharray", ("4, 2"))
           .attr("stroke", "darkgrey"); 
    svg.selectAll('circle')
      .transition()
      .ease('linear')
      .duration(1000)
      .attr("class", function(d){
      	// if (isNaN(d[ydimensions[i]])){
        if ((isNaN(d[ydimensions[i]])) || (isNaN(d[xdimensions[xcol]]))){
      		return "ignoreDot"
      	}
      	else {
      		return "defaultDot"
      	}
      	})
      .attr("cx", function(d) { return xScale(d[xdimensions[xcol]]); })
      .attr("cy", function(d) { return yScale(d[ydimensions[i]]); });
    svg.select(".y.axis").remove();	      
			svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(" + wPadding + ",0)")
				.call(yAxis)
		    .append("text")
					.attr("id", "yAxisLabel")	
		      .attr("class", "axis label")
		      .attr("transform", "rotate(-90)")
		      .attr("x", hPadding -h)
		      .attr("y", -wPadding+10 )
		      .attr("dy", "1em")
		      .style("text-anchor", "start")
					.text(ydimensions[i])


			//Update Y axis
			svg.select(".y.axis")
		    	.transition()
		    	.duration(1000)
				.call(yAxis);
  };

  // change dotsize
  function dotsize(i) {
    dotcol = i;
    // console.log("dotsize is "+dimensions[i]); // name of active column
    dotScale.domain(xextents[i]);
    svg.selectAll('circle')
      .transition()
      .ease('linear')
      .duration(1000)
	     .attr("r", function(d) { 
	     		return dotScale(d[xdimensions[dotcol]]); 
	     	})
  };

	// create dropdowns to change axes
  d3.select("#xaxis")
    .selectAll("option")
    .data(xdimensions)
    .enter().append("option")
      .attr("value", function(d,i) { return i; })
      .text(function(d) { return d; })
      .each(function(d,i) {
        if (i == xcol) d3.select(this).attr("selected", "yes");
      });
  d3.select("#yaxis")
    .selectAll("option")
    .data(ydimensions)
    .enter().append("option")
      .attr("value", function(d,i) { return i; })
      .text(function(d) { return d; })
      .each(function(d,i) {
        if (i == ycol) d3.select(this).attr("selected", "yes");
      });
  d3.select("#dotsize")
    .selectAll("option")
    .data(xdimensions)
    .enter().append("option")
      .attr("value", function(d,i) { return i; })
      .text(function(d) { return d; })
      .each(function(d,i) {
        if (i == dotcol) d3.select(this).attr("selected", "yes");
      });

  d3.select("#xaxis")
      .on("change", function() { 
      	xaxis(this.selectedIndex) 
      });
  d3.select("#yaxis")
      .on("change", function() { 
      	yaxis(this.selectedIndex) 
      });
  d3.select("#dotsize")
      .on("change", function() { 
      	dotsize(this.selectedIndex) 
      });




  window.data = dataset;

} // end scatter plot