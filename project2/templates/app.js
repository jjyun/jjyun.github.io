// Chart Params
var svgWidth = 1200;
var svgHeight = 600;

var margin = { top: 20, right: 80, bottom: 60, left: 80 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select(".chartpoint")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
d3.csv("bulk.csv", function(error, gameData) {
  if (error) throw error;

  console.log(gameData);
  console.log([gameData]);

  // Create a function to parse date and time
  var parseTime = d3.timeParse("%d-%b-%Y");

  // Format the data
  gameData.forEach(function(data) {
    data.date = parseTime(data.date);
    data.players = +data.players;
    data.viewers = +data.viewers;
  });

  // Create scaling functions
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(gameData, d => d.date))
    .range([0, width]);

  var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(gameData, d => d.players)])
    .range([height, 0]);

  var yLinearScale2 = d3.scaleLinear()
    .domain([0, d3.max(gameData, d => d.players)])
    .range([height, 0]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xTimeScale)
    .tickFormat(d3.timeFormat("%d-%b-%Y"));
  var leftAxis = d3.axisLeft(yLinearScale1);
  var rightAxis = d3.axisRight(yLinearScale2);

  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y1-axis to the left side of the display
  chartGroup.append("g")
    // Define the color of the axis text
    .classed("green", true)
    .call(leftAxis);

  // Add y2-axis to the right side of the display
  chartGroup.append("g")
    // Define the color of the axis text
    .classed("blue", true)
    .attr("transform", `translate(${width}, 0)`)
    .call(rightAxis);

  // Line generators for each line
  var line1 = d3.line()
    .x(d => xTimeScale(d.date))
    .y(d => yLinearScale1(d.players));

  var line2 = d3.line()
    .x(d => xTimeScale(d.date))
    .y(d => yLinearScale1(d.viewers));

  // Append a path for line1
  chartGroup.append("path")
    .data([gameData])
    .attr("d", line1)
    .classed("line green", true);

  // Append a path for line2
  chartGroup.append("path")
    .data([gameData])
    .attr("d", line2)
    .classed("line blue", true);

  // Append axes titles
  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .classed("dow-text text", true)
    .text("Players");

  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
    .classed("smurf-text text", true)
    .text("Twitch Viewers");
});




//start second illustration





// Define SVG area dimensions
var svgWidth2 = 1200;
var svgHeight2 = 600;

// Define the chart's margins as an object
var chartMargin2 = {
  top: 30,
  right: 30,
  bottom: 100,
  left: 75
};

// Define dimensions of the chart area
var chartWidth2 = svgWidth2 - chartMargin2.left - chartMargin2.right;
var chartHeight2 = svgHeight2 - chartMargin2.top - chartMargin2.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg2 = d3.select(".players")
  .append("svg")
  .attr("height", svgHeight2)
  .attr("width", svgWidth2);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup2 = svg2.append("g")
  .attr("transform", `translate(${chartMargin2.left}, ${chartMargin2.top})`);

// Load data from data2.csv
d3.csv("data2.csv", function(error, gameData) {
  if (error) throw error;

  console.log(gameData);

  // Cast the hours value to a number for each piece of gameData
  gameData.forEach(function(d) {
    d.players = +d.players;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale2 = d3.scaleBand()
    .domain(gameData.map(d => d.game))
    .range([0, chartWidth2])
    .padding(0.1);

  // Create a linear scale for the vertical axis.
  var yLinearScale5 = d3.scaleLinear()
    .domain([0, d3.max(gameData, d => d.players)]) //d3.max(gameData.map(d => d.players));
    .range([chartHeight2, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale2);
  var leftAxis = d3.axisLeft(yLinearScale5).ticks(20);

  // Append two SVG group elements to the chartGroup2 area,
  // and create the bottom and left axes inside of them
  chartGroup2.append("g")
    .call(leftAxis);

  chartGroup2.append("g")
    .attr("transform", `translate(10, ${chartHeight2})`)
    .call(bottomAxis).selectAll("text")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start");;

  // Create one SVG rectangle per piece of gameData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup2.selectAll(".bar")
    .data(gameData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale2(d.game))
    .attr("y", d => yLinearScale5(d.players))
    .attr("width", xBandScale2.bandwidth())
    .attr("height", d => chartHeight2 - yLinearScale5(d.players));

});




//begin the third illustration




// Define SVG area dimensions
var svgWidth3 = 1200;
var svgHeight3 = 600;

// Define the chart's margins as an object
var chartMargin3 = {
  top: 30,
  right: 30,
  bottom: 100,
  left: 75
};

// Define dimensions of the chart area
var chartWidth3 = svgWidth3 - chartMargin3.left - chartMargin3.right;
var chartHeight3 = svgHeight3 - chartMargin3.top - chartMargin3.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg3 = d3.select(".viewers")
  .append("svg")
  .attr("height", svgHeight3)
  .attr("width", svgWidth3);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup3 = svg3.append("g")
  .attr("transform", `translate(${chartMargin3.left}, ${chartMargin3.top})`);

// Load data from data2.csv
d3.csv("data2.csv", function(error, gameData) {
  if (error) throw error;

  console.log(gameData);

  // Cast the hours value to a number for each piece of gameData
  gameData.forEach(function(d) {
    d.viewers = +d.viewers;
    d.players = +d.players;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale3 = d3.scaleBand()
    .domain(gameData.map(d => d.game))
    .range([0, chartWidth3])
    .padding(0.1);

  // Create a linear scale for the vertical axis.
  var yLinearScale10 = d3.scaleLinear()
    .domain([0, d3.max(gameData, d => d.players)]) //d3.max(gameData.map(d => d.viewers));
    .range([chartHeight3, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis3 = d3.axisBottom(xBandScale3);
  var leftAxis3 = d3.axisLeft(yLinearScale10).ticks(20);

  // Append two SVG group elements to the chartGroup3 area,
  // and create the bottom and left axes inside of them
  chartGroup3.append("g")
    .call(leftAxis3);

  chartGroup3.append("g")
    .attr("transform", `translate(10, ${chartHeight3})`)
    .call(bottomAxis3).selectAll("text")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start");

  // Create one SVG rectangle per piece of gameData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup3.selectAll(".bar")
    .data(gameData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale3(d.game))
    .attr("y", d => yLinearScale10(d.viewers))
    .attr("width", xBandScale3.bandwidth())
    .attr("height", d => chartHeight3 - yLinearScale10(d.viewers));

});
