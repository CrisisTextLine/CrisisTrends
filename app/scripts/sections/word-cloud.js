/* global d3 */
/* eslint-env browser */

(function() {
  const wordCloudDiv = document.getElementById('wordcloud');
  const quoteDiv = document.getElementById('wordcloud-quote');
  const CLOUD_HEIGHT = 500;

  var quotes;
  var svg;
  var cloudWidth;
  var cloudHeight = CLOUD_HEIGHT;
  var vis;
  var lastWords;

  window.bootstrapWordCloud = () => {
    getQuotes();
    initializeD3();

    window.addEventListener('resize-complete', setSVGWidth);
  };

  function getQuotes() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        quotes = JSON.parse(xhr.responseText);
      }
    });

    xhr.open('GET', 'data/quotes.json');
    xhr.send();
  }

  function initializeD3() {
    svg = d3.select(wordCloudDiv).append('svg');
    svg.attr('height', cloudHeight);
    setSVGWidth();
    wordCloudDiv.style.display = 'none';
  }

  function setSVGWidth() {
    cloudWidth = wordCloudDiv.offsetWidth;
    svg.attr('width', cloudWidth);
    doViz();
  }

  function doViz(words) {
    if (words === undefined) {
      if (lastWords === undefined) {
        return;
      }

      words = lastWords;
    } else {
      lastWords = words;
    }

    svg.selectAll('g').remove();

    vis = svg
      .append('g')
      .attr('transform', 'translate(' +
        [cloudWidth >> 1, cloudHeight >> 1] +
        ')');

    var max = 0;
    var min = 1000000;

    for (var i in words) {
      if (words[i].c > max) {
        max = words[i].c;
      }

      if (words[i].c < min) {
        min = words[i].c;
      }
    }

    var maxscale = d3.scale.linear().range([50, 120]).domain([10, 960])(cloudWidth);
    var sizeScale = d3.scale.linear().range([12, maxscale]).domain([min, max]);

    d3.layout.cloud()
      .size([cloudWidth, cloudHeight])
      .words(words)
      .rotate(function() {
        return 0;
      })
      .font('Impact')
      .fontSize(function(d) {
        return sizeScale(d.c);
      })
      .text(function(d) {
        return d.w;
      })
      .on('end', draw)
      .start();
  }

  function draw(words, bounds) {
    const scale = bounds ? Math.min(
      cloudWidth / Math.abs(bounds[1].x - cloudWidth / 2),
      cloudWidth / Math.abs(bounds[0].x - cloudWidth / 2),
      cloudHeight / Math.abs(bounds[1].y - cloudHeight / 2),
      cloudHeight / Math.abs(bounds[0].y - cloudHeight / 2)) / 2 : 1;

    vis
      .selectAll('text')
      .data(words)
      .enter().append('text')
        .attr('text-anchor', 'middle')
        .style('font-size', function(d) {
          return d.size + 'px';
        })
        .style('font-family', 'Impact')
        .style('fill', function() {
          return 'rgba(0,0,0,' + (Math.random() * 0.50 + 0.25) + ')';
        })
        .attr('text-anchor', 'middle')
        .attr('transform', function(d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        })
        .text(function(d) {
          return d.w;
        })
    ;

    vis.attr('transform', 'translate(' + [cloudWidth >> 1, cloudHeight >> 1] + ')scale(' + scale + ')');
  }

  document.getElementById('wordcloud-select').addEventListener('change', function() {
    var issue = this.value;

    wordCloudDiv.style.display = 'block';

    d3.json('data/words/' + issue + '.json', function(error, json) {
      if (error) {
        return console.warn(error);
      }

      if (quotes !== undefined) {
        quoteDiv.innerHTML = '<p>' + quotes[issue] + '</p>';
      }

      doViz(json);
    });
  });
})();
