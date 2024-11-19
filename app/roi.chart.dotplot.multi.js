function generateMultiDotPlot(){
	var wrapDiv = d3.select("#roi")		// Create div for parent + children plots; Wrap plot and title in div
		.append("div")
		.attr("id", "myMulti")
		.attr("class", "multiDotPlot");

	generateDotPlot("Species Loss Averted (all taxa)","sp_total", "myMulti", undefined, undefined, "TNC Dollars at Risk (2014$ M)", undefined, 'For each ecoregion, we used the species area curve, existing amount of protected land, and project area to estimate the total number of new species that could persist with additional protection. Species are curves were fit based on known ecoregional diversity.');   	// Within div, create parent plot

	var expandingText = d3.select("#myMulti")    	// Create drop down text
		.append("span")
		.attr("id", "expandText")
		.text("(show more)")
	var childDiv = d3.select("#myMulti")    	// Create div for children
		.append("div")
		.attr("id", "childDiv")
		.attr("class", "childDotPlots")
		.style("display", "none");
	// plot children
	generateDotPlot("Plant Species Loss Averted","plant_total", "childDiv", undefined, undefined, "TNC Dollars at Risk (2014$ M)", undefined, 'For each ecoregion, we used the species area curve, existing amount of protected land, and project area to estimate the total number of new species that could persist with additional protection. Species are curves were fit based on known ecoregional diversity.'); 
	generateDotPlot("Vertebrate Species Loss Averted","vert_total", "childDiv", undefined, undefined, "TNC Dollars at Risk (2014$ M)", undefined, 'For each ecoregion, we used the species area curve, existing amount of protected land, and project area to estimate the total number of new species that could persist with additional protection. Species are curves were fit based on known ecoregional diversity.');
	generateDotPlot("Bird Species Loss Averted","bird_total", "childDiv", undefined, undefined, "TNC Dollars at Risk (2014$ M)", undefined, 'For each ecoregion, we used the species area curve, existing amount of protected land, and project area to estimate the total number of new species that could persist with additional protection. Species are curves were fit based on known ecoregional diversity.');
	generateDotPlot("Mammal Species Loss Averted","mammal_total", "childDiv", undefined, undefined, "TNC Dollars at Risk (2014$ M)", undefined, 'For each ecoregion, we used the species area curve, existing amount of protected land, and project area to estimate the total number of new species that could persist with additional protection. Species are curves were fit based on known ecoregional diversity.');		
	generateDotPlot("Herpetofauna Species Loss Averted","herp_total", "childDiv", undefined, undefined, "TNC Dollars at Risk (2014$ M)", undefined, 'For each ecoregion, we used the species area curve, existing amount of protected land, and project area to estimate the total number of new species that could persist with additional protection. Species are curves were fit based on known ecoregional diversity.');
	d3.select("#expandText")
		.on("click", function(d) {
				var toggleState = d3.select("#childDiv").style("display");
				console.log(toggleState);
				if (toggleState == "none"){
					d3.select("#childDiv")
						.style("display", "block")							
						.transition()
						.duration(1500)
						.style("background-color", "#fff")
					d3.select("span#expandText")
						.text("(show less)")																				
				}							
				else{
					d3.select("#childDiv")
						.style("display", "none")
						.style("background-color", "#ffc")
					d3.select("span#expandText")
						.text("(show more)")	
				}						
		})

	// within child div, create children
} // generateMultiDotPlot