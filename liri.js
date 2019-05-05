// code to read and set any environment variables with the dotenv package //

var Dotenv = require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');

// code required to import the keys.js file and store it in a variable //

var keys = require("./keys.js");

// access keys information //

var spotify = new Spotify(keys.spotify);

// VARIABLES //
var input = process.argv;
var action = input[2];

// FUNCTIONS //

// to catch no user input
function inputCheck(n) {
    var i = "";
    if (n[2] === "spotify-this-song") {
      if (n[3]){
        i = n.slice(3).join(" ");
     }else{
        i = "The Sign";
     }
    }
    if (n[2] === "concert-this") {
     if (n[3]){
        i = n.slice(3).join(" ");
     }else{
        i = "Barry Manilow";
        }
    }
    return i;
}


var searchTerm = inputCheck(input);


var results = [''];

// Log the searchTerm we built
console.log("Searching for " + searchTerm);



// SPOTIFY-THIS-SONG //
// This pulls information from the Spotify API using the node-spotify-api library.


if (action === "spotify-this-song"){
    
    spotify
    .search({ type: 'track', query: searchTerm, limit: 1 })
    .then(function(spotRes) {

        //Store the artist, song, preview link, and album in the results array
        // From https://stonesoupprogramming.com/2017/07/03/node-js-spotify/

        spotRes.tracks.items.forEach(function(ea){
            results.push({artist: ea.artists[0].name,
                        song: ea.name,
                        preview: ea.external_urls.spotify,
                        album: ea.album.name});
        });

        // DOESN'T WORK //
       if(results !== ['']) {
        
            console.log("\nArtist: " + results[1].artist);
            console.log("\nTitle: " + results[1].song);
            console.log("\nAlbum: " + results[1].album);
            console.log("\nPreview: " + results[1].preview);
       }else{
          console.log("No songs by that name in the database. Please try again.")
        }
       /*  if (results = undefined){    
            console.log("No songs by that name in the database. Please try again.")
        
       }else{
         
        console.log("\nArtist: " + results[1].artist);
        console.log("\nTitle: " + results[1].song);
        console.log("\nAlbum: " + results[1].album);
        console.log("\nPreview: " + results[1].preview);
        } */
    })
    .catch(function(err) {
        console.log(err);
    });
    }

// CONCERT-THIS //
// This pulls data from the Bands in Town Artist Events API
if (action === "concert-this"){

axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
  function(response) {
    var venueName = response.data[0].venue.name;
    var venueLocation = response.data[0].venue.city + ", " + response.data[0].venue.region;
    var dateTime = response.data[0].datetime;  // sample return: 2019-05-30T20:00:07
    var truncatedDate = dateTime.slice(0,10); // sample return: 2019-05-30
    var truncatedFormat = "YYYY/MM/DD";
    var convertedDate = moment(truncatedDate, truncatedFormat);   

    console.log("Venue Name: " + venueName);
    console.log("Venue Location: " + venueLocation);
    console.log("Date and Time: " + convertedDate.format("MM/DD/YYYY")); // sample return: 05/30/2019

  });
}
    
// MOVIE-THIS //


// We then run the request with axios module on a URL with a JSON
// axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
//  function(response) {
    // Then we print out the imdbRating
//    console.log("The movie's rating is: " + response.data.imdbRating);
//  }
// );




// DO-WHAT-IT-SAYS //

