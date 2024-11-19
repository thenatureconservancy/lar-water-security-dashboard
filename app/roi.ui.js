function selectDots (){
  console.log("select project function");
  // highlightHistorical;
  var svg = d3.selectAll("#dashboard");
  svg.selectAll("circle")
      .on("click", function(d) {
        d3.selectAll("circle")  
          .classed("activeDot", false);
          var sel = d3.selectAll("#"+ d["id"]) // these 2 lines select highlighted dot and move to top
          .moveToFront(sel)
          .transition()
          .duration(500)
          //.attr("r", 7)
          .ease("linear")
          .filter("*:not(.ignoreDot)")
          .attr("class", "activeDot")  
        d3.select("span.projectName")
          .text(d["project_name"]);
        //highlightHistorical();
        highlightCheckbox('highlight_checkbox', 'laccPriority', 'Priority');  
        d3.selectAll('circle').filter(".projectDropdown").moveToFront();
        d3.selectAll('circle').filter(".projectDropdown2").moveToFront();
        d3.selectAll('circle').filter(".activeDot").moveToFront();     
      });
}


function selectProject(dropdownID){
  console.log("select project from "+dropdownID)
  var nested_data = d3.nest()
    .key(function(d) { return d["id"]}).sortKeys(d3.ascending)
    .key(function(d) { return d["project_name"]}).sortKeys(d3.ascending)        
    .entries(dataset);

  var list = d3.select("select#"+dropdownID)
    // nested_data.unshift("-Select Project-")
    list.selectAll("option")
    .data(nested_data)
    .enter()
    .append("option")
    .attr("value", function(d) {return d.key;})
    .data(dataset)
    .text(function(d) {return d.project_name; });

  function getSelectedText(elementId) {
      var elt = document.getElementById(elementId);
      return elt.options[elt.selectedIndex].text;
  }

  d3.select('select#'+dropdownID)
      .on("change", function() {
        key = this.value;
        console.log('key is: '+key)
        d3.selectAll('circle')
          .classed("activeDot", false)
          .classed(dropdownID, false);
        d3.selectAll("#" + key)
          .classed(dropdownID, true)
          .transition()
          .duration(500)
          //.attr("r", 7)
          .ease("linear")
        d3.select("span.projectName")
          .data(data)
          .text(getSelectedText(dropdownID));
        highlightCheckbox('highlight_checkbox', 'laccPriority', 'Priority');
    d3.selectAll('circle').filter(".projectDropdown").moveToFront();
    d3.selectAll('circle').filter(".projectDropdown2").moveToFront();
    d3.selectAll('circle').filter(".activeDot").moveToFront(); 
      });

  }  // End select project


function resetSelection (){
  console.log("reset selection function")
  d3.selectAll("a#resetSelection")
      .on("click", function(d) {
      d3.selectAll("circle")
        .classed("activeDot", false)
        .classed("projectDropdown", false)
        .classed("projectDropdown2", false)
        .classed("highlightCheckbox", false)
        .classed("hide", false)
        .transition()
        .duration(1000)
        .ease("linear")
        .attr("r", 7)
      d3.select("span.projectName").text("");
      d3.select("select#projectDropdown").property('value','0')
      d3.select("select#projectDropdown2").property('value','0')
      d3.select("select#mapdotsize").property('value','0')             
      d3.selectAll('input').property('checked', false);

      });
} // End resetSelection


function changeBiomeLegend(){
  var ugh = d3.selectAll("div#biome_shift svg g.tick text")
  d3.select(ugh[0][0]).text("Very Low")
  d3.select(ugh[0][1]).text("Low")
  d3.select(ugh[0][2]).text("Medium")
  d3.select(ugh[0][3]).text("High")
  d3.select(ugh[0][4]).text("Very High")      
  console.log(ugh);
}



function highlightCheckbox (checkboxID, csvColumn,trueValue){
  console.log("highlight historical projects function")
  d3.selectAll("#highlight_checkbox").on("change", function() {
    var type = this.value, 
    display = this.checked ? "inline" : "none";
    console.log(display);
    console.log(type);
    if (display == 'inline'){
      var historicalProj = d3.selectAll("circle")
        .filter("*:not(.ignoreDot)")
	      .filter("*:not(.projectDropdown)")
	      .filter("*:not(.projectDropdown2)")              
        .filter(function(d) {return d[csvColumn] === trueValue;})
        // .attr("r", 7)
        .attr("class", "highlightCheckbox");
      historicalProj.moveToFront(historicalProj);
      d3.selectAll('circle').filter(".projectDropdown").attr("r", 7).moveToFront();
      d3.selectAll('circle').filter(".projectDropdown2").attr("r", 7).moveToFront();
      // d3.selectAll('circle').filter(".activeDot").attr("r", 7).moveToFront();  


      d3.selectAll('circle')
      .filter("*:not(.highlightCheckbox)")
      .filter("*:not(.ignoreDot)")      
      .filter("*:not(.projectDropdown)")
      .filter("*:not(.projectDropdown2)")
      .filter("*:not(.activeDot)")         
      // .attr("r", 0)
      // .attr("class","defaultDot")
      .attr("class", "hide");

      // var historicalProj = d3.selectAll("circle")
      // 	.filter("*:not(.ignoreDot)")      
      //   .filter(function(d) {return d[csvColumn] === trueValue;})
      //   .attr("r", 7)
      //   .attr("class", "highlightCheckbox");
      // historicalProj.moveToFront(historicalProj);
      // d3.selectAll('circle').filter(".projectDropdown").attr("r", 7).moveToFront();
      // d3.selectAll('circle').filter(".projectDropdown2").attr("r", 7).moveToFront();
      // // d3.selectAll('circle').filter(".activeDot").attr("r", 7).moveToFront();  
    }
    else{
      d3.selectAll('circle')
        // .attr("r", 7)
      	.filter("*:not(.ignoreDot)")  
        .classed("defaultDot", true)
        .classed("highlightCheckbox", false)
        .classed("hide", false)
        .classed("historical", false);
    }
  });
} // End highlightHistorical