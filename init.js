var dataSrc="data/frontiersdashboard2015_07_21.csv";
//var dataSrc="data/AnonPipeline_2014_06_12b.csv";
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


	// Code specific to this project
	function changeWaterStressLegend(div){
	  var ugh = d3.selectAll(div + " svg g.tick text")
	  d3.select(ugh[0][0]).text("Not Stressed").style("text-anchor","start")
	  d3.select(ugh[0][1]).text("")
	  d3.select(ugh[0][2]).text("Stressed").style("text-anchor","start")
	  d3.select(ugh[0][3]).text("")
	  d3.select(ugh[0][4]).text("")
	  d3.select(ugh[0][5]).text("");
	}

	function changePhosYield(div){
	  var ugh = d3.selectAll(div + " svg g.tick text")
	  for (i = 0; i < 46; i++){
		  d3.select(ugh[0][i]).text("");
		  console.log[i];
		d3.select(ugh[0][0]).text("L").style("text-anchor","start")
		d3.select(ugh[0][1]).text("Med").style("text-anchor","start")
		d3.select(ugh[0][10]).text("High").style("text-anchor","start")				
		}
	}

	function changeSedYield(div){
	  var ugh = d3.selectAll(div + " svg g.tick text")
	  for (i = 0; i < 46; i++){
		  d3.select(ugh[0][i]).text("");
		  console.log[i];
		d3.select(ugh[0][0]).text("L").style("text-anchor","start")
		d3.select(ugh[0][1]).text("Med").style("text-anchor","start")
		d3.select(ugh[0][10]).text("High").style("text-anchor","start")						
		}
	}

		// place holder to create divs for different sections

  //   generateDotPlot(dotPlotConfig);
		// //Population & water sources
		// //generateDotPlot(dataCol, plotID, divID, reverseScale, customDomain, scaleModifier, tooltipExtra, varDesc, tooltipExtraLabel, logScale, tooltipExtraOnly)
		generateDotPlot("Population","population2", "population", undefined, [250000,22000000], "default", undefined,"City population");
		generateDotPlot("Groundwater (%)","groundwater", "sourceWater", "no", undefined, "default", undefined,  "Proportion of city supply from groundwater sources.");
		generateDotPlot("Surface Water (%)","surfacewater", "sourceWater", "no", undefined, "default", undefined,  "Proportion of city supply from surface sources.");
		generateDotPlot("Desalination/Other (%)","desalinationOther", "sourceWater", "no", [0, 100], "default", undefined,  "Proportion of city supply from desalination or other sources (e.g., recycled water use, rainwater harvesting).");									

		// // water quantity risk
		//generateDotPlot("Annual Water Stress Index","annualStress", "quantityRisk", "no", [0,1], "default", "Annual Water Stress Category",  "Annual stress is defined as the ratio of water withdrawn to water available. A value above 0.4 is defined as stressed, by convention. Only evaluated for surface sources. A value is not displayed if the city receives >50% from non-surface water sources.", "Category");
		//generateDotPlot("Seasonal Water Stress Index","seasonalStress", "quantityRisk", "no", [0,1], "default", "Seasonal Water Stress Category",  "Seasonal stress is defined as the amount of river flow that is exceeded 90% of the time (and hence river flow is less than this threshold 10% of the time). This Q90 value (expressed as an annual rate, km^3/yr) was divided by the rate of withdrawals (expressed also as an annual rate, km^3/yr) to calculate the low-flow water quantity risk. Values above 0.4 are stressed, by convention. Only evaluated for surface sources. A value is not displayed if the city receives >50% from non-surface water sources.", "Category");

		// // water quality risk
		generateDotPlot("Annual Phosphorous Yield (kg/km^2)","pYield", "qualityRisk", "no", [0.01,640], "default", "Annual Phosphorous Yield Category",  "Urban water sources are displayed based on the annual phosphorous yield in kilograms per square kilometer: low (< 0.019), medium (0.019-0.2275) and high (> 0.2275). Higher levels of phosphorus are associated with greater water treatment costs for cities. Only evaluated for surface water sources.", "Category", true);
		generateDotPlot("Annual Sediment Yield (tons/km^2)","sedYield", "qualityRisk", "no", [13,25500], "default", "Annual Sediment Yield Category",  "Urban water sources are displayed based on the annual sediment yield in metric tons per square kilometer: low (< 25), medium (25-225) and high (> 225). Higher levels of sediment are associated with greater water treatment costs for cities. Only evaluated for surface water sources. ", "Category", true);

		// // quality opportunity
		generateDotPlot("Return on Investment","roi", "roiDiv", undefined, [0.01, 100], "default", "Return on Investment Category","Estimated return on source watershed conservation investment, measured in terms of the ratio of benefits to the water utility (reduction in water treatment costs due to cleaner water) divided by the costs of conservation activities: high (> 1), medium (0.1-1), and low (0.001-0.1). If no value is displayed for a city, there is unlikely scope based upon the city sourcing from >50% groundwater or it was not possible in our analysis to achieve a 10% reduction in phosphorous or sediment loading risk.", "Category","" ,true);
		generateDotPlot("Forest Protection (ha): Phosphorous","forestProtectionPhosp", "qualityOpportunity", "yes", [0.01,75000], "default",  "Forest Protection: Phosphorous Category","This measure represents the amount of forestland that would have to be protected in upstream watersheds to reduce the future phosphorous loading risk by 10%. Lower numbers of hectares are better, since for less work you still get a 10% reduction: high potential (< 1000 ha), medium potential (1,000-10,000 ha) and low potential (> 10,000 ha). If no value is displayed for a city, there is unlikely scope meaning that it was not possible in our analysis to achieve a 10% reduction in phosphorous loading risk through this activity.", "Category", true);
		generateDotPlot("Forest Protection (ha): Sediment","forestProtectionSed", "qualityOpportunity", "yes", [0.01, 42000], "default", "Forest Protection: Sediment Category", "This measure represents the amount of forestland that would have to be protected in upstream watersheds to reduce the future sediment loading risk by 10%. Lower numbers of hectares are better, since for less work you still get a 10% reduction: high potential (< 1000 ha), medium potential (1,000-10,000 ha) and low potential (> 10,000 ha). If no value is displayed for a city, there is unlikely scope meaning that it was not possible in our analysis to achieve a 10% reduction in sediment loading risk through this activity.", "Category", true);
		generateDotPlot("Reforestation (ha): Phosphorous","reforPhosp", "qualityOpportunity", "yes", undefined, "default", "Reforestation: Phosphorous Category", "This measure shows the amount of pasture that would need to be reforested in upstream watersheds to reduce phosphorous loading in water by 10%. Lower numbers of hectares are better, since for less work you still get a 10% reduction: high potential (< 1,000 ha), medium potential (1,000-10,000 ha) and low potential (>10,000 ha). If no value is displayed for a city, there is unlikely scope meaning that it was not possible in our analysis to achieve a 10% reduction in phosphorous loading risk through this activity.", "Category");		
		generateDotPlot("Reforestation (ha): Sediment","reforSed", "qualityOpportunity", "yes", undefined, "default", "Reforestation: Sediment Category", "This measure shows the amount of pasture that would need to be reforested in upstream watersheds to reduce sediment loading in water by 10%. Lower numbers of hectares are better, since for less work you still get a 10% reduction: high potential (< 1,000 ha), medium potential (1,000-10,000 ha) and low potential (>10,000 ha). If no value is displayed for a city, there is unlikely scope meaning that it was not possible in our analysis to achieve a 10% reduction in sediment loading risk through this activity.", "Category");
		generateDotPlot("Riparian Restoration (ha): Phosphorous","ripPhosp", "qualityOpportunity", "yes", undefined, "default", "Riparian Restoration: Phosphorous Category",  "This measure represents the area of stream bank that would need to be restored in upstream watersheds to reduce phosphorous loading by 10%. Lower numbers of hectares are better, since for less work you still get a 10% reduction: high potential (< 1,000 ha), medium potential (1,000-10,000 ha) and low potential (> 10,000 ha). If no value is displayed for a city, there is unlikely scope meaning that it was not possible in our analysis to achieve a 10% reduction in phosphorous loading risk through this activity.", "Category");
		generateDotPlot("Riparian Restoration (ha): Sediment","ripSed", "qualityOpportunity", "yes", undefined, "default", "Riparian Restoration: Sediment Category",  "This measure represents the area of stream bank that would need to be restored in upstream watersheds to reduce sediment loading by 10%. Lower numbers of hectares are better, since for less work you still get a 10% reduction: high potential (< 1,000 ha), medium potential (1,000-10,000 ha) and low potential (> 10,000 ha). If no value is displayed for a city, there is unlikely scope meaning that it was not possible in our analysis to achieve a 10% reduction in sediment loading risk through this activity.", "Category");	

		// // // flood - riverine flood mitigation
		generateDotPlot("Riverine Flood Mitigation City Ranking","riverRank", "riverine-flood", "yes", undefined, "default", "Riverine Flood Mitigation City Ranking Category", "Number of people exposed to riverine flooding.","Category");
		generateDotPlot("Urban Population Exposed to Riverine Flooding","ripPopExposed", "riverine-flood", "no", undefined, "default", undefined, "Ranks cities based upon expected potential for conservation activities to mitigate flood risk to urban residents. Refer to Methods document for description of input data and calculations to generate ranking.", undefined,  "");
		generateDotPlot("Opportunity to Mitigate Riverine Flooding","riverOpp", "riverine-flood", "no", [1.5,4.5], "default", undefined,  "Index score of relative suitability of biophysical conditions for natural infrastructure to mitigate riverine flood risks. Refer to Methods document for description of input data and calculations to generate ranking.");
		
		// // // flood - watershed response Sensitivity
		// Shape (unitless) reverse
		generateDotPlot("Shape (unitless)","shape", "response", "yes", undefined, "default", undefined,"Watershed shape is captured by the Gravelius Index, G (Gravelius 1914), a metric of how circular a watershed is. A value of one represents a perfectly circular watershed. Rounder watersheds can be more sensitive to land cover changes (Bhagwat et al. 2011) and therefore be more responsive to natural infrastructure interventions.  A weighted average was calculated for each city using the proportion of people exposed to flooding in each watershed as weights.", "Category","" ,true);
		generateDotPlot("Slope (degrees)","slope", "response", "yes", undefined, "default", undefined,"The average slope in degrees was computed for each watershed. Watersheds with lower slope are more sensitive to changes in land cover (Bhagwat et al. 2011). Slope was derived from the SRTM Digital Elevation Model and converted to slope with the Jenness DEM Surface Tool (Jenness 2012) to preserve slope calculations over a continental area. A weighted average was calculated for each city using the proportion of people exposed to flooding in each watershed as weights.", "Category","" ,true);
		generateDotPlot("Area (km2)","area", "response", "yes", undefined, "default", undefined,"The area of each watershed was calculated in km2 in a GIS based on the HYDROSHEDS drainage basins (Lehner et al. 2008). Smaller watersheds can be more effective for restoration, as a smaller investment in land area is needed to change a given percentage area in the watershed. For example, often a 10-20% change in land cover in a watershed is required to detect a measureable or significant change in discharge in a storm event (Bathurst et al. 2011a, Bathurst et al. 2011b). A weighted average was calculated for each city using the proportion of people exposed to flooding in each watershed as weights", "Category",true);
		generateDotPlot("Drainage Density (km/km2)","drainage-density", "response", "no", undefined, "default", undefined,"Drainage Density is the total length of all channels in a watershed divided by the basin area. High drainage density is related to a lower “length of overland flow” as defined by Horton (1945). Basins with less overland flow have more water filtrating though the subsurface than rejected in overland flow (Harlin 1984). Thus, basins with a higher drainage density have a higher portion of water that could potentially be infiltrated, especially in protected areas and on soils with high infiltration capacity. Watersheds with higher drainage density are likely to be more sensitive to land use changes in terms of increasing infiltration to reduce flood peaks. A weighted average was calculated for each city using the proportion of people exposed to flooding in each watershed as weights.", "Category","" ,true);
		generateDotPlot("Flood Discharge Sensitivity (unitless)","flood-discharge", "response", "no", undefined, "default", undefined,"Flood discharge sensitivity is a metric to identify watersheds where a marginal change in discharge is likely to lead to the largest change in flood exposure. The flood discharge sensitivity metric shows the relative change in inundated area (percent of total city area) between the highest and second highest flood months of the year, months 12 and 11 (data from Fluet-Chouinard et al. 2014), while the denominator shows the relative change in discharge (percent of MQ) between months 12 and 11 (discharge estimates from Lehner and Grill 2013). An index of 1 means a certain percentage change of discharge leads to the same percentage change in inundated area, a value larger than 1 means that the relative change in discharge leads to a larger change in inundation, and a value smaller than 1 means that a certain relative change in discharge leads to lower change in inundation (e.g., 10% more discharge means 5% more inundation). As natural infrastructure interventions often aim to reduce discharge, watersheds with a higher index are places where the efforts to reduce discharge could most mitigate flooding.", "Category","" ,true);





		// flood - stormwater
		generateDotPlot("Stormwater Flood Mitigation City Ranking","stormRank", "stormwater-flood", "yes", [1,71], "default", undefined, "City ranking score of relative suitability of biophysical conditions for natural infrastructure to mitigate urban stormwater flood risks. Refer to Methods document for description of input data and calculations to generate ranking.");			
		
		generateDotPlot("Relative storm intensity (# annual dry days/(kg/m2)/yr )","storm-intensity", "stormwater-flood-risk", "no", undefined, "default", undefined,"Relative storm intensity is calculated as the average number of dry days divided by the average annual precipitation using precipitation data from The University of East Anglia’s Climate Research Unit (2005). Higher precipitation intensity can lead to overwhelmed drainage systems and localized flooding.", "Category","" ,true);
		generateDotPlot("Soil Permeability (unitless)","soil-permeability", "stormwater-flood-risk", "no", undefined, "default", undefined,"Soil permeability was assessed using FAO soil data and USDA hydrologic soil groups. Each soil group was assigned a value from 1-4 with higher values indicative of lower permeability soils. The percentage of each soil group was used to determine a weighted score for each city. Cities with high soil scores are more suceptible to urban flooding.", "Category","" ,true);
		
		generateDotPlot("Percent Open Space (unitless)","open-space-percent", "green-infrastructure", "no", undefined, "default", undefined,"Impervious area estimates were derived from binary classification via thresholding of multispectral imagery provided by Hansen et al. (2013). Any non-impervious land areas were considered “open space.” Cities with 40-50% open space were considered optimum and scored highest with a value of 4. This optimum represents a mix of imperviousness that causes flooding and open space to easily site natural infrastructure. Cities with higher or lower percentages of open spaces were scored from 0-3 as they departed from this optimum. Because city dots overlap on the integer values, the value for an individual city can be determined by clicking on its location in the map or selecting the city name in the '--Select City--'' dropdown menu on the far right.", "Category","" ,true);
		generateDotPlot("Distribution of Open Space (unitless)","open-space-dist", "green-infrastructure", "no", undefined, "default", undefined,"Dispersion of open space was calculated using nearest neighbor spatial statistics. Evenly distributed open space indicates higher likelihood of mitigating potential stormwater flooding. Cities with more distributed open space across the city score higher.", "Category","" ,true);
		generateDotPlot("City Slope Score (unitless)","city-slope", "green-infrastructure", "no", undefined, "default", undefined,"Average city slope was calculated using 90-m SRTM elevation (Farr et al. 2007). Natural infrastructure for flood mitigation is assumed to be easier to implement on lower, but not flat, slopes. Cities with slopes 2-4% received the highest score of 4, slopes 4-6% a 3, slopes 6-8% a 2, and slopes 8-10% a score of 1. Slopes outside of this range were assigned a 0. Because city dots overlap on the integer values, the value for an individual city can be determined by clicking on its location in the map or selecting the city name in the '--Select City--'' dropdown menu on the far right.", "Category","" ,true);



		// intervention scope
		generateDotPlot("Preserve Infiltration (unitless)","preserve-infiltration", "intervention-scope", "yes", undefined, "default", undefined,"Infiltration potential of a watershed is represented by the estimated 'Curve Number,' which represents the rainfall-to-runoff ratio for a unique land use / land cover  (using GlobCover 2009) and soil type (FAO 2007) based on USDA-NRCS (2004) lookup tables. Low curve numbers indicate higher infiltration capacity. For cities with multiple flood watersheds, a weighted average curve number was calculated for each city using the proportion of people exposed to flooding in each watershed as weights.", "Category","" ,true);
		generateDotPlot("Increase Infiltration (%)","increase-infiltration", "intervention-scope", "no", undefined, "default", undefined,"Estimate of the percent increase in infiltration from restoring non-urban land areas for each watershed. We assume that restoring degraded lands will increase infiltration capacity, with the greatest expected potential on already naturally permeable soils (Ilstedt et al. 2007, Giambelluca 2002, Godsey et al. 2004). Infiltration gain is estimated for each pixel by assuming a new Curve Number (CN) as a 10% reduction of the previous CN on all agricultural and barren land. The percent difference in current versus new CN is an estimate of potential increase in infiltration capacity if restoration activities are applied to all 'recoverable' land in a watershed. A weighted average was calculated for each city using the proportion of people exposed to flooding in each watershed as weights. ", "Category","" ,true);
		generateDotPlot("Preserve Riparian Buffer (%)","riparian-buffer", "intervention-scope", "no", undefined, "default", undefined,"Riparian areas around a stream are important to keep undeveloped to allow natural channel and geomorphic adjustments. Thus, all non-urban land that is spatially connected to a stream is considered a riparian buffer. These areas can be an important barrier between high velocity urban runoff and the stream. A weighted average was calculated for each city using the proportion of people exposed to flooding in each watershed as weights.", "Category","" ,true);
		generateDotPlot("Disconnect Effective Impervious Area (km2)","disconnect-impervious", "intervention-scope", "yes", undefined, "default", undefined,"'Effective' impervious area refers to urban areas spatially connected to perennial streams. Disconnecting this effective impervious area would require reclaiming a 500 m buffer area around the river anywhere that urban land touches a perennial stream. This buffer prevents urban runoff from entering the stream as overland flow, reducing the flow velocity via the rougher friction of vegetation (Shuster et al. 2005). This metric estimates the buffer area (in km2) required to disconnect effective total impervious area for each basin. Thus, lower values represent less effort required to disconnect urban land from the stream. A weighted average was calculated for each city using the proportion of people exposed to flooding in each watershed as weights.", "Category","" ,true);
		generateDotPlot("Preserve Wetland Storage (%)","preserve-wetland", "intervention-scope", "no", undefined, "default", undefined,"Preserving wetland storage was calculated as the percent of wetland area in a watershed according to annual flooded areas from the GIEMS-D15 dataset (Fluet-Chouinard et al. 2015). Wetlands can store large amounts of water and play an important role in flood mitigation (Mitsch and Gosselink 2000). The wetland floodplain area for all natural areas (defined as areas of land cover that are not bare, agricultural, pastoral, or urban in the GlobCover data set) was computed for each watershed. This metric is reported as percentage of “natural” wetland for each watershed area. A weighted average was calculated for each city using the proportion of people exposed to flooding in each watershed as weights.", "Category","" ,true);
		generateDotPlot("Increase Wetland Storage (%)","increase-wetland", "intervention-scope", "no", undefined, "default", undefined,"The increase in wetland storage was calculated as the potential increase in wetland area as a percent of the watershed. This potential “recovered” wetland (areas that could be wetland but are currently bare, agricultural, or pastoral) is added to the area of “existing” wetlands (wetlands currently in “natural” land covers) to estimate the total possible wetland area as a percent of each watershed. The potential percent increase in wetland storage represents the gain if all wetlands are restored. A weighted average was calculated for each city using the proportion of people exposed to flooding in each watershed as weights.", "Category","" ,true);






		// for (var id in dotPlotConfig["roiMetrics"]) {
		// 	if (id.hasOwnProperty(id)) {
		// 		console.log(id + " -> " + id[dotPlotConfig["roiMetrics"]]);
		// 	}
		// }

		generateMapVariableDots(450, 500, 'sa', 250, dataset);
		generateScatterPlot(dataset);

		// UI STUFF ----------------------
		selectProject("projectDropdown");
		selectProject("projectDropdown2");
		selectDots();	
		resetSelection();
		changeWaterStressLegend("div#annualStress");
		changeWaterStressLegend("div#seasonalStress")
		changePhosYield("div#pYield")
		changeSedYield("div#sedYield")		
		highlightCheckbox('highlight_checkbox', 'laccPriority', 'Priority');	
		d3.selectAll('circle#A_select_kludge.defaultDot').remove();	
		// selectROI();
	}


}); // End all

