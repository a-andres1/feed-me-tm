$(document).ready(function () {

    // Load values from local storage on page load.
    $("#firstLocation").val(localStorage.getItem("locationOne"));
    $("#secondLocation").val(localStorage.getItem("locationTwo"));

    $("#indian").prop("checked", localStorage.getItem("indian") == "true");
    $("#japanese").prop("checked", localStorage.getItem("japanese") == "true");
    $('input[id="italian"]').prop("checked", localStorage.getItem("italian") == "true");

    // Function to get latitude and longitude
    $("#loc-btn").click(function () {
        console.log("Hello")
        $("#location").empty();
        // setting variables to get values from the user input
        var locationOne = $("#firstLocation").val().trim();
        var locationTwo = $("#secondLocation").val().trim();

        console.log(locationOne);
        console.log(locationTwo);
        // if statements in case people don't enter addresses correctly
        if (locationOne === "" && locationTwo === "") {
            var text = $("<p>").text("Please enter an address")
            $("#location").append(text);
            
        }
       else if (locationOne === "") {
            locationOne = locationTwo
            getTudes(locationOne, locationTwo);
        }
       else if (locationTwo === "") {
        locationTwo = locationOne
        getTudes(locationOne, locationTwo);
            
        }
        else {
            getTudes(locationOne, locationTwo);

        }
        console.log(locationTwo)

        localStorage.setItem("locationOne", locationOne);
        localStorage.setItem("locationTwo", locationTwo);

        var isIndianChecked = $("#indian").is(":checked");
        var isJapaneseChecked = $("#japanese").is(":checked");
        var isItalianChecked = $("#italian").is(":checked");
        localStorage.setItem("indian", isIndianChecked);
        localStorage.setItem("japanese", isJapaneseChecked);
        localStorage.setItem("italian", isItalianChecked);

    });

    function getTudes(locationOne, locationTwo) {   // ajax call for the first location
        var requestOne = $.ajax({
            url: "https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=" + locationOne,
            method: "GET",
            headers: {
                'x-rapidapi-key': '2c0c4fc78amsh2da7164325059e7p108519jsn0d3ac9dc0c8c',
                'x-rapidapi-host': 'google-maps-geocoding.p.rapidapi.com'
            }
        });
        // ajax call for the second location
        var requestTwo = $.ajax({
            url: "https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=" + locationTwo,
            method: "GET",
            headers: {
                'x-rapidapi-key': '2c0c4fc78amsh2da7164325059e7p108519jsn0d3ac9dc0c8c',
                'x-rapidapi-host': 'google-maps-geocoding.p.rapidapi.com'
            }
        });
        // used .when to wait for both api calls to be completed
        $.when(requestOne, requestTwo).done(function (responseOne, responseTwo) {
            console.log(responseOne);
            console.log(responseTwo);
            // setting variables for the lat and long for the first location returned from the api call
            var latLocationOne = responseOne[0].results[0].geometry.location.lat;
            var lngLocationOne = responseOne[0].results[0].geometry.location.lng;
            // setting variables for the lat and long for the second location 
            var latLocationTwo = responseTwo[0].results[0].geometry.location.lat;
            var lngLocationTwo = responseTwo[0].results[0].geometry.location.lng;
            // math to find the distance between these two locations and search for resturants between them
            // if one address, double the first lat and long, if two addresses, do the thing written here. 
            var finalLat = (latLocationOne + latLocationTwo) / 2;
            var finalLng = (lngLocationOne + lngLocationTwo) / 2;
            // variable for cuisines picked by user, they can pick one or all of them, these numbers will be used for the zomato api call
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

            // passing the parameters to the function for the zomato api call
            // $("#finalLatLng").html("Final latitude is " + finalLat + " and Longitute is " + finalLng);
            getResturant(finalLat, finalLng, cuisines);
        });
    }



    // function to run the zomato api call
    function getResturant(finalLat, finalLng, cuisines) {
        console.log(finalLat);
        console.log(finalLng);

        $.ajax({
            method: "GET",
            crossDomain: true,
            url: "https://developers.zomato.com/api/v2.1/search?radius=1000&lat=" + finalLat + "&lon=" + finalLng + "&count=15&cuisines=" + cuisines,
            dataType: "json",
            async: true,
            headers: {
                "user-key": "bb0c5902e0d27b1c6e6843ed70127291"
            }
        }).then(function (response) {
            console.log(response);

            // pick a random number
            var num = Math.floor(Math.random() * response.restaurants.length);
            console.log(num);
            // clears the response so that the restuarants don't append to each other
            $("#response").empty();
            // originally had a for loop to see if all the restuarants were printing took that out since we really only needed the array. Using num variable to pick a random restuarant from the array
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
            // appends the chosen resturant to the html page
            $("#response").append(resturantName, resturantAddress)


            // }


        })

    }





});
