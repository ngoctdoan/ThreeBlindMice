IconArray = function(_parentElement, _data){
    this.parentElement = _parentElement;
    this.displayData = _data;

    this.initVis();
}



/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

IconArray.prototype.initVis = function() {
    var vis = this;

    vis.margin = {top: 10, right: 20, bottom: 10, left: 10};

    vis.width = 600 - vis.margin.left - vis.margin.right,
        vis.height = 600 - vis.margin.top - vis.margin.bottom;


    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    vis.rowwidth = 40;
    vis.rowheight = 40;

    vis.x = d3.scale.ordinal()
        .rangeRoundBands([0, vis.width], .5);

    vis.y = d3.scale.ordinal()
        .rangeRoundBands([0, vis.width], .5);

    vis.wrangleData();

}

IconArray.prototype.wrangleData = function () {

    var vis = this;

    vis.updateVis();

}

IconArray.prototype.updateVis = function () {

    var vis = this;

    var row = vis.svg.selectAll('g')
        .data(vis.displayData);


    row
        .enter()
        .append('g');

    row
        .attr('transform', function(d, i) {
            return 'translate(0, ' + (vis.rowheight + 7) * i + ')';
        });

    var people = row.selectAll('.people')
        .data(function (d) {
 //           console.log(d);
            return d;});

    people
        .enter()
        .append('image');

    people
        .attr('xlink:href', function (d) {
        if (d == 1) { return 'img/woman.png'} else {return 'img/man.png'};
    })
        .attr('height', '40')
        .attr('width', '40')
        .attr('x', function(d, i){
            return ((vis.rowwidth + 7) * i);
        })


}
