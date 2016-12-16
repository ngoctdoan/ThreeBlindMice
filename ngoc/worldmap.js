WorldMap = function(_parentElement, _data, _map){
    this.parentElement = _parentElement;
    this.data = _data;
    this.mapdata = _map;
    this.displayData = [];
    this.key;

    // DEBUG RAW DATA
    //console.log(this.data);

    this.initVis();
}



/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

WorldMap.prototype.initVis = function() {
    var vis = this;

    vis.margin = {top: 40, right: 0, bottom: 60, left: 60};

    vis.width = 600 - vis.margin.left - vis.margin.right,
        vis.height = 600 - vis.margin.top - vis.margin.bottom;


    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    vis.rScale = d3.scale.linear()
        .range([3,20]);

    vis.fillScale = d3.scale.category10(); //change color blue: #1f77b4 orange: #ff7f0e


    vis.wrangleData();
}

/*
 * Data wrangling
 */

WorldMap.prototype.wrangleData = function(){
    var vis = this;

    vis.displayData = vis.data;

    // Update the visualization
    vis.updateVis();
}



/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

WorldMap.prototype.updateVis = function(){
    var vis = this;

    vis.rScale.domain(d3.extent(vis.displayData, function(d) { return d.Time; }));
    vis.fillScale.domain(vis.displayData.map(function (c) { return c.Time; }));

    var tip = d3.tip()
        .attr("class", "d3-tip")
        .html(function(d) {
            return "<span style = 'color:darkgreen'>" + d.Country + "</br></span> " + d.Time + " minutes";
        });

    vis.svg.call(tip);


    var projection = d3.geo.mercator()
    //    var projection = d3.geo.orthographic()
        .translate([vis.width / 2, vis.height / 2])
        .scale(90);
     //   .clipExtent([0, 200], [0, 200]​);

    var path = d3.geo.path()
        .projection(projection);


    // Convert TopoJSON to GeoJSON
    var world = topojson.feature(vis.mapdata, vis.mapdata.objects.countries).features;

    vis.svg.selectAll("path")
        .data(world)
        .enter()
        .append("path")
        .attr("fill", "silver")
        .attr("d", path);

    vis.circles = vis.svg.selectAll("circle")
        .data(vis.displayData);

    vis.circles
        .enter()
        .append("circle")
        .attr("class", "dots");

    vis.circles
        .attr("cx", function (d) { return projection([d.Longitude, d.Latitude])[0];})
        .attr("cy", function (d) { return projection([d.Longitude, d.Latitude])[1];})
        .attr("r", function(d) { return vis.rScale(d.Time); })
        .attr("fill", function(d) {return vis.fillScale(d.Time); });

      vis.circles
          .style("opacity", .8);

    vis.circles
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);


}

