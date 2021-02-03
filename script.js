$(document).ready(function () {

    $("#loc-btn").click(function () {
        console.log("Hello")
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

        $.when(requestOne, requestTwo).done(function (responseOne, responseTwo) {
            console.log(responseOne);
            console.log(responseTwo);
            var latLocationOne = responseOne[0].results[0].geometry.location.lat;
            var lngLocationOne = responseOne[0].results[0].geometry.location.lng;
            // $("#locationOneLatLng").html("First location latitude is " + latLocationOne + " and Longitute is " + lngLocationOne);

            var latLocationTwo = responseTwo[0].results[0].geometry.location.lat;
            var lngLocationTwo = responseTwo[0].results[0].geometry.location.lng;
            // $("#locationTwoLatLng").html("Second location latitude is " + latLocationTwo + " and Longitute is " + lngLocationTwo);

            var finalLat = (latLocationOne + latLocationTwo) / 2;
            var finalLng = (lngLocationOne + lngLocationTwo) / 2;

            var cuisines = [];
            if ($('input[id="indian"]').is(':checked')) {
                var indianId = $("#indian").attr("data-cuisine-id");
                cuisines.push(indianId);
            }
            if ($('input[id="japanese"]').is(':checked')) {

                cuisines.push($("#japanese").attr("data-cuisine-id"));
            }
            if ($('input[id="italian"]').is(':checked')) {

                cuisines.push($("#italian").attr("data-cuisine-id"));
            }

            console.log(cuisines);


            // $("#finalLatLng").html("Final latitude is " + finalLat + " and Longitute is " + finalLng);
            getResturant(finalLat, finalLng, cuisines);
        });

    });

    // function is on click, how will we need to call my "getResturant function"?
    // api key "bb0c5902e0d27b1c6e6843ed70127291"
    function getResturant(finalLat, finalLng, cuisines) {
        console.log(finalLat);
        console.log(finalLng);

        $.ajax({
            method: "GET",
            crossDomain: true,
            url: "https://developers.zomato.com/api/v2.1/search?radius=2000&lat=" + finalLat + "&lon=" + finalLng + "&count=15&cuisines=" + cuisines,
            dataType: "json",
            async: true,
            headers: {
                "user-key": "bb0c5902e0d27b1c6e6843ed70127291"
            }
        }).then(function (response) {
            console.log(response);

            // pick a random number
            var num = Math.floor(Math.random() * 16);
            console.log(num);

            $("#response").empty();

            // for (var i = 0; i < response.restaurants.length; i++) {
            //     // newHTML.push('<span>' + array[i] + '</span>');
            //     console.log(i);
            //     var newh1 = $("<h1>");
            var resturantName = response.restaurants[num].restaurant.name;
            var resturantAddress = response.restaurants[num].restaurant.location.address;
            var cuisines = response.restaurants[num].restaurant.cuisines;
            //     newh1.html("Resturant: " + resturantName + "\n <br>" + "Address:  " + resturantAddress + "\n <br>" + "Cuisines:  " + cuisines);
            //     $("#address").append(newh1);
            console.log(resturantName);
            console.log(resturantAddress);
            console.log(cuisines);

            $("#response").append(resturantName, resturantAddress)


            // }


        })

    }





});
