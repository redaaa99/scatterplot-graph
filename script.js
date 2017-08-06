var url =  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";


$.getJSON(url, function( response) {

    var dataset = [];
    var max=0;
    var min=5000;
    for(var i=0;i<response.length;i++)
    {
        dataset.push(new Array(4));
        dataset[i][0] = response[i].Place;
        dataset[i][1] = response[i].Seconds;
        dataset[i][2] = response[i].Name;
        dataset[i][3] = response[i].Doping;
        if(max<response[i].Seconds)
        {
            max = response[i].Seconds;
        }
        if(min>response[i].Seconds)
        {
            min = response[i].Seconds;
        }
    }

    console.log(min);

    var w = 1000;
    var h = 1000;

    var svg = d3.select(".container")
        .append("svg")
        .attr("width", w)
        .attr("height", h);



    var x = d3.scaleLinear()
        .domain([max, min])
        .range([100, w-200]);


    var y = d3.scaleLinear()
        .domain([1, 35])
        .range([0, 400]);

    var xAxis = d3.axis;

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return x(d[1])+5;
        })
        .attr("cy", function(d) {
            return y(d[0])+5;
        })
        .attr("r", 5)
        .attr("fill",function (d) {
            return ((d[3]==="") ? "green":"purple");
        });


    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d[2];
        })
        .attr("transform",function(d){
            return "translate("+ (x(d[1])+15) +","+(y(d[0])+15)+")rotate(30)";
        })
        .attr("font-size","9pt")
        .attr("font-family","monospace");


});

