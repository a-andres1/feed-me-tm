$(document).ready(function () {

    $("#submitButton").click(function () {
        var locationOne = $("#firstLocation").val().trim();
        var locationTwo = $("#secondLocation").val().trim();
        
        console.log(locationOne );
        console.log(locationTwo );
        var queryUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=" + locationOne + "&destination=" + locationTwo + "&key=AIzaSyDefHkn2_1LDLBHbKVXW96lTDBJZwzeQp8";
        $.ajax({ 
            url: queryUrl,
            
            method: "GET"
        }).then(function (response) {
            console.log(response);
        console.log(response.routes[0].legs[0].distance.text);
        var distance = response.routes[0].legs[0].distance.text;
        $("#distance").html("Your distance is " + distance);
        // consol
        
        
        });

    });

});
