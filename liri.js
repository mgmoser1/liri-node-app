// code to read and set any environment variables with the dotenv package //

var Dotenv = require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

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
    if (n[2] === "movie-this") {
        if (n[3]){
           i = n.slice(3).join(" ");
        }else{
            i = "Mr. Nobody";
        }
    }
    return i;
}


var searchTerm = inputCheck(input);
var results = [''];
liri(action, searchTerm);

// Log the searchTerm we built


function liri(action, searchTerm) {

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
        
        // date conversion with moment.
        var truncatedDate = dateTime.slice(0,10); // sample return: 2019-05-30
        var truncatedFormat = "YYYY/MM/DD";
        var convertedDate = moment(truncatedDate, truncatedFormat);   

        console.log("Venue Name: " + venueName);
        console.log("Venue Location: " + venueLocation);
        console.log("Date and Time: " + convertedDate.format("MM/DD/YYYY")); // sample return: 05/30/2019

    })
    .catch(function (error) {
        console.log(error);
      });
    }
        
    // MOVIE-THIS //
    // Pulls data from the OMDB API.
    if (action === "movie-this"){

        axios
        .get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
           
            console.log("Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("IMDB's Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes' Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

        })
        .catch(function (error) {
            console.log(error);
          });
        
    }


// DO-WHAT-IT-SAYS //
// This takes the instructions from the text file "random.txt" and executes them.
if (action === "do-what-it-says"){ 
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
        }
        var randomTask = data.split(",");; // example return: spotify-this-song,"I Want it That Way"
        action = randomTask[0];
        searchTerm = randomTask.slice(1).join(" ");
        liri(action, searchTerm);
    });   
    
}
}
