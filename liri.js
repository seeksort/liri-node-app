var 
    command = process.argv[2]
    searchStr = process.argv[3]
    ;

var 
    request = require('request')
    spotify = require('spotify')
    Twitter = require('twitter')
    keys = require('./keys.js')
    ;

var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret 
});

// Twitter (one arg)
function grabTweets() {
    client.get('statuses/user_timeline', {
        screen_name: 'seeksort',
        count: 5
    }, function(error, tweets, response) {
        if (error) {
            console.log(error);
        }
        else {
            tweets.forEach(function(tweet) {
                console.log('TWEET: ' + tweet.created_at + ': \n' + tweet.text + '\n');
            });
        }
    });
}

// Spotify (two args)
function grabSpotify(trackSearch) {
    spotify.search({
        type: 'track',
        query: trackSearch + '&limit=1'
    }, function(error, data) {
        if (error) {
            console.log(error);
        }
        else { // artist, song title, preview url, album name
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Track: ' + data.tracks.items[0].name);
            console.log('Preview URL: ' + data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
            // console.log(data); Debug
        }
    });
}

// OMDB (two args)
function grabMovie(movieSearch){
    var movieParam = 'http://www.omdbapi.com/?t=' + movieSearch + '&y=&plot=short&tomatoes=true&r=json';
    request(movieParam, function(error, response, body) {
        if (error) {
            console.log(body);
        }
        else {
            var result = JSON.parse(body);
            console.log('Title: ' + result.Title);
            console.log('Year: ' + result.Year);
            console.log('IMDB Rating: ' + result.imdbRating);
            console.log('Country: ' + result.Country);
            console.log('Language: ' + result.Language);
            console.log('Plot: ' + result.Plot);
            console.log('Actors: ' + result.Actors);
            console.log('Rotten Tomatoes Rating: ' + result.tomatoRating);
            console.log('Rotten Tomatoes URL: ' + result.tomatoURL);
        }
    });
}

// random.txt (one arg)
function grabRandom() {

}

// Append to log.txt

// Grab args
if (!command) {
    console.log('Liri requests a command.');
}
else if (!searchStr) {
    if (command === 'my-tweets'){
        grabTweets();
    }
    else if (command === 'do-what-it-says') {

    }
    else if (command === 'spotify-this-song') {
        grabSpotify('The Sign artist:Ace of Base');
    }
    else if (command === 'movie-this') {
        grabMovie('Mr. Nobody');
    }
    else {
        console.log('Liri requests a valid command.');
    }
} 
else if (searchStr) {
    if (command === 'spotify-this-song') {
        grabSpotify(searchStr);
    }
    else if (command === 'movie-this') {
        grabMovie(searchStr);
    }
}





