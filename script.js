d3.csv('DataForTable2.1.csv').then(function(data) {
    data = data.filter(d => +d["Life Ladder"] > 0 && +d["Log GDP per capita"] > 0 && +d["Social support"] > 0 && +d["Healthy life expectancy at birth"] > 0);

    data.forEach(d => {
        d.year = +d.year;
        d["Life Ladder"] = +d["Life Ladder"];
        d["Log GDP per capita"] = +d["Log GDP per capita"];
        d["Social support"] = +d["Social support"];
        d["Healthy life expectancy at birth"] = +d["Healthy life expectancy at birth"];
    });

    function chart(params) {
        d3.select("#visualization").html("");

        const svg = d3.select("#visualization").append("svg")
            .attr("width", "100%")
            .attr("height", 500);

        const xScale = d3.scaleLinear()
            .domain([d3.min(params.data, d => d[params.xMetric]), d3.max(params.data, d => d[params.xMetric])])
            .range([50, 550]);

        const yScale = d3.scaleLinear()
            .domain([d3.min(params.data, d => d[params.yMetric]), d3.max(params.data, d => d[params.yMetric])])
            .range([450, 50]);

        svg.append("g")
            .attr("transform", "translate(0,450)")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("transform", "translate(50,0)")
            .call(d3.axisLeft(yScale));

        svg.append("text")
            .attr("x", 300)
            .attr("y", 490)
            .attr("text-anchor", "middle")
            .text(params.xLabel);

        svg.append("text")
            .attr("x", -250)
            .attr("y", 15)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .text(params.yLabel);

        svg.selectAll("circle")
            .data(params.data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[params.xMetric]))
            .attr("cy", d => yScale(d[params.yMetric]))
            .attr("r", 5)
            .style("fill", "steelblue")
            .on("mouseover", function(event, d) {
                d3.select(this).style("fill", "orange");
            })
            .on("mouseout", function(event, d) {
                d3.select(this).style("fill", "steelblue");
            });

        svg.append("text")
            .attr("x", 300)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .text(params.title)
            .style("font-size", "20px")
            .style("font-weight", "bold");

        d3.select("#message").text(params.message);
    }

    const scene1 = {
        data: data,
        xMetric: "year",
        yMetric: "Life Ladder",
        xLabel: "Year",
        yLabel: "Happiness Score",
        title: "Overall Happiness Scores Over Time",
        message: "This chart shows the overall happiness scores of different countries over time.",
        highlight: []
    };

    const scene2 = {
        data: data,
        xMetric: "Log GDP per capita",
        yMetric: "Life Ladder",
        xLabel: "Log GDP per Capita",
        yLabel: "Happiness Score",
        title: "GDP per Capita vs. Happiness",
        message: "This chart illustrates the relationship between GDP per capita and happiness scores.",
        highlight: []
    };

    const scene3 = {
        data: data,
        xMetric: "Social support",
        yMetric: "Life Ladder",
        xLabel: "Social Support",
        yLabel: "Happiness Score",
        title: "Social Support and Life Expectancy vs. Happiness",
        message: "This chart shows how social support and life expectancy contribute to overall happiness scores.",
        highlight: []
    };

    chart(scene1);

    let currentScene = 1;

    d3.select("#nextButton").on("click", function() {
        if (currentScene === 1) {
            chart(scene2);
            currentScene = 2;
        } else if (currentScene === 2) {
            chart(scene3);
            currentScene = 3;
        } else if (currentScene === 3) {
        }
    });
});
