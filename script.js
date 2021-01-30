$(document).ready(function () {

    $("#submitButton").click(function () {
        var locationOne = $("#firstLocation").val().trim();
        var locationTwo = $("#secondLocation").val().trim();
        
        var requestOne = $.ajax({ 
            url: "https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=" + locationOne,
            method: "GET",
            headers: {
                'x-rapidapi-key': '2c0c4fc78amsh2da7164325059e7p108519jsn0d3ac9dc0c8c',
                'x-rapidapi-host': 'google-maps-geocoding.p.rapidapi.com'
            }
        });

        var requestTwo = $.ajax({ 
            url: "https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=" + locationTwo,
            method: "GET",
            headers: {
                'x-rapidapi-key': '2c0c4fc78amsh2da7164325059e7p108519jsn0d3ac9dc0c8c',
                'x-rapidapi-host': 'google-maps-geocoding.p.rapidapi.com'
            }
        });

        $.when(requestOne, requestTwo).done(function(responseOne, responseTwo) {
            console.log(responseOne);
            console.log(responseTwo);
            var latLocationOne = responseOne[0].results[0].geometry.location.lat;
            var lngLocationOne = responseOne[0].results[0].geometry.location.lng;
            $("#locationOneLatLng").html("First location latitude is " + latLocationOne + " and Longitute is " + lngLocationOne);

            var latLocationTwo = responseTwo[0].results[0].geometry.location.lat;
            var lngLocationTwo = responseTwo[0].results[0].geometry.location.lng;
            $("#locationTwoLatLng").html("Second location latitude is " + latLocationTwo + " and Longitute is " + lngLocationTwo);

            var finalLat = (latLocationOne + latLocationTwo) / 2;
            var finalLng = (lngLocationOne + lngLocationTwo) / 2;
            $("#finalLatLng").html("Final latitude is " + finalLat + " and Longitute is " + finalLng);


          });

    });

});
