var margin = {top: 40, right: 20, bottom: 50, left: 40},
    width = 500 - margin.left - margin.right,
    height =300 - margin.top - margin.bottom;

var formatPercent = d3.format("%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x2 = d3.scale.ordinal()
    .rangeBands([0, width], 0);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(function(d) { return d + "%"; });

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-15, 0])
    .html(function(d) {
        return " <span style='color:red'>" + d.percent + "</span>";
    })

console.log("hello");

var svg = d3.select("#sankeybar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);


d3.tsv("data/bargraphjeremy.tsv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.food; }));
    y.domain([0, d3.max(data, function(d) { return d.percent; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
            return "rotate(-30)"
        });


    //text for frequency
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "1em")
        .style("text-anchor", "end");
        // .text("Frequency");


    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar1")
        .attr("padding", "20px")
        .style("fill", function(d) {
            if (d.percent > 200) {
                return "red";
            } else if (d.percent > 150 ) {
                return "orange";
            } else if (d.percent > 110 ) {
                return "orange";
            } else if ( d.percent < 65 && d.percent > 15) {
                return "orange";
            } else if (d.percent < 15 ) {
                return "red";
            }
            return "green";
        })
        .attr("x", function(d) { return x(d.food); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.percent); })
        .attr("height", function(d) { return height - y(d.percent); })
        .style("opacity", .7)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    var line = 129;

    svg.append("line")
        .style("stroke", "black")
        .attr("x1", "0")
        .attr("y1", line)
        .attr("x2", width)
        .attr("y2", line);

    svg.select(".x-axis")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-45)"
        });

    svg.select(".y-axis").call(yAxis);

});






function type(d) {
    d.percent = +d.percent;
    return d;
}