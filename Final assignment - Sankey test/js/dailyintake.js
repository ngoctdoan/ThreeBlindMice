/**
 * Created by raygr on 25/11/2016.
 */

// Dynamic Sankey Diagram presenting Nutritional Value of food - average daily intake consumed by US population
// Broken down by income level and age


$(document).ready(function() {
    var sankey = new Sankey();

    // We specify hierarchy of stocks and flows
    sankey.stack(0,["Produce Fruits","Produce Vegetables","Dairy","Grains","Proteins","Oils","Solid Fats","Added Sugars"]);
    sankey.stack(1,["Fruits", "Dark Green Vegetables","Red and Orange Vegetables","Potatoes","Tomatoes","Dairy Products","Refined Grains", "Whole Grains","Protein products","Oil products", "Solid fats","Added sugars"]);
    sankey.stack(2,["Home","Restaurant","Fast Food", "Other"]);
    sankey.stack(3,["At home","Away from home"]);

    // We define the relative width conversion of the flows
    sankey.convert_flow_values_callback = function(flow) {
        return flow * 0.3; // Pixels per %
    };

    // Units of Flows
    sankey.convert_flow_labels_callback = function(flow) {
        return (""+Math.round(flow)+" % ");
    };

    // Definition of Units of Stocks
    sankey.convert_box_value_labels_callback = function(flow) {
        return (""+Math.round(flow)+" % ");
    };

    // We set the Colours for each type of food
    sankey.setColors({
        "Produce Fruits":"#31a354",
        "Produce Vegetables":"#a1d99b",
        "Dairy":"#ffbb78",
        "Grains":"#dbdb8d",
        "Proteins":"Khaki",
        "Oils":"rgb(255, 215, 0)",
        "Solid Fats":"rgb(135, 206, 250)",
        "Added Sugars":"gainsboro",

        "Fruits":"#31a354",
        "Dark Green Vegetables":"#a1d99b",
        "Red and Orange Vegetables":"#ff0000",
        "Potatoes":"#fce5cd",
        "Tomatoes":"#ff0000",
        "Dairy Products":"#ffbb78",
        "Refined Grains":"#dbdb8d",
        "Whole Grains":"#dbdb8d",
        "Protein products":"Khaki",
        "Oil products":"rgb(255, 215, 0)",
        "Solid fats":"rgb(135, 206, 250)",
        "Added sugars":"gainsboro",

        "Restaurant":"#5254a3",
        "Fast Food":"#d6616b",
        "Other":" #d62728"

    });

    // We define the physical properties of the Scale of Flows, margins
    sankey.y_space = 15;
    sankey.right_margin = 100;
    sankey.left_margin = 100;

    // Definition of origin - destination flows
    sankey.setData([["Produce Fruits",52.5,"Fruits"],
        ["Produce Vegetables",5.60,"Dark Green Vegetables"],
        ["Produce Vegetables",16.00,"Red and Orange Vegetables"],
        ["Produce Vegetables",14.8,"Potatoes"],
        ["Produce Vegetables",12.4,"Tomatoes"],
        ["Dairy",54.6,"Dairy Products"],
        ["Grains",93.83,"Refined Grains"],
        ["Grains",13.83,"Whole Grains"],
        ["Proteins",122.6,"Protein products"],
        ["Added Sugars",260.42,"Added sugars"],
        ["Oils",12.95,"Oil products"],
        ["Solid Fats",157.88,"Solid fats"],

        // Second level of Flow: from types of food to locations
        ["Fruits",42,"Home"],
        ["Fruits",1,"Restaurant"],
        ["Fruits",1,"Fast Food"],
        ["Fruits",3,"Other"],
        ["Dark Green Vegetables",4,"Home"],
        ["Dark Green Vegetables",0.8,"Restaurant"],
        ["Dark Green Vegetables",0.4,"Fast Food"],
        ["Dark Green Vegetables",0.4,"Other"],
        ["Red and Orange Vegetables",11.2,"Home"],
        ["Red and Orange Vegetables",2,"Restaurant"],
        ["Red and Orange Vegetables",2,"Fast Food"],
        ["Red and Orange Vegetables",1.2,"Other"],
        ["Potatoes",9.6,"Home"],
        ["Potatoes",2,"Restaurant"],
        ["Potatoes",2,"Fast Food"],
        ["Potatoes",1.2,"Other"],
        ["Tomatoes",8.4,"Home"],
        ["Tomatoes",1.6,"Restaurant"],
        ["Tomatoes",1.6,"Fast Food"],
        ["Tomatoes",0.8,"Other"],
        ["Dairy Products",42,"Home"],
        ["Dairy Products",3.67,"Restaurant"],
        ["Dairy Products",6.33,"Fast Food"],
        ["Dairy Products",2.67,"Other"],
        ["Refined Grains",61.93,"Home"],
        ["Refined Grains",9.67,"Restaurant"],
        ["Refined Grains",15.17,"Fast Food"],
        ["Refined Grains",6.83,"Other"],
        ["Whole Grains",12.83,"Home"],
        ["Whole Grains",0.33,"Restaurant"],
        ["Whole Grains",0.17,"Fast Food"],
        ["Whole Grains",0.5,"Other"],
        ["Protein products",83,"Home"],
        ["Protein products",15.4,"Restaurant"],
        ["Protein products",15,"Fast Food"],
        ["Protein products",8.8,"Other"],
        ["Oil products",8.49,"Home"],
        ["Oil products",1.62,"Restaurant"],
        ["Oil products",1.84,"Fast Food"],
        ["Oil products",.96,"Other"],
        ["Solid fats",103.42,"Home"],
        ["Solid fats",16.79,"Restaurant"],
        ["Solid fats",23.50,"Fast Food"],
        ["Solid fats",13.67,"Other"],
        ["Added sugars",195.98,"Home"],
        ["Added sugars",15.03,"Restaurant"],
        ["Added sugars",23.07,"Fast Food"],
        ["Added sugars",25.74,"Other"],


        // Third level of Flow: from locations to at home / away
        ["Home",583,"At home"],
        ["Restaurant",70,"Away from home"],
        ["Other",67,"Away from home"],
        ["Fast Food",92,"Away from home"]]);

    sankey.draw();

});