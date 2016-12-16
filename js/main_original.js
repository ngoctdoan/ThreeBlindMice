
// Will be used to the save the loaded JSON data
var foodAway = [],
    overall = [],
    foodExpenditures = [],
    socioeconomomic = [];

// Date parser to convert strings to date objects
var parseDate = d3.time.format("%Y").parse;

// Set ordinal color scale
var colorScale = d3.scale.category20();

// Variables for the visualization instances
var areachart,
    timeline,
    linechart,
    socioeconomomicchart;


// Start application by loading the data in parrallel
queue()
    .defer(d3.csv, "data/Food-away-from-home.csv") // 1 food away from home data
    .defer(d3.csv, "data/Expenditures-overall.csv") // 2 total food away from home expenditures
    .defer(d3.csv, "data/Food-expenditures.csv") // 3 Break down of income, expenditure on food, % of food away from home and at home
    .defer(d3.csv, "data/Socioeconomic.csv") //4 Break down of socioeconomic
    .await(loadData);

function loadData(error, data1, data2, data3, data4) {

        if(!error){

            foodAway = data1;
            overall = data2;
            foodExpenditures = data3;
            socioeconomomic = data4;

            // Convert years to date objects

            foodAway.forEach(function(d){
                for (var column in d) {
                    if (d.hasOwnProperty(column) && column != "Year") {
                        d[column] = parseFloat(d[column])/1000;
                    } else if(d.hasOwnProperty(column) && column == "Year") {
                        d[column] = parseDate(d[column].toString());
                    }
                }
            });

            overall.forEach( function (d) {
                d.Expenditures = parseFloat(d.Expenditures) / 1000;
                d.Year = parseDate(d.Year.toString());
            })


            foodExpenditures.forEach(function(d){
                for (var column in d) {
                    if (d.hasOwnProperty(column) && column != "Year") {
                        d[column] = parseFloat(d[column]);
                    } else if(d.hasOwnProperty(column) && column == "Year") {
                        d[column] = parseDate(d[column].toString());
                    }
                }
            });

            socioeconomomic.forEach(function(d) {
                d.Low = +d.Low;
                d.Middle = +d.Middle;
                d.High = +d.High;
            });

            colorScale.domain(d3.keys(foodAway[0]).filter(function(d){ return d != "Year"; }));


           // console.log(foodExpenditures);


            createVis();


         };
}



function createVis() {


    areachart = new StackedAreaChart ("stacked-area-chart", foodAway);
    timeline = new Timeline ("timeline", overall);
    linechart = new LineChart ("line-chart", foodExpenditures);
    socioeconomomicchart = new BarChart ("bar-chart", socioeconomomic);


}

function brushed() {
    // Set new domain if brush (user selection) is not empty
    areachart.x.domain(timeline.brush.empty() ? timeline.x.domain() : timeline.brush.extent());
    areachart.y.domain(timeline.brush.empty() ? timeline.y.domain() : timeline.brush.extent());



    // Update focus chart (detailed information)
    areachart.wrangleData();

}

function excerpt(fullText, limit) {
    if(fullText.length > limit) {

        // Trim the string to the maximum length
        var trimmedText = fullText.substr(0, limit);

        // Re-trim if we are in the middle of a word
        trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")))

        return trimmedText + "...";
    } else {
        return fullText;
    }
}


