# LIRI

Command Line Search App Using Node.js and Axios

Fun and Informative Video: https://drive.google.com/file/d/1E96_HhB7Pi3pcmr3FgSTUI36iZv8aImH/view?usp=sharing

Liri accepts user input from the command line and searches Spotify for songs, Bands in Town for concerts, and OMDB for movies based on the user's query. It returns results to the CLI and also logs both the query and the results to a text file.

To use this app, you will need your very own Spotify, OMDB, and Bands In Town API keys saved in a .env file in the root directory. Don't worry, they're freeeeeeeee.

Spotify Key Request: https://developer.spotify.com/dashboard/

OMDB API Key Request: http://www.omdbapi.com/apikey.aspx

Bands In Town: https://manager.bandsintown.com/support/bandsintown-api



# HOW TO USE LIRI

Using the command line, tell Liri whether you are looking for an artist, song, or movie and give the name. Use the following qurey formats:

1. To search for an upcoming concert using the Bands in Town API:
        node liri.js concert-this [artist/band name here]


2. To search for song using Spotify:   
        node liri.js spotify-this-song [song name here]


3. To search for a movie using OMDB:
        node liri.js movie-this [movie name here]

4. To take your chances with the grab bag known as random.txt:
        node liri.js do-what-it-says
