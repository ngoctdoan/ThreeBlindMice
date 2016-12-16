BarChart = function(_parentElement, _data, _key){
    this.parentElement = _parentElement;
    this.data = _data;
    this.displayData = [];
    this.key = _key;

    // DEBUG RAW DATA
    //console.log(this.data);

    this.initVis();
}



/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

BarChart.prototype.initVis = function(){
    var vis = this;

    vis.margin = { top: 40, right: 0, bottom: 60, left: 60 };

    vis.width = 300 - vis.margin.left - vis.margin.right,
        vis.height = 300 - vis.margin.top - vis.margin.bottom;


    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    // Scales and axes
    vis.x = d3.scale.ordinal()
        .rangeRoundBands([0, vis.width], .1);

    vis.y = d3.scale.linear()
        .range([vis.height, 0]);

    if (vis.key == "Female") { vis.y.domain([0,120]); }
    else { vis.y.domain([0,50]);}

    vis.z = d3.scale.category10(); //change color blue: #1f77b4 orange: #ff7f0e

    vis.xAxis = d3.svg.axis()
        .scale(vis.x)
        .orient("bottom");

    vis.yAxis = d3.svg.axis()
        .scale(vis.y)
        .orient("left");

    vis.xAxisGroup = vis.svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + vis.height + ")");

    vis.yAxisGroup = vis.svg.append("g")
        .attr("class", "y-axis axis");

    vis.yAxisTitle = vis.svg.append("text")
        .attr("class", "axis-title")
        .attr("text-anchor", "middle")
        .attr("y", -10)
        .attr("x", 0)
        .text( function (d) {if (vis.key == "Female") { return "Time (minutes)"; }
    else { return "Percentage";}});



    // (Filter, aggregate, modify data)
    vis.wrangleData();
}

/*
 * Data wrangling
 */

BarChart.prototype.wrangleData = function(){
    var vis = this;

    vis.displayData = vis.data;

    // Update the visualization
    vis.updateVis();
}



/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

BarChart.prototype.updateVis = function(){
    var vis = this;

    var tip = d3.tip()
        .attr("class", "d3-tip")
        .html(function(d) {
            if (vis.key == "Female") return d[vis.key];
            else return d[vis.key] + " %";
        });

    vis.svg.call(tip);

    vis.x.domain(vis.displayData.map(function(d) { return d.Year; }));

    var bars = vis.svg.selectAll(".bar")
        .data(vis.displayData, function (d) { return d.Year; });

    bars.enter().append("rect")
        .attr("class", "bar");

    bars
        .style("opacity", 0.4)
        .transition()
        .duration(1000)
        .style("opacity", 1)
        .attr("x", function(d) { return vis.x(d.Year); })
        .attr("y", function(d) { return vis.y(d[vis.key]); })
        .attr("width", vis.x.rangeBand())
        .attr("height", function(d) { return vis.height - vis.y(d[vis.key]); })
        .attr("fill", function (d) {

            if (vis.key == "Low") { return "#5bc108";}
            else if (vis.key == "Middle") { return "#3e8405";}
            else if (vis.key == "High" || vis.key == "Female") {return "#265003";}


        });

    bars
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    bars.exit().remove();


    // Call axis functions with the new domain
    vis.svg.select(".x-axis")
        .call(vis.xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-45)"
        });

    vis.svg.select(".y-axis").call(vis.yAxis);
}


