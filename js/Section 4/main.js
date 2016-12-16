// Definition of Margins for the Visualization
var	margin = {top: 30, right: 40, bottom: 30, left: 50},
	width = 800 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// Definition of Axes Scales and length
var	x = d3.time.scale().range([0, width]);
var	y = d3.scale.linear().range([height, 0]);

// Definition of Axes and ticks
var	xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(10);

var	yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(10);

// Countries depicted
var	valueUSA = d3.svg.line()
	.x(function(d) { return x(d.year); })
	.y(function(d) { return y(d.USA); });

var	valueFrance = d3.svg.line()
	.x(function(d) { return x(d.year); })
	.y(function(d) { return y(d.France); });

var	valueItaly = d3.svg.line()
	.x(function(d) { return x(d.year); })
	.y(function(d) { return y(d.Italy); });

var	valueEngland = d3.svg.line()
	.x(function(d) { return x(d.year); })
	.y(function(d) { return y(d.England); });

var	valueCanada = d3.svg.line()
	.x(function(d) { return x(d.year); })
	.y(function(d) { return y(d.Canada); });

var	valueSpain = d3.svg.line()
	.x(function(d) { return x(d.year); })
	.y(function(d) { return y(d.Spain); });

// Creation of the placeholder
var	svg = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// We load the data
d3.csv("data/globalObesityTrends.csv", function(error, data) {
	data.forEach(function(d) {
		d.USA = +d.USA;
		d.France = +d.France;
		d.Italy = +d.Italy;
		d.England = +d.England;
		d.Canada = +d.Canada;
		d.Spain = +d.Spain;
	});

	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.year; }));
	y.domain([0, d3.max(data, function(d) { return Math.max(d.USA, d.France, d.Italy, d.England, d.Canada, d.Spain); })]);

	// We draw the lines with the Obesity values for each country
	svg.append("path")		// Add the valueUSA path.
		.attr("class", "line")
		.attr("d", valueUSA(data));

	svg.append("path")		// Add the valueFrance path.
		.attr("class", "line")
		.style("stroke", "red")
		.attr("d", valueFrance(data));

	svg.append("path")		// Add the valueItaly path.
		.attr("class", "line")
		.style("stroke", "green")
		.attr("d", valueItaly(data));

	svg.append("path")		// Add the valueEngland path.
		.attr("class", "line")
		.style("stroke", "darkblue")
		.attr("d", valueEngland(data));

	svg.append("path")		// Add the valueCanada path.
		.attr("class", "line")
		.style("stroke", "crimson")
		.attr("d", valueCanada(data));

	svg.append("path")		// Add the valueSpain path.
		.attr("class", "line")
		.style("stroke", "orange")
		.attr("d", valueSpain(data));

	svg.append("g")			// Add the X Axis
		.attr("class", "xaxis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "left")
		.attr("dx", "-.8em")
		.attr("dy", ".15em");


	svg.append("g")			// Add the Y Axis
		.attr("class", "yaxis")
		.call(yAxis);

	svg.append("text")
		.attr("transform", "translate(" + (width-85) + "," + y(data[24].France) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", "red")
		.text("France");

	svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[24].USA) + ")")
		.attr("dy", ".35em")
		.attr("stroke-width", .2)
		.attr("text-anchor", "start")
		.style("fill", "steelblue")
		.text("USA");

	svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[24].Italy) + ")")
		.attr("dy", ".35em")
		.attr("stroke-width", .2)
		.attr("text-anchor", "start")
		.style("fill", "green")
		.text("Italy");

	svg.append("text")
		.attr("transform", "translate(" + (width-15) + "," + y(data[24].England) + ")")
		.attr("dy", ".35em")
		.attr("stroke-width", .2)
		.attr("text-anchor", "start")
		.style("fill", "darkblue")
		.text("England");

	svg.append("text")
		.attr("transform", "translate(" + (width-100) + "," + y(data[24].Canada) + ")")
		.attr("dy", ".35em")
		.attr("stroke-width", .2)
		.attr("text-anchor", "start")
		.style("fill", "crimson")
		.text("Canada");

	svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[24].Spain) + ")")
		.attr("dy", ".35em")
		.attr("stroke-width", .2)
		.attr("text-anchor", "start")
		.style("fill", "orange")
		.text("Spain");


	console.log(data.length-1);
	console.log(data[data.length-1].France);
	console.log(data[0].France);
	console.log(y(data[0].France));
	console.log(y(data[0].USA));

});









