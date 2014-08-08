/****************
 ***** INIT *****
 ****************/
increment();
setInterval(increment, 1000);


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

var fill = d3.scale.category20();

d3.layout.cloud().size([300, 300])
    .words([
        'Hello', 'world', 'normally', 'you', 'want', 'more', 'words',
        'than', 'this'].map(function(d) {
            return {text: d, size: 10 + Math.random() * 90};
        }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 3) * 90 - 90; })
    .font('Impact')
    .fontSize(function(d) { return d.size; })
    .on('end', draw)
    .start();

    function draw(words) {
        d3.select('#wordcloud').append('svg')
            .attr('width', 300)
            .attr('height', 300)
            .append('g')
            .attr('transform', 'translate(150,150)')
            .selectAll('text')
            .data(words)
            .enter().append('text')
            .style('font-size', function(d) { return d.size + 'px'; })
            .style('font-family', 'Impact')
            .style('fill', function(d, i) { return fill(i); })
            .attr('text-anchor', 'middle')
            .attr('transform', function(d) {
                return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
            })
            .text(function(d) { return d.text; });
    }

/*************************
 ***** MESSAGE COUNT *****
 *************************/
var incrementer, baseCount;

/**
 * This sexy beast estimates the current number of messages
 * in the system based on historical trends on # of messages
 * per hour based on day of the week.
 */
$.getJSON('counter/messages.json', function (data) {
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
});

function increment() {
    var d = new Date();
    var seconds = (d.getUTCMinutes() * 60) + d.getUTCSeconds();
    count = Math.round(baseCount + (seconds * incrementer));

    $('#counter').text(count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    return count;
}