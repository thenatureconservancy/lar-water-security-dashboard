var dataset; //Global variable
d3.csv(dataSrc, function(error, data) {
	if (error){
		console.log(error);
	} else {
		console.log(data);

	//this is called in functions to move selected project dots to top
	d3.selection.prototype.moveToFront = function() {
	  return this.each(function(){
	    this.parentNode.appendChild(this);
	  });
	};

		activeDotColor = "#d2322d";		
		dataset = data; //Hand TSV data off to global var so it's available later.
		format = d3.format("0,000"); // format large numbers with commas
		// BUCKS & ACRES
		generateDotPlot("Thousands of Acres","acres", "bucksAcres", undefined, undefined, "default", undefined,  "Total project acres");				
		generateDotPlot("Dollars per Acre","dollarsAcre", "bucksAcres", "yes", undefined, "default", undefined,  "Per acre cost");
		generateDotPlot("Estimated Project Costs (2014$ M)","feeValue", "bucksAcres", undefined, undefined, "default", undefined, "Cost of acquiring land interest in millions of US$");					
		generateDotPlot("TNC Dollars at Risk (2014$ M)","tncBucks", "bucksAcres", "yes", undefined, "default", undefined, "TNC Dollars invested into the project. For historical projects, it is difference between costs (acquisition, loan interest, appraisal, closing costs, stewardship, tax, etc.) minus costs recovered when transferred out");
		// ROI
		generateDotPlot("TNC Ecoregional Portfolio (acres)", "tnc_portfolio", "roi", undefined, undefined, "TNC Dollars at Risk (2014$ M)", undefined, "Overlap with portfolio");
		generateDotPlot("Critical Habitat (acres)", "critical_habitat", "roi", undefined, undefined, "TNC Dollars at Risk (2014$ M)", "Critical Habitat Species", "Overlap with USFWS final and proposed designated critical habitat for Threatened and Endangered species");		  	
		generateMultiDotPlot();
		generateDotPlot("Corridors (acres)", "climate_corridors", "roi", undefined, undefined, "TNC Dollars at Risk (2014$ M)", undefined,  "Using land cover to identify natural areas and barriers to movement, we include core areas of over 1,000 hectares and least-cost path corridors between them as important for species movement and persistence.");																
		generateDotPlot("Interior Protected Habitat (acres)", "new_acres_interior", "roi", undefined, undefined, "TNC Dollars at Risk (2014$ M)", undefined, "Number of new interior protected acres that will be created by the project. Interior areas are defined as being greater than 400 meters from the edge of the boundary between protected and unprotected areas, and include both the project’s interior acres as well as new interior habitat on public lands which was previously edge habitat.");
		generateDotPlot("Carbon Storage (Thousands of Metric Tons CO2)", "co2_total_per_acre", "roi", undefined, undefined, "TNC Dollars at Risk (2014$ M)", undefined,  "Based on carbon in aboveground biomass (Kellndorfer et al. 2012), plus 40% of carbon in top foot of soil in counties with significant ongoing expansion of cropland" );
		generateDotPlot("Water Provision Index", "water_provision", "roi", undefined, undefined, "TNC Dollars at Risk (2014$ M)", undefined,  "We used the US Forest Service’s Forest to Faucets dataset’s drinking water importance index, which scores each watershed based on the number of people served by surface drinking water intakes in that and downstream watersheds.");					
		// CLIMATE
		generateDotPlot("Intactness (%)", "intact_prcnt", "climate", undefined, undefined, "default", undefined,  "Percent of a project that is considered intact, based on data by Theobald."); 				
		generateDotPlot("Climate Velocity (km/yr)", "velocity_reverse", "climate", "yes", undefined, "default", undefined,  "Measures how far from a location a species has had to move under recent climate change to find the same climate (Dobrowski et al. 2012).");
		generateDotPlot("Biome Shift Probability", "biome_shift", "climate", "yes", [1, 5], "default", undefined,  "The probability of climate change causing a biome shift (e.g. forest to grassland) under projected climate change (Gonzalez et al. 2010). ");							
		// THREATS								
		generateDotPlot("Housing Development Risk (%)", "housing_threat", "threats", undefined, undefined, "default", undefined,  "We used Tayyebi et al. (2013) Land Transformation Model projections for urban development by 2100.");				
		generateDotPlot("Cropland Conversion Rate (%/yr)", "ag_conversion", "threats", undefined, undefined, "default", undefined,  "We estimated 1) remaining natural habitat using NLCD, and 2) the amount of cropland expansion between 2008 and 2012 using the Cropland Data Layer. We assumed cropland expansion came at the expense of natural habitat and calculated the annual percent natural habitat lost between 2008 and 2012.");
		generateDotPlot("Wind Development Suitability (%)", "wind_med_high_prcnt", "threats", undefined, undefined, "default", undefined,  "Areas with a wind power class of 3 or greater, using the National Renewable Energy Lab’s 50 meter wind speed data, are potentially suitable for wind development."); 		
		generateDotPlot("Solar Development Suitability (%)", "solar_high_prcnt", "threats", undefined, undefined, "default", undefined,  "Areas that are relatively flat (<3% slope) and sunny (>6.0 Kw/km2/day) are potentially suitable for solar development (National Renewable Energy Lab) ");
		generateDotPlot("Oil & Gas (%)", "oil_gas_prcnt", "mineral", "yes", undefined, "default", undefined,  "Overlap with USGS existing oil and gas fields (USGS 2008) and known unconventional shale and tight gas plays (Ventyx 2013) "); 		
		generateDotPlot("Coal Fields (%)", "coal_prcnt", "mineral", "yes", undefined, "default", undefined,  "Overlap with known coal fields"); 		

		generateMap(450, 300, 'data/us-states.json');
		generateScatterPlot(dataset);
		selectProject("projectDropdown");
		selectProject("projectDropdown2");
		selectDots();
		highlightHistoricalCheckbox();		
		resetSelection();
		changeBiomeLegend();
		d3.selectAll('circle#A_select_kludge').remove();	
		// selectROI();
	}


}); // End all

