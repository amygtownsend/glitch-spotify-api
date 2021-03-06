// client-side js
// run by the browser each time your view template is loaded

$(function() {
    
  $.get('/search-track', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the track name
    var trackName = $('<a href="' + data.external_urls.spotify + '" target="_blank"><h3>' + data.name + '</h3></a>');
    trackName.appendTo('#search-track-container');
    
    var artistsArr = [];
    
    data.artists.forEach(function(element) {
      artistsArr.push(element.name); 
    });
    
    var artists = artistsArr.join(', ');
    
    // Display artists' names
    var artistName = $('<h5>' + artists + '</h5>');
    artistName.appendTo('#search-track-container');
    
    // Display the album art
    var img = $('<img/>');
    img.attr('src', data.album.images[0].url);
    img.appendTo('#search-track-container');
  });
  
  $.get('/category-playlists', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /category-playlists', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the covers of the playlists
    data.forEach((data) => {
      var name = $('<h2>' + data.name + '</h2>');
      name.appendTo('#category-playlists-container');
      data.data.items.map(function(playlist, i) {
        var img = $('<img class="cover-image"/>');
        img.attr('src', playlist.images[0].url);
        img.appendTo('#category-playlists-container');
      });
    });
  });
  
  $.get('/audio-features', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /audio-features', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // The audio features we want to show
    var keys = ["danceability", "energy", "acousticness", "loudness", "speechiness", "tempo"]
    
    // Display the audio features
    keys.map(function(key, i) {
      if (data.hasOwnProperty(key)) {
        var feature = $('<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>');
        feature.appendTo('#audio-features-container');
      }
    });
  });
  
  $.get('/artist', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the artist's image
    var img = $('<img class="circle-image" />');
    img.attr('src', data.images[0].url);
    img.appendTo('#artist-container');
    
    // Display the artist name
    var trackName = $('<h3>' + data.name + '</h3>');
    trackName.appendTo('#artist-container');
    
    // Display the artist's genres
    data.genres.map(function(genre, i) {
      var genreItem = $('<p>' + genre + '</p>');
      genreItem.appendTo('#artist-container');
    });
    
    // Display the artist's popularity
    var popularity = $('<h4>' + 'Popularity: ' + data.popularity + '</h4>');
    popularity.appendTo('#artist-container');
    
    // Display the artist's followers
    var followers = $('<h4>' + 'Followers: ' + data.followers.total + '</h4>');
    followers.appendTo('#artist-container');
  });
  
  $.get('/artist-top-tracks', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the audio features
    data.map(function(track, i) {
      var trackName = $('<li>' + track.name + '</li>');
      trackName.appendTo('#top-tracks-container');
    });
  });
  
  $.get('/new-releases', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /new-releases', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the covers of the new releases
    data.items.map(function(album, i) {
      var img = $('<img class="cover-image"/>');
      img.attr('src', album.images[0].url);
      img.appendTo('#new-releases-container');
    });
  });

});
