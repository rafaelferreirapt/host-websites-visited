$(document).ready(function(){
    if($("#modulatedData").length){
        $.getJSON("/api/v1/mod_data/list/", function(result){
            $("#next").unbind();
            $("#previous").unbind();
            $("#modulatedData").empty();
            result.results.forEach(function(entry) {
                var mod = "<tr class=\"even pointer\">" +
                    "<td>" + entry.day + "/" + entry.month + "/" + entry.year + "</td>" +
                    "<td>" + entry.records + "</td>";

                if(entry.observed_data){
                    mod += "<td><span class=\"label label-success\">True</span></td>";
                    mod += "<td class=\"last\"></td>"
                }else{
                    mod += "<td><span class=\"label label-danger\">False</span></td>";
                    mod += "<td class=\"last\"><a class=\"btn btn-success dropdown-toggle btn-xs\" rel=\"getObserved\" href=\"#" + entry.year + "/" + entry.month + "/" + entry.day + "\">Get observed!</a></td></tr>";
                }

                $("#modulatedData").append(mod);
            });


            $('a[rel="getObserved"]').click(function () {
                var date = $(this).attr("href").replace("#", "");

                $(this).removeAttr("rel");
                $(this).removeClass("btn btn-success");
                $(this).addClass("btn btn-info");
                $(this).text("Wait please...");

                $.ajax({
                    url: "/api/v1/observed_data/save/"+date+"/",
                    dataType: 'json',
                    success: function(data) {
                        location.reload();
                    },
                    error: function( data ) {
                        $("#response").html("<div class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\">" +
                            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span>" +
                            "</button><strong>Ups!</strong> Something went wrong! Output: " + data.message + "</div>");
                    }
                });
                return false;
            });

            if (result.next != null || result.previous != null){
                $("#pages").removeClass("hidden");
                if(result.next != null){
                    $("#next").removeAttr("disabled");
                    $("#next").click(function() {loadPage(result.next.replace("http://es.rafaelferreira.pt:8000", ""));});
                }else{
                    $("#next").prop('disabled', true);
                }
                if(result.previous != null){
                    $("#previous").removeAttr("disabled");

                    $("#previous").click(function() {loadPage(result.previous.replace("http://es.rafaelferreira.pt:8000", ""));});

                }else{
                    $("#previous").attr("disabled", "disabled");
                }
            }else{
                $("#pages").addClass("hidden");
            }        });

    }

    function loadPage(link){
        $.getJSON(link, function(result){
            $("#next").unbind();
            $("#previous").unbind();
            $("#modulatedData").empty();

            result.results.forEach(function(entry) {
                var mod = "<tr class=\"even pointer\">" +
                    "<td>" + entry.day + "/" + entry.month + "/" + entry.year + "</td>" +
                    "<td>" + entry.records + "</td>";

                if(entry.observed_data){
                    mod += "<td><span class=\"label label-success\">True</span></td>";
                    mod += "<td class=\"last\"></td>"
                }else{
                    mod += "<td><span class=\"label label-danger\">False</span></td>";
                    mod += "<td class=\"last\"><a class=\"btn btn-success dropdown-toggle btn-xs\" rel=\"getObserved\" href=\"#" + entry.year + "/" + entry.month + "/" + entry.day + "\">Get observed!</a></td></tr>";
                }

                $("#modulatedData").append(mod);
            });


            $('a[rel="getObserved"]').click(function () {
                var date = $(this).attr("href").replace("#", "");

                $(this).removeAttr("rel");
                $(this).removeClass("btn btn-success");
                $(this).addClass("btn btn-info");
                $(this).text("Wait please...");

                $.ajax({
                    url: "/api/v1/observed_data/save/"+date+"/",
                    dataType: 'json',
                    success: function(data) {
                        location.reload();
                    },
                    error: function( data ) {
                        $("#response").html("<div class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\">" +
                            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span>" +
                            "</button><strong>Ups!</strong> Something went wrong! Output: " + data.message + "</div>");
                    }
                });
                return false;
            });

            if (result.next != null || result.previous != null){
                $("#pages").removeClass("hidden");
                if(result.next != null){
                    $("#next").removeAttr("disabled");

                    $("#next").click(function() {loadPage(result.next.replace("http://es.rafaelferreira.pt:8000", ""));});

                }else{
                    $("#next").prop('disabled', true);
                }
                if(result.previous != null){
                    $("#previous").removeAttr("disabled");

                    $("#previous").click(function() {loadPage(result.previous.replace("http://es.rafaelferreira.pt:8000", ""));});

                }else{
                    $("#previous").attr("disabled", "disabled");
                }
            }else{
                $("#pages").addClass("hidden");
            }

        });

    }


    if($('#total_stations').length){
        $.getJSON("/api/v1/shared_data/stats/", function(result){
           $("#total_stations").text(result.stations);
           $("#total_pollutants").text(result.pollutants);
           $("#total_data").text(result.totalData);
           $("#total_days").text(result.days);
        });
    }

    if($('#stations').length){
        $.getJSON("/api/v1/shared_data/stations/", function(result){
            result.forEach(function(entry) {
               if(entry.code=="3096"){
                   $('#stations').append($('<option>', {
                        value: entry.code,
                        text : entry.littleName + " : " + entry.code,
                        selected: true
                    }));
                   $("#station_selected").text(entry.littleName + " : " + entry.code);
               }else{
                   $('#stations').append($('<option>', {
                        value: entry.code,
                        text : entry.littleName + " : " + entry.code
                    }));
               }
            });
            getCompareData();
        });
        $(".select2_single").select2({
            placeholder: "Select a station",
            allowClear: true
        });
        $("#stations").change(function () {
            getCompareData();
        });
    }

    if($("#sendShareEmail").length){
        $("#sendShareEmail").click(function () {
            var email = $("#emailShare").val();

            $.ajax({
                url: "api/v1/dropbox/share/"+email+"/",
                dataType: 'json',
                success: function(data) {
                    $("#response").html("<div class=\"alert alert-success alert-dismissible fade in\" role=\"alert\">" +
                        "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span>" +
                        "</button><strong>Good! :-)</strong> " + data.message + "</div>");
                },
                error: function( data ) {
                    $("#response").html("<div class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\">" +
                        "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span>" +
                        "</button><strong>Ups!</strong> Something went wrong! Output: " + data.message + "</div>");
                }
            });
        });
    }

    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    };

    function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(currentDate);
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    if($("#getObserved").length){
        $("#getObserved").click(function () {
            var date = moment(new Date($("#single_cal1").val())).format("YYYY/MM/DD");
            $.ajax({
                url: "/api/v1/observed_data/save/"+date+"/",
                dataType: 'json',
                success: function(data) {
                    $("#response").html("<div class=\"alert alert-success alert-dismissible fade in\" role=\"alert\">" +
                        "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span>" +
                        "</button><strong>Good! :-)</strong> " + data.message + "</div>");
                },
                error: function( data ) {
                    $("#response").html("<div class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\">" +
                        "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span>" +
                        "</button><strong>Ups!</strong> Something went wrong! Output: " + data.message + "</div>");
                }
            });
        });
    }

    if($(".applyBtn").length){
        $(".applyBtn").click(function () {
           getCompareData();
        });
    }

    function getCompareData() {
       $("#station_selected").text($('#stations').find(":selected").text());

       var startDate = new Date($('#reportrange').data('daterangepicker').startDate.format('MM/DD/YYYY'));
       var endDate = new Date($('#reportrange').data('daterangepicker').endDate.format('MM/DD/YYYY'));
    
       var rangeDates = getDates(startDate, endDate);
       var first = true;
        
       var id = 0;

       $("#daysTabsHeaders").html("");
       $("#daysTabsPanel").html("");

       rangeDates.forEach(function (date) {
           $.ajax({
                url: "/api/v1/compare_data/hour/sample/" + $('#stations').find(":selected").val() + "/"+moment(date).format("YYYY/MM/DD")+"/",
                dataType: 'json',
                success: function(result) {
                    if(first){
                       $("#daysTabsHeaders").append("<li role=\"presentation\" class=\"active\">" +
                           "<a href=\"#tab_content"+id+"\" id=\"profile-tab"+id+"\" role=\"tab\" data-toggle=\"tab\"" +
                           " aria-expanded=\"true\">"+moment(date).format("DD/MM/YYYY")+"</a></li>");
                        $("#daysTabsPanel").append("<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"tab_content"+id+"\" aria-labelledby=\"profile-tab"+id+"\"></div>");
                    }else{
                       $("#daysTabsHeaders").append("<li role=\"presentation\">" +
                           "<a href=\"#tab_content"+id+"\" id=\"profile-tab"+id+"\" role=\"tab\" data-toggle=\"tab\"" +
                           " aria-expanded=\"true\">"+moment(date).format("DD/MM/YYYY")+"</a></li>");
                        $("#daysTabsPanel").append("<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"tab_content"+id+"\" aria-labelledby=\"profile-tab"+id+"\"></div>");
                    }

                    result.forEach(function(entry) {
                        var id_chart = "echart_line_" + id + entry.pollutant.code;

                        $("#tab_content"+id).append("<div id=\"" + id_chart + "\" style=\"height:350px;\"></div><br/>");

                        var xAxis = [];
                        var observedData = [];
                        var modulatedData = [];
                        var compareData = [];

                        entry.data.forEach(function(data){
                            xAxis.push(data.hour);
                            observedData.push(data.observed);
                            modulatedData.push(data.modulated);
                            compareData.push(data.compareData);
                        });

                        var myChart = echarts.init(document.getElementById(id_chart), theme);

                        myChart.setOption({
                          title: {
                            text: 'Pollutant code: ' + entry.pollutant.code,
                            subtext: 'Observed vs Modulated'
                          },
                          tooltip: {
                            trigger: 'axis'
                          },
                          legend: {
                            data: ['Observed', 'Modulated', 'Compare data']
                          },
                          toolbox: {
                            show: true,
                            feature: {
                              magicType: {
                                show: true,
                                type: ['line', 'bar', 'stack', 'tiled']
                              },
                              restore: {
                                show: true
                              },
                              saveAsImage: {
                                show: true
                              }
                            }
                          },
                          calculable: true,
                          xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: xAxis
                          }],
                          yAxis: [{
                            type: 'value'
                          }],
                          series: [{
                            name: 'Observed',
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                              normal: {
                                areaStyle: {
                                  type: 'default'
                                }
                              }
                            },
                            data: observedData
                          }, {
                            name: 'Modulated',
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                              normal: {
                                areaStyle: {
                                  type: 'default'
                                }
                              }
                            },
                            data: modulatedData
                          }, {
                            name: 'Compare data',
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                              normal: {
                                areaStyle: {
                                  type: 'default'
                                }
                              }
                            },
                            data: compareData
                          }]
                        });
                    });

                    if(!first){
                        $("#tab_content"+id).removeClass("active")
                                            .removeClass("in");
                    }

                    first = false;
                    id++;
                },
                error: function( data ) {
                    if(first){
                       $("#daysTabsHeaders").append("<li role=\"presentation\" class=\"active\">" +
                           "<a href=\"#tab_content"+id+"\" id=\"profile-tab"+id+"\" role=\"tab\" data-toggle=\"tab\"" +
                           " aria-expanded=\"true\">"+moment(date).format("DD/MM/YYYY")+"</a></li>");
                        $("#daysTabsPanel").append("<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"tab_content"+id+"\" aria-labelledby=\"profile-tab"+id+"\"></div>");
                       first = false;
                    }else{
                       $("#daysTabsHeaders").append("<li role=\"presentation\">" +
                           "<a href=\"#tab_content"+id+"\" id=\"profile-tab"+id+"\" role=\"tab\" data-toggle=\"tab\"" +
                           " aria-expanded=\"true\">"+moment(date).format("DD/MM/YYYY")+"</a></li>");
                        $("#daysTabsPanel").append("<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"tab_content"+id+"\" aria-labelledby=\"profile-tab"+id+"\"></div>");
                    }
                    $("#tab_content"+id).html('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>Ups!</strong> It seams that the filters applied don\'t have data!</div>');
                    id++;
                }
          });
       });
    }
});
