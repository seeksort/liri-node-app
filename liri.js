var 
    command = process.argv[2]
    searchStr = process.argv[3]
    ;

var 
    fs = require('fs')
    moment = require('moment-timezone')
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
        count: 20
    }, function(error, tweets, response) {
        if (error) {
            console.log(error);
        }
        else {
            tweets.forEach(function(tweet) {
                var logTweet = 'TWEET TIME: ' + tweet.created_at + ': \n' + tweet.text + '\n';
                console.log(logTweet);
                writeLog(logTweet);
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
        else {
            var logTrack = 
            'Artist: ' + data.tracks.items[0].artists[0].name + '\n' +
            'Track: ' + data.tracks.items[0].name + '\n' +
            'Preview URL: ' + data.tracks.items[0].preview_url + '\n' +
            'Album: ' + data.tracks.items[0].album.name;
            console.log(logTrack);
            writeLog(logTrack);
        }
    });
}

// OMDB (two args)
function grabMovie(movieSearch){
    var movieParam = 'https://www.omdbapi.com/?t=' + movieSearch + '&y=&plot=short&tomatoes=true&r=json';
    request(movieParam, function(error, response, body) {
        if (error) {
            console.log(body);
        }
        else {
            var result = JSON.parse(body);
            var logMovie = 
            'Title: ' + result.Title + '\n' +
            'Year: ' + result.Year + '\n' +
            'IMDB Rating: ' + result.imdbRating + '\n' +
            'Country: ' + result.Country + '\n' +
            'Language: ' + result.Language + '\n' +
            'Plot: ' + result.Plot + '\n' +
            'Actors: ' + result.Actors + '\n' +
            'Rotten Tomatoes Rating: ' + result.tomatoRating + '\n' +
            'Rotten Tomatoes URL: ' + result.tomatoURL
            console.log(logMovie);
            writeLog(logMovie);
        }
    });
}

// random.txt (one arg)
function grabRandom() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        }
        else {
            if (data.includes(',')) {
                var argsArr = data.split(',');
                argsArr[1] = argsArr[1].slice(1,-1).replace(/’/g, '\'');
                evalArgs(argsArr[0], argsArr[1]);
            }
            else {
                evalArgs(data);
            }
        }
    })
}

// Append to log.txt
function writeLog(text) {
    var now = moment().tz('America/Chicago').format("YYYY-MM-DD h:mm:ss A z -");
    fs.appendFile('log.txt', now + ' \n' + text + '\n\n', function(error) {
        if (error) {
            console.log('Append to log error: ' + error);
        }
    });
}

// Grab args
function evalArgs(command, searchStr) {
    if (!command) {
        writeLog('no command entered');
        console.log('Liri requests a command.');
    }
    else if (!searchStr) {
        writeLog('USER >> ' + command);
        switch (command) {
            case 'my-tweets':
                grabTweets();
                break;
            case 'spotify-this-song':
                grabSpotify('The Sign artist:Ace of Base');
                break;
            case command === 'movie-this':
                grabMovie('Mr. Nobody');
                break;
            case command === 'do-what-it-says':
                grabRandom();
                break;
            default:
                console.log('Liri requests a valid command.');
                break;
        }
    } 
    else if (searchStr) {
        writeLog('USER >> ' + command + ' ' + searchStr);
        if (command === 'spotify-this-song') {
            grabSpotify(searchStr);
        }
        else if (command === 'movie-this') {
            grabMovie(searchStr);
        }
    }
}

// Start program
evalArgs(command, searchStr);
