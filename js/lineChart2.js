LineChart2 = function(_parentElement, _data, _key){
    this.parentElement = _parentElement;
    this.data = _data;
    this.displayData = [];
    this.key = _key;

    //console.log(this.data);

    this.initVis();
}

LineChart2.prototype.initVis = function(){
    var vis = this;

    vis.margin = { top: 40, right: 0, bottom: 60, left: 60 };

    vis.width = 800 - vis.margin.left - vis.margin.right,
        vis.height = 400 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");



    vis.x = d3.scale.ordinal()
        .rangeRoundBands([0, vis.width], .1);

    vis.y = d3.scale.linear()
        .range([vis.height, 0]);

    vis.z = d3.scale.ordinal()
        .range(["#444443", "#3e8405"]);

    vis.xAxis = d3.svg.axis()
        .scale(vis.x)
        .orient("bottom");

    vis.yAxis = d3.svg.axis()
        .scale(vis.y)
        .orient("left");

    vis.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + vis.height + ")");

    vis.svg.append("g")
        .attr("class", "y axis");

    vis.yLabel = vis.svg.append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)") // rotate the text!
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    vis.valueLine = d3.svg.line();

    vis.mouseG = vis.svg.append("g")
        .attr("class", "mouse-over-effects");

    vis.wrangleData(vis.key);

}

LineChart2.prototype.wrangleData = function(_key) {
    var vis = this;

    var key = _key;

    var set1, set2, label;

    if (key == "income") {
        set1 = "Food total";
        set2 = "Income";
        label = "Dollars (in Billions)"
    } else if (key == "percentage") {
        set1 = "Food away from home";
        set2 = "Food at home";
        label = "Percentage";
    } else if (key == "time") {
        set1 = "Male";
        set2 = "Female";
        label = "Time (minutes)";
    };

    var dataCategories = [set1,set2];

    var transposedData = dataCategories.map(function(name) {
        return {
            name: name,
            values: vis.data.map(function(d) {
                return { Year: d.Year, y: d[name] };
            })
        };
    });


    vis.displayData = transposedData;

    console.log(key);
    console.log(transposedData);

    vis.updateVis(label);
}


LineChart2.prototype.updateVis = function(label){

    var vis = this;

    vis.x.domain(vis.displayData.map(function(d) { return d.Year; }));

    vis.y.domain([
        d3.min(vis.displayData, function(c) { return d3.min(c.values, function(d) { return d.y; }); }),
        d3.max(vis.displayData, function(c) { return d3.max(c.values, function(d) { return d.y; }); })
    ]);

    vis.z.domain(vis.displayData.map(function (c) { return c.name; }));

    vis.yLabel.text(label);

    vis.valueLine
        .x(function(d) {return vis.x(d.Year)})
        .y(function(d) {return vis.y(d.y)});


    var money = vis.svg.selectAll(".line")
        .data(vis.displayData);

    money.exit().remove();

    money.enter()
        .append("path")
        .attr("class", "line")
        .style("stroke", function(d) { return vis.z(d.name);});

    money
        .transition().duration(400)
        .attr("d", function (d) {
            return vis.valueLine(d.values);});


    vis.svg.select('.x.axis').transition().duration(800).call(vis.xAxis);

    vis.svg.select(".y.axis").transition().duration(800).call(vis.yAxis);
}