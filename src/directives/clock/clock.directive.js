(function () {
  'use strict';
  angular
    .module('app')
    .directive('clock', clock);

  function clock($interval) {
    function link(scope, element) {
      function showD3Clock() {
        var w = 320;
        var h = 320;
        var cx = w / 2;
        var cy = h / 2;
        var margin = 30;
        var r = (w / 2) - margin;

        //console.log(element);
        var svg = d3.select(element[0])
          .append('svg').attr('class', 'clock')
          .attr('viewBox', '0 0 ' + w + ' ' + h)
          .append('g');

        //console.log("getTimeOfDay()", getTimeOfDay());
        makeClockFace();
        // On créer la ligne
        svg.selectAll('line.hand')
          .data(getTimeOfDay()).enter()
          .append('line')
          .attr('class', function (d) {
            //console.log("d", 3);
            return d[0] + ' hand';
          }).attr('x1', cx).attr('y1', function (d) {
            return cy + handBackLength(d);
          })
          .attr('x2', cx)
          .attr('y2', function (d) {
            return r - handLength(d);
          })
          .attr('transform', rotationTransform);


        // svg.append('text').text('Montre Rolex').attr('x', 15).attr('y', 20);
        $interval(updateHands, 1000);
        // Fonction heure courante
        function getTimeOfDay() {
          var maintenant = new Date();
          var hr = maintenant.getHours();
          var mn = maintenant.getMinutes();
          var sec = maintenant.getSeconds();
          //console.log(hr, mn, sec);
          return [
            ['heure', hr + (mn / 60) + (sec / 3600)],
            ['minute', mn + (sec / 60)],
            ['seconde', sec]
          ];
        }

        function handLength(d) {
          if (d[0] === 'hour') {
            return Math.round(0.45 * r); // longueur de l'aiguille des heures
          }
          return Math.round(0.65 * r); // longueur de l'aiguille des minutes
        }

        function handBackLength(d) {
          if (d[0] === 'second') {
            return Math.round(0.25 * r);
          }
          return Math.round(0.10 * r);
        }

        function rotationTransform(d) {
          var angle;
          if (d[0] === 'heure') {
            angle = (d[1] % 12) * 30;
          } else {
            angle = d[1] * 6;
          }
          return 'rotate(' + angle + ',' + cx + ',' + cy + ')';
        }

        function updateHands() {
          svg.selectAll('line.hand')
            .data(getTimeOfDay())
            .transition()
            .attr('transform', rotationTransform);
        }

        function makeClockFace() {
          var hourTickLength = Math.round(r * 0.2);
          var minuteTickLength = Math.round(r * 0.075);
          var tickLength;
          var tickClass;
          for (var i = 0; i < 60; ++i) {
            if ((i % 5) == 0) {
              tickLength = hourTickLength;
              tickClass = 'hourtick';
              svg.append('text')
                .attr('class', 'clock-label')
                .attr('x', cx)
                .attr('y', margin - 10)
                .attr('text-anchor', 'middle')
                .attr('transform', 'rotate(' + (i * 6) + ',' + cx + ',' + cy + ')')
                .text(i);
            } else {
              tickLength = minuteTickLength;
              tickClass = 'minutetick';
            }
            svg.append('line')
              .attr('class', tickClass + ' face')
              .attr('x1', cx)
              .attr('y1', margin)
              .attr('x2', cx)
              .attr('y2', margin + tickLength)
              .attr('transform', 'rotate(' + i * 6 + ',' + cx + ',' + cy + ')');

          }
        }

      }

      showD3Clock();
    }
    return {
      restrict: 'EA',
      link: link
    };
  }
})();
