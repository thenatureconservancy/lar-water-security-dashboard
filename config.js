var layoutConfig = {"dotplotSections": [
  {
    "name":             "Population",
    "id":               "cityPopulation",
    "column":           "1",
    "order":            "1"
  },
  {
    "name":             "Source Watershed",
    "id":               "sourceWater",
    "column":           "1",
    "order":            "1"
  },  
  {
    "name":             "",
    "id":               "quantityRisk",
    "column":           "1",
    "order":            "1"
  },
  {
    "name":             "",
    "id":               "qualityRisk",
    "column":           "1",
    "order":            "1"
  },
  {
    "name":             "",
    "id":               "qualityOpportunity",
    "column":           "1",
    "order":            "1"
  },
  {
    "name":             "",
    "id":               "flood",
    "column":           "1",
    "order":            "1"
  }      
]
};

var excludedColumns = ["project_name", "id", "laccPriority","lon", "lat", "Annual Water Stress Category", "Seasonal Water Stress Category", "Annual Phosphorous Yield Category", "Annual Sediment Yield Category", "Return on Investment Category", "Forest Protection: Phosphorous Category", "Forest Protection: Sediment Category", "Reforestation: Phosphorous Category", "Reforestation: Sediment Category", "Riparian Restoration: Phosphorous Category", "Riparian Restoration: Sediment Category", "Riverine Flood Mitigation City Ranking Category", "default"];
var mapExcludedColumns = ["project_name", "id", "laccPriority","lon", "lat", "Annual Water Stress Index", "Seasonal Water Stress Index", "Annual Phosphorous Yield (kg/km^2)", "Annual Sediment Yield (tons/km^2)", "Return on Investment", "Forest Protection (ha): Phosphorous", "Forest Protection (ha): Sediment", "Reforestation (ha): Phosphorous", "Reforestation (ha): Sediment", "Riparian Restoration (ha): Phosphorous", "Riparian Restoration (ha): Sediment", "Riverine Flood Mitigation City Ranking", "default"];
var mapCategories = ["Annual Water Stress Category", "Seasonal Water Stress Category", "Annual Phosphorous Yield Category", "Annual Sediment Yield Category", "Return on Investment Category", "Forest Protection: Phosphorous Category", "Forest Protection: Sediment Category", "Reforestation: Phosphorous Category", "Reforestation: Sediment Category", "Riparian Restoration: Phosphorous Category", "Riparian Restoration: Sediment Category", "Riverine Flood Mitigation City Ranking Category"];
var mapReverseDots = ["Riverine Flood Mitigation City Ranking", "Stormwater Flood Mitigation City Ranking"];

var domainStressed = ["Not Applicable", "Not Stressed", "Stressed"];
var domainLowMedHigh = ["Not Applicable", "Low", "Medium", "High"];
var domainROI	= ["Unlikely Scope", "Low", "Medium", "High"];
var domainIS	= ["Unlikely Scope", "Low Potential", "Medium Potential", "High Potential"];
var domainRiverine = ["Low to None", "Low", "Medium", "High", "Very High"];

var rangeStressed = [2, 7, 18];
var rangeLowMedHigh = [2, 6, 11, 18];
var rangeRiverine = [3, 5, 8, 12, 20];
var categoryAttributes = {
    "Annual Water Stress Category": 							{ "domain": domainStressed, "range": rangeStressed },
    "Seasonal Water Stress Category": 						{ "domain": domainStressed, "range": rangeStressed },
    "Annual Phosphorous Yield Category": 					{ "domain": domainLowMedHigh, "range": rangeLowMedHigh },
    "Annual Sediment Yield Category": 						{ "domain": domainLowMedHigh, "range": rangeLowMedHigh },
    "Return on Investment Category": 							{ "domain": domainROI, "range": rangeLowMedHigh },
    "Forest Protection: Phosphorous Category": 		{ "domain": domainIS, "range": rangeLowMedHigh },
    "Forest Protection: Sediment Category": 			{ "domain": domainIS, "range": rangeLowMedHigh },
    "Reforestation: Phosphorous Category": 				{ "domain": domainIS, "range": rangeLowMedHigh },
    "Reforestation: Sediment Category": 					{ "domain": domainIS, "range": rangeLowMedHigh },
    "Riparian Restoration: Phosphorous Category": {  "domain": domainIS, "range": rangeLowMedHigh },
    "Riparian Restoration: Sediment Category": 		{ "domain": domainIS, "range": rangeLowMedHigh },
    "Riverine Flood Mitigation City Ranking Category": { "domain": domainRiverine, "range": rangeRiverine }
  };


var dotPlotConfig = {"roiMetrics": [
  {
    "name":             "Population",
    "ID":               "population",
    "description":       "",
    "category":         "population"
  },
  {
    "name":             "Groundwater (%)",
    "ID":               "groundwater",
    "description":      "Proportion of city supply from groundwater sources.",
    "category":         "sourceWater"
  },
  {
    "name":             "Surface Water (%)",
    "ID":               "surfacewater",
    "description":      "Proportion of city supply from surface sources.",
    "category":         "sourceWater"
  },
  {
    "name":             "Desalination/Other (%)",
    "ID":               "desalinationOther",
    "description":      "Proportion of city supply from desalination or other sources (e.g., recycled water use, rainwater harvesting).",
    "category":         "sourceWater"
  },
  {
    "name":             "Annual Water Stress Index",
    "ID":               "annualStress",
    "notes":            "Values > 0.4 are stressed. Not applicable means city gets >50% from non-surface water sources. Not applicable should be separate category on left side.",
    "description":      "A measurement of the water stress of surface water sources, defined as the ratio of water withdrawn to water available. Higher values indicate that a large proportion of the available water is used for human uses, and indicates a basin with water stress. Values above 0.4 are stressed, by convention. Not applicable means city receives >50% from non-surface water sources.",
    "category":         "quantityRisk"
  },
  {
    "name":             "Seasonal Water Stress Index",
    "ID":               "seasonalStress",
    "notes":            "Values > 0.4 are stressed. Not applicable means city gets >50% from non-surface water sources. Not applicable should be separate category on left side.",

    "description":      "A measurement of low-flow water stress of surface water sources representing the amount of river flow that is exceeded 90% of the time (and hence river flow is less than this threshold 10% of the time). The Q90 value (expressed as an annual rate, km3/yr) was divided by the rate of withdrawals (expressed also as an annual rate, km3/yr) to calculate the low-flow water quantity risk. Values above 0.4 are stressed, by convention. Not applicable means city receives >50% from non-surface water sources.",
    "category":         "quantityRisk"
  },
  {
    "name":             "Annual Phosphorous Yield (kg/km^2)",
    "ID":               "pYield",
    "description":      "The amount of phosphorus in surface waters, based off of estimates of phosphorus yield, Higher levels of phosphorus and other nutrients are associated with greater water treatment costs for cities.",
    "notes":            "Sources are categorized into three categories, based on the phosphorus yield in kg/km2. Low (< 0.019), Medium (0.019-0.2275), High (> 0.2275). Not applicable means that the source is not a surface source.",
    "category":         "qualityRisk"

  },
  {
    "name":             "Annual Sediment Yield (tons/km^2)",
    "ID":               "sedYield",
    "description":      "The amount of sediment in surface waters, based off of estimates of sediment yield, Higher levels of sediment is associated with greater water treatment costs for cities.",
    "notes":            "Sources are categorized into three categories, based on the sediment yield in tonnes/km2. Low (< 25), Medium (25-225), High (> 225). Not applicable means that the source is not a surface source.",
    "category":         "qualityRisk"
  },
  {
    "name":             "Return on Investment",
    "ID":               "roi",
    "description":      "Return on Investment Description",
    "category":         "qualityOpportunity"
  },
  {
    "name":             "Forest Protection: Phosphorous",
    "ID":               "forestProtectionPhosp",
    "description":      "The area of forestland that would have to be protected in upstream watersheds to reduce the future phosphorous risk by 10%. Forest protection involves designating forest as protected from development or other human land-uses. Protected forests prevent sedimentation and phosphorus from getting into cities’ watersheds. Lower numbers are better, since you get the 10% reduction for less work.",
    "category":         "qualityOpportunity"
  },
  {
    "name":             "Forest Protection: Sediment",
    "ID":               "forestProtectionSed",
    "description":      "The area of forestland that would have to be protected in upstream watersheds to reduce the future sedimentation risk by 10%. Forest protection involves designating forest as protected from development or other human land-uses. Protected forests prevent sedimentation and phosphorus from getting into cities’ watersheds. Lower numbers are better, since you get the 10% reduction for less work.",
    "category":         "qualityOpportunity",
    "reverseScale":     true
  },
  {
    "name":             "Reforestation: Phosphorous",
    "ID":               "reforPhosp",
    "description":      "The area of pastureland that would need to be reforested to reduce phosphorous loading by 10%. Reforestation of pastureland back to natural forest cover reduces nutrient transport by preventing the addition of fertilizer and manure that can lead to nutrients getting into runoff. Lower numbers are better, since you get the 10% reduction for less work.",
    "category":         "qualityOpportunity",
    "reverseScale":     true
  },
  {
    "name":             "Reforestation: Sediment",
    "ID":               "reforSed",
    "description":      "The area of pastureland that would need to be reforested to reduce sediment loading by 10%. Reforestation of pastureland back to natural forest cover reduces sediment transport by stabilizing soil. Lower numbers are better, since you get the 10% reduction for less work.",
    "category":         "qualityOpportunity",
    "reverseScale":     true    
  },
  {
    "name":             "Riparian Restoration: Phosphorous",
    "ID":               "ripPhosp",
    "description":      "The area of riparian restoration, also called riparian buffers, that would be needed to reduce phosphorous loading by 10%. Riparian restoration involves the restoration of natural habitat to a small strip on either side of a river or stream. Buffers can play an important role in filtering runoff from agricultural fields, thereby preventing nutrients from reaching the riparian area itself. Lower numbers are better, since you get the 10% reduction for less work.",
    "category":         "qualityOpportunity",
    "reverseScale":     true    
  },
  {
    "name":             "Riparian Restoration: Sediment",
    "ID":               "ripSed",
    "description":      "The area of riparian restoration, also called riparian buffers, that would be needed to reduce sediment loading by 10%. Riparian restoration involves the restoration of natural habitat to a small strip on either side of a river or stream. Buffers can play an important role in filtering runoff from agricultural fields, thereby preventing sediment from reaching the riparian area itself. Lower numbers are better, since you get the 10% reduction for less work.",
    "category":         "qualityOpportunity",
    "reverseScale":     true        
  },
  {
    "name":             "Riverine Flood Mitigation City Ranking",
    "ID":               "riverRank",
    "description":      "",
    "category":         "flood",
    "reverseScale":     true 
  },
    {
    "name":             "Urban Population Exposed to Riverine Flooding",
    "ID":               "ripPopExposed",
    "description":      "",
    "category":         "flood"
  },
    {
    "name":             "Biophysical Opportunity to Mitigate Riverine Flooding",
    "ID":               "riverOpp",
    "description":      "",
    "category":         "flood"
  },
    {
    "name":             "Stormwater Flood Mitigation City Ranking",
    "ID":               "stormRank",
    "description":      "",
    "category":         "flood",
    "reverseScale":     true 
  }                           
]}