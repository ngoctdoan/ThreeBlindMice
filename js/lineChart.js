LineChart = function(_parentElement, _data, _key){
    this.parentElement = _parentElement;
    this.data = _data;
    this.displayData = [];
    this.key = _key;

    //console.log(this.data);

    this.initVis();
}

LineChart.prototype.initVis = function(){
    var vis = this;

    vis.margin = { top: 40, right: 0, bottom: 60, left: 60 };

    vis.width = 700 - vis.margin.left - vis.margin.right,
        vis.height = 400 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    if (vis.key == "time") {
        vis.x = d3.scale.ordinal()
            .rangeRoundBands([0, vis.width]);
    } else { vis.x = d3.time.scale()
        .range([0, vis.width]); };

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

LineChart.prototype.wrangleData = function(_key) {
    var vis = this;

    var key = _key;

    var set1, set2, label;

    if (key == "income") {
        set1 = "Income";
        set2 = "Food total";
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

    document.getElementById("green").innerHTML= set1;
    document.getElementById("gray").innerHTML= set2;

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


LineChart.prototype.updateVis = function(label){

    var vis = this;

    vis.x.domain(d3.extent(vis.data, function (d) {return d.Year; }));

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



    //tooltip
    // append a g for all the mouse over nonsense


// this is the vertical line
    vis.mouseG.append("path")
        .attr("class", "mouse-line")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", "0");

// keep a reference to all our lines
    var lines = document.getElementsByClassName('line');

// here's a g for each circle and text on the line
    var mousePerLine = vis.mouseG.selectAll('.mouse-per-line')
        .data(vis.displayData)
        .enter()
        .append("g")
        .attr("class", "mouse-per-line");

// the circle
    mousePerLine.append("circle")
        .attr("r", 7)
        .style("stroke", function(d) {
            return vis.z(d.name);
        })
        .style("fill", "none")
        .style("stroke-width", "1px")
        .style("opacity", "0");

// the text
    mousePerLine.append("text")
        .attr("transform", "translate(10,3)");

// rect to capture mouse movements
    vis.mouseG.append('svg:rect')
        .attr('width', vis.width)
        .attr('height', vis.height)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mouseout', function() { // on mouse out hide line, circles and text
            d3.select(".mouse-line")
                .style("opacity", "0");
            d3.selectAll(".mouse-per-line circle")
                .style("opacity", "0");
            d3.selectAll(".mouse-per-line text")
                .style("opacity", "0");
        })
        .on('mouseover', function() { // on mouse in show line, circles and text
            d3.select(".mouse-line")
                .style("opacity", "1");
            d3.selectAll(".mouse-per-line circle")
                .style("opacity", "1");
            d3.selectAll(".mouse-per-line text")
                .style("opacity", "1");
        })
        .on('mousemove', function() { // mouse moving over canvas
            var mouse = d3.mouse(this);

            // move the vertical line
            d3.select(".mouse-line")
                .attr("d", function() {
                    var d = "M" + mouse[0] + "," + vis.height;
                    d += " " + mouse[0] + "," + 0;
                    return d;
                });

            // position the circle and text
            d3.selectAll(".mouse-per-line")
                .attr("transform", function(d, i) {
                    console.log(vis.width/mouse[0])
                    var xDate = vis.x.invert(mouse[0]),
                        bisect = d3.bisector(function(d) { return d.Year; }).right;
                    idx = bisect(d.values, xDate);

                    var beginning = 0,
                        end = lines[i].getTotalLength(),
                        target = null;

                    while (true){
                        target = Math.floor((beginning + end) / 2);
                        pos = lines[i].getPointAtLength(target);
                        if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                            break;
                        }
                        if (pos.x > mouse[0])      end = target;
                        else if (pos.x < mouse[0]) beginning = target;
                        else break; //position found
                    }

                    // update the text with y value
                    d3.select(this).select('text')
                        .text(vis.y.invert(pos.y).toFixed(2));

                    // return position
                    return "translate(" + mouse[0] + "," + pos.y +")";
                });
        });


}