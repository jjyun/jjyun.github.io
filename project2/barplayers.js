// Define SVG area dimensions
var svgWidth2 = 1600;
var svgHeight2 = 600;

// Define the chart's margins as an object
var chartMargin2 = {
  top: 30,
  right: 30,
  bottom: 30,
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
  var bottomAxis2 = d3.axisBottom(xBandScale2);
  var leftAxis2 = d3.axisLeft(yLinearScale5).ticks(10);

  // Append two SVG group elements to the chartGroup2 area,
  // and create the bottom and left axes inside of them
  chartGroup2.append("g")
    .call(leftAxis2);

  chartGroup2.append("g")
    .attr("transform", `translate(0, ${chartHeight2})`)
    .call(bottomAxis2);

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
