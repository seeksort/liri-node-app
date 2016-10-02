# liri-node-app

(Node.js) A command line app that will output Tweets, Spotify song info, and movie info, based on user commands.

I used the following APIs:

- Twitter
- Spotify
- OMDB (using npm request module)
- Moment-timezone.js (I wanted a CST log file...)

To use it, type: 

    node liri.js

Followed by:

    my-tweets

    spotify-this-song (optional: add '<song title>' as 2nd arg)

    movie-this (optional: add '<movie title>' as 2nd arg)

    do-what-it-says

This was quite fun. The docs for all of the APIs are fairly well-written. Like a lot of code, I feel like working with APIs feels similar to assembling something, like Legos. The hardest part was pulling the arguments from the text file, because apparently TextEdit in OS X likes using right quotation marks (’) instead of straight apostrophes ('), and [the difference](http://stackoverflow.com/questions/6711892/right-single-apostrophe-vs-apostrophe) is enough to confuse the OMDB API. Learn your API quirks!

[Heroku](#)