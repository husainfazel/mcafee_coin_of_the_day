var config = {
  mcafee_twitter_id: '961445378',
  amount_to_buy: 1000,
  bittrex: {
    API_KEY: '',
    API_SECRET: ''
  },
  twitter: {
    CONSUMER_KEY: '',
    CONSUMER_SECRET: '',
    ACCESS_TOKEN: '',
    ACCESS_TOKEN_SECRET: ''
  }
};

var bittrex = require('node-bittrex-api');
bittrex.options({
  'apikey' : config.bittrex.API_KEY,
  'apisecret' : config.bittrex.API_SECRET,
});

var twit = require('twit')
var twitter = new twit({
  consumer_key:         config.twitter.CONSUMER_KEY,
  consumer_secret:      config.twitter.CONSUMER_SECRET,
  access_token:         config.twitter.ACCESS_TOKEN,
  access_token_secret:  config.twitter.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000
});

var stream = twitter.stream('statuses/filter', { 'follow' : config.mcafee_twitter_id });

// var tweet = {
//   text: 'Coin of the day: Reddcoin (RDD) - a sleeper - most widely used social network coin in the world - flying under the radar since 2014. Working with every Social Media platform, it is the only currency that many children under the age of 10 have ever known.'
// };

stream.on('tweet', function (tweet) {
  var msg = tweet.text;
  if(msg.indexOf('Coin of the day') !== -1) {
    var regExp = /\(([^)]+)\)/;
    var symbols = msg.match(regExp);
    if(symbols !== null) {
      var symbol = symbols[1];
      bittrex.getticker({ market : 'BTC-' + symbol }, function( data, err ) {
        if (err) {
          return console.error(err);
        }
        var bidPrice = data.result.Bid;
        bittrex.buymarket({ market: 'BTC-' + symbol, rate: bidPrice, quantity: config.amount_to_buy }, function(data, err) {
          if (err) {
            return console.error(err);
          }
          console.log('Bought ('+config.amount_to_buy+') of ' + symbol + ' at ' + bidPrice);
        });

      });
    }
  }
});