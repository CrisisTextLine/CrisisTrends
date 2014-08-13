/***************
 ***** TABS ****
 ***************/
var tableauBase = 'http://public.tableausoftware.com/views/publicdata/{{VIZ}}?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableausoftware.com%2F&:tabs=no&:toolbar=no&:animate_transition=yes&:display_static_image=no&:display_spinner=yes&:display_overlay=yes&:display_count=yes&:loadOrderID=0';

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var $tabContent = $(e.target.getAttribute('href'));
    var $frame = $tabContent.find('iframe');
    var url = tableauBase.replace('{{VIZ}}', $tabContent.data('vis'));

    if ($frame.attr('src') !== url) {

        $frame
            .attr('src', url)
            .attr('height', $tabContent.data('height'))
            .attr('scrolling', 'no')
            .attr('width', '960')
            .on('load', function () {

            });
    }
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

var maxWidth = $('#wordcloud').width();
var w = (maxWidth > 960) ? 960 : maxWidth,
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
        if (words[i].c < min) min = words[i].c;
    }

    var maxscale = d3.scale.linear().range([50, 120]).domain([10, 960])(w);
    var sizeScale = d3.scale.linear().range([12, maxscale]).domain([min, max]);

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

function draw(words, bounds) {
    scale = bounds ? Math.min(
        w / Math.abs(bounds[1].x - w / 2),
        w / Math.abs(bounds[0].x - w / 2),
        h / Math.abs(bounds[1].y - h / 2),
        h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

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

    vis.attr('transform', 'translate(' + [w >> 1, h >> 1] + ')scale(' + scale + ')');
}

$('#wordcloud-select').change(function () {
    d3.json('data/words/' + $(this).val() + '.json', function (error, json) {
        if (error) return console.warn(error);
        doViz(json);
    });
});

$('#wordcloud-select').trigger('change');

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




/****************
 ***** INIT *****
 ****************/

if (window.location.search.indexOf('success') >= 0) {
    $('#email-modal').modal('show');
    setTimeout(function () {
       $('#email-modal').modal('hide')
    }, 3000);
}

$('.nav-pills .start').click();