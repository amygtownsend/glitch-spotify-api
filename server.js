// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


//-------------------------------------------------------------//
//----------------------- AUTHORIZATION -----------------------//
//-------------------------------------------------------------//


// Initialize Spotify API wrapper
var SpotifyWebApi = require('spotify-web-api-node');

// The object we'll use to interact with the API
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET
});

// Using the Client Credentials auth flow, authenticate our app
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
  
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('Got an access token: ' + spotifyApi.getAccessToken());
  
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });


//-------------------------------------------------------------//
//------------------------- API CALLS -------------------------//
//-------------------------------------------------------------//


app.get('/search-track', function (request, response) {
  
  // Search for a track!
  spotifyApi.searchTracks('track:Anagram', {limit: 1})
    .then(function(data) {
    
      // Send the first (only) track object
      response.send(data.body.tracks.items[0]);
    
    }, function(err) {
      console.error(err);
    });
});

app.get('/category-playlists', function (request, response) {
  
  // Get playlists from a browse category
  // Find out which categories are available here: https://beta.developer.spotify.com/console/get-browse-categories/
  
  // Country names and country codes
  // let countries = ["Peru", "Colombia"];
  
  let countries = [
    {
      name: "Peru",
      code: "PE"
    },
    {
      name: "Colombia",
      code: "CO"
    }
  ];
  
  
  countries.forEach((c) => {
    
    spotifyApi.getPlaylistsForCategory('latin', { country: c.code, limit : 10 })
      .then((data) => {
         
      c.data = data.body.playlists;
      while (countries.filter(c => c.data !== undefined).length === countries.length) {
        // let allData = [];
        // let i = 0;
        // countries.forEach((c) => {
        //   allData[i] = c.data;
        //   i++;
        // });
        response.send(countries);
      }
    }, (err) => {
      console.error(err);
    });
  });
});

app.get('/audio-features', function (request, response) {
  
  // Get the audio features for a track ID
  spotifyApi.getAudioFeaturesForTrack('1YLJVmuzeM2YSUkCCaTNUB')
    .then(function(data) {
    
      //Send the audio features object
      response.send(data.body);
    
    }, function(err) {
      console.error(err);
    });
});

app.get('/artist', function (request, response) {
  
  // Get information about an artist
  spotifyApi.getArtist('6LuN9FCkKOj5PcnpouEgny')
    .then(function(data) {
    
      // Send the list of tracks
      response.send(data.body);
    
    }, function(err) {
      console.error(err);
    });
});

app.get('/artist-top-tracks', function (request, response) {
  
  // Get an artist's top tracks in a country
  spotifyApi.getArtistTopTracks('7EQ0qTo7fWT7DPxmxtSYEc', 'US')
    .then(function(data) {
    
      // Send the list of tracks
      response.send(data.body.tracks);
    
    }, function(err) {
      console.error(err);
    });
});

app.get('/new-releases', function (request, response) {
  
  // Get new releases in a country
  spotifyApi.getNewReleases('US')
    .then(function(data) {
    
      // Send the list of tracks
      response.send(data.body.albums);
    
    }, function(err) {
      console.error(err);
    });
});


//-------------------------------------------------------------//
//------------------------ WEB SERVER -------------------------//
//-------------------------------------------------------------//


// Listen for requests to our app
// We make these requests from client.js
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
