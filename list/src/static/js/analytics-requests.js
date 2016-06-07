$(document).ready(function(){
    $.getJSON("/api/v1/register/list_months/2016/", function (data) {
        console.log(data);
    });
});
