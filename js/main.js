/****************
 ***** INIT *****
 ****************/


/***************
 ***** TABS ****
 ***************/
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    $tabContent = $(e.target.getAttribute('href'));
    $tabContent.find('img')
        .attr('src', $tabContent.data('url'))
        .on('load', function () {
            $(this).css('height', 'auto');
        })
    ;
});

/***************************
 ***** SMOOTH SCROLLING ****
 ***************************/
$('.smooth-scroll').click(function (e) {
    e.preventDefault();

    var $to = $($(this).attr('href'));
    $('html, body').animate({
        scrollTop: $to.offset().top
    });
});

/**********************
 ***** WORD CLOUD *****
 **********************/

var w = 960,
    h = 600;

var svg = d3.select('#wordcloud').append('svg')
    .attr('width', w)
    .attr('height', h);

d3.json('data/suicide.js')

var vis;
function doViz(words) {
    svg.selectAll('g').remove();

    vis = svg
        .append('g')
        .attr('transform', 'translate(' + [w >> 1, h >> 1] + ')');

    var max = 0;
    var min = 1000000;

    for (var i in words) {
        if (words[i].c > max) max = words[i].c;
        console.log('current min: ' + min);
        console.log('current word: ' + words[i].c);
        if (words[i].c < min) min = words[i].c;
    }

    var sizeScale = d3.scale.linear().range([10, 100]).domain([min, max]);

    d3.layout.cloud()
        .size([w, h])
        .words(words)
        .rotate(function() { return 0; })//~~(Math.random() * 3) * 90 - 90; })
        .font('Impact')
        .fontSize(function(d) { return sizeScale(d.c); })
        .text(function(d) { return d.w; })
        //.spiral('rectangular')
        .on('end', draw)
        .start();
}

function randomColor() {
    return 'rgba(0,0,0,' + (Math.floor(Math.random() * 155) + 100) + ')';
}

function draw(words) {
    vis
        .selectAll('text')
        .data(words)
        .enter().append('text')
            .attr('text-anchor', 'middle')
            .style('font-size', function(d) { return d.size + 'px'; })
            .style('font-family', 'Impact')
            .style('fill', function(d, i) { return 'rgba(0,0,0,' + (Math.random()*.50 + .25) + ')'; })
            .attr('text-anchor', 'middle')
            .attr('transform', function(d) {
                return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
            })
            .text(function(d) { return d.w; })
    ;
}

$('#wordcloud-select').change(function () {
    d3.json('data/words/' + $(this).val() + '.json', function (error, json) {
        if (error) return console.warn(error);
        doViz(json);
    });
});

/*************************
 ***** MESSAGE COUNT *****
 *************************/
var incrementer, baseCount;

/**
 * This sexy beast estimates the current number of messages
 * in the system based on historical trends on # of messages
 * per hour based on day of the week.
 */
$.getJSON('data/messages.json', function (data) {
    var timesMatrix = data['averages'];
    var countFrom = new Date(data['from']);
    var now = new Date();

    baseCount = data['baseCount'];

    var daysMatrix = {};
    for (var i in timesMatrix) {
        daysMatrix[i] = 0;
        for (var j in timesMatrix[i]) {
            daysMatrix[i] += timesMatrix[i][j];
        }
    }

    // increment by day first (for speed--incase we forget to publish updates)
    var start = countFrom.getTime();
    var interval = 24 * 60 * 60 * 1000;
    while ((start + interval) < now.getTime()) {
        start += interval;
        var day = new Date(start).getUTCDay() + 1;
        baseCount += daysMatrix[day];
    }
    countFrom = new Date(start);

    // now that we're up to today, increment by hour
    var hours = Math.floor((new Date().getTime() - countFrom.getTime()) / 1000 / 60 / 60);
    var today = now.getUTCDay() + 1;

    for (var i = i; i < now.getUTCHours(); i++) {
        baseCount += timesMatrix[today][i];
    }

    incrementer = timesMatrix[today][now.getUTCHours()] / (60 * 60);

    increment();
    setInterval(increment, 1000);
});

function increment() {
    var d = new Date();
    var seconds = (d.getUTCMinutes() * 60) + d.getUTCSeconds();
    count = Math.round(baseCount + (seconds * incrementer));

    $('#counter').text(count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    return count;
}