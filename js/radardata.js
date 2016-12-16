/**
 * Created by jeremyburke on 12/12/16.
 */
    // Set-Up for the Radar chart depicting comparison between consumption patterns vs recommended quantities
var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

// Data: calculated based on USDA and Choose my Plate (US Government recommendations)
var data = [
    [// US Adults
        {axis:"Oils",value:0.1295},
        {axis:"Fruits",value:0.5250},
        {axis:"Dairy",value:0.5467},
        {axis:"Vegetables",value:0.6360},
        {axis:"Grains",value:1.0763},
        {axis:"Protein",value:1.3260},
        {axis:"Solid Fats",value:1.5788},
        {axis:"Added Sugars",value:2.6042}
    ],[// US children
        {axis:"Oils",value:0.1572},
        {axis:"Fruits",value:0.72},
        {axis:"Dairy",value:0.8640},
        {axis:"Vegetables",value:0.7360},
        {axis:"Grains",value:1.29},
        {axis:"Protein",value:1.08},
        {axis:"Solid Fats",value:2.5256},
        {axis:"Added Sugars",value:3.29}
    ],[// Low Income
        {axis:"Oils",value:0.1115},
        {axis:"Fruits",value:0.5050},
        {axis:"Dairy",value:0.5567},
        {axis:"Vegetables",value:0.5040},
        {axis:"Grains",value:1.0547},
        {axis:"Protein",value:1.0580},
        {axis:"Solid Fats",value:1.4843},
        {axis:"Added Sugars",value:2.7644}
    ],[// High Income
        {axis:"Oils",value:0.1308},
        {axis:"Fruits",value:0.54},
        {axis:"Dairy",value:0.61},
        {axis:"Vegetables",value:0.62},
        {axis:"Grains",value:1.09},
        {axis:"Protein",value:1.18},
        {axis:"Solid Fats",value:1.6054},
        {axis:"Added Sugars",value:2.5565}
    ]
];

// We now proceed to draw the Chart

var color = d3.scale.ordinal()
    .range(["#EDC951","#CC333F","#00A0B0","#340470"]);

var radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue: 3.5,
    levels: 7,
    roundStrokes: true,
    color: color
};
//Call function to draw the Radar chart
RadarChart(".radar", data, radarChartOptions);