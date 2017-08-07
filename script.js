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
        dataset[i][4] = {year : response[i].Year, nationality : response[i].Nationality, url: response[i].URL, time : response[i].Time};
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
        .range([48, w-200]);

    var xAxisScale = d3.scaleLinear()
        .domain([max-min, 0])
        .range([48, w-200]);


    var y = d3.scaleLinear()
        .domain([1, 35])
        .range([40, 420]);

    var yAxisScale = d3.scaleLinear()
        .domain([1, 35])
        .range([40, 420]);


    var xAxis = d3.axisBottom()
        .tickFormat(function (d) {
            return "0"+(Math.floor((d)/60)).toString() + " : "  + (((d%60)>10 ? ((d%60).toString()):("0"+(d%60).toString())));
        })
        .scale(xAxisScale);

    var yAxis = d3.axisLeft()
        .scale(yAxisScale)
        .tickValues([1,5,10,15,20,25,30,35]);

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
        .attr("stroke","black")
        .attr("stroke-width","1px")
        .attr("fill",function (d) {
            return ((d[3]==="") ? "green":"purple");
        })
        .on("mouseover", function(d,i) {
            $("#info").css("left", (d3.event.pageX + 5) + "px")
                .css("top", (d3.event.pageY - 50) + "px");
            $("#info ").html(d[2].toString()+": "+d[4].nationality.toString()+
                " <br/> Year :"+d[4].year.toString()+", Time:"+d[4].time+"<br/>"
                +d[3]
            );
            $("#info").show();
            d3.select(this)
                .attr("fill", "white")
                .attr('cursor', 'pointer');
        })
        .on("click", function(d) {
            window.open(d[4].url);
        })
        .on("mouseout", function(d, i) {
            $("#info").hide();
            d3.select(this)
                .attr("fill",function (d) {
                    return ((d[3]==="") ? "green":"purple");
                });
        });


    var xAxisGroup = svg.append("g")
        .attr("class", "xaxis")
        .attr("transform","translate(5,485)")
                        .call(xAxis);

    var yAxisGroup = svg.append("g")
        .attr("class", "yaxis")
        .attr("transform","translate(40,5)")
        .call(yAxis);

    svg.selectAll(".yaxis")  // select all the text elements for the xaxis
        .attr("font-family","monospace")
        .attr("font-size","12pt");


    svg.selectAll(".xaxis")  // select all the text elements for the xaxis
        .attr("font-family","monospace")
        .attr("font-size","10pt");

    svg.selectAll(".text")
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


    svg.append("text")
        .attr("text-anchor", "middle")
        .style("font-weight","bold")
        .style("font-family","monospace")
        .style("font-size","14pt")// this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ 80 +","+90+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .html("Ranking");

    svg.append("text")
        .attr("text-anchor", "middle")
        .style("font-weight","bold")
        .style("font-family","monospace")
        .style("font-size","14pt")// this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ 770 +","+450+")")  // text is drawn off the screen top left, move down and out and rotate
        .html("Timing");

    svg.append("circle")
        .attr("cx", 770)
        .attr("cy", 250)
        .attr("r", 10)
        .attr("stroke","black")
        .attr("stroke-width","1px")
        .attr("fill","purple");

    svg.append("text")
        .attr("text-anchor", "middle")
        .style("font-weight","bold")
        .style("font-family","monospace")
        .style("font-size","11pt")// this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ 860 +","+254+")")  // text is drawn off the screen top left, move down and out and rotate
        .html("Doping allegations");

    svg.append("text")
        .attr("text-anchor", "middle")
        .style("font-weight","bold")
        .style("font-family","monospace")
        .style("font-size","11pt")// this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ 870 +","+204+")")  // text is drawn off the screen top left, move down and out and rotate
        .html("No doping allegations");

    svg.append("circle")
        .attr("cx", 770)
        .attr("cy", 200)
        .attr("r", 10)
        .attr("stroke","black")
        .attr("stroke-width","1px")
        .attr("fill","green");
});

