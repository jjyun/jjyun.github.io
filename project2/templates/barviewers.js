// Define SVG area dimensions
var svgWidth3 = 1600;
var svgHeight3 = 600;

// Define the chart's margins as an object
var chartMargin3 = {
  top: 30,
  right: 30,
  bottom: 30,
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
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale3 = d3.scaleBand()
    .domain(gameData.map(d => d.game))
    .range([0, chartWidth3])
    .padding(0.1);

  // Create a linear scale for the vertical axis.
  var yLinearScale10 = d3.scaleLinear()
    .domain([0, d3.max(gameData, d => d.viewers)]) //d3.max(gameData.map(d => d.viewers));
    .range([chartHeight3, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis3 = d3.axisBottom(xBandScale3);
  var leftAxis3 = d3.axisLeft(yLinearScale10).ticks(10);

  // Append two SVG group elements to the chartGroup3 area,
  // and create the bottom and left axes inside of them
  chartGroup3.append("g")
    .call(leftAxis3);

  chartGroup3.append("g")
    .attr("transform", `translate(0, ${chartHeight3})`)
    .call(bottomAxis3);

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
