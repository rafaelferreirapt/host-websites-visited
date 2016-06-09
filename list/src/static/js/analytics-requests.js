$(document).ready(function(){
    $.getJSON("/api/v1/register/list_months/2016/", function (data) {
        data.forEach(function(entry) {
            var select = "#month"+entry.month;
            $(select).html("<a href=\"#month\" rel=\"" + entry.month + "\"><strong>" + $(select).html()
                + "</strong></a>");
        });

        $("a[href='#month']").click(function () {
            var month = $(this).attr("rel");
            $.getJSON("/api/v1/register/list_days/2016/" + month + "/", function (data) {
                console.log(data);
            });
        });

    });



    /* echarts donut */

    var echartDonut = echarts.init(document.getElementById('echart_donut'), theme);

    echartDonut.setOption({
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    calculable: true,
    legend: {
      x: 'center',
      y: 'bottom',
      data: ['Direct Access', 'E-mail Marketing', 'Union Ad', 'Video Ads', 'Search Engine']
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'center',
              max: 1548
            }
          }
        },
        restore: {
          show: true,
          title: "Restore"
        },
        saveAsImage: {
          show: true,
          title: "Save Image"
        }
      }
    },
    series: [{
      name: 'Access to the resource',
      type: 'pie',
      radius: ['35%', '55%'],
      itemStyle: {
        normal: {
          label: {
            show: true
          },
          labelLine: {
            show: true
          }
        },
        emphasis: {
          label: {
            show: true,
            position: 'center',
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal'
            }
          }
        }
      },
      data: [{
        value: 335,
        name: 'Direct Access'
      }, {
        value: 310,
        name: 'E-mail Marketing'
      }, {
        value: 234,
        name: 'Union Ad'
      }, {
        value: 135,
        name: 'Video Ads'
      }, {
        value: 1548,
        name: 'Search Engine'
      }]
    }]
    });
});
