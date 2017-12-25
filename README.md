# Automated Script for John McAfee's Coin of the Day

This is a simple NodeJS script which uses the Twitter Stream API to detect when McAfee posts his latest "Coin of the Day" recommendation. It tries to detect the symbol he's posted and gets the latest market information from Bittrex and then places an market-buy order for you.

## Configuration / Requirements

* You need to have Bittrex account, funded in Bitcoin and you will need to activate 2FA and create an API Key/Secret
* You need to add your phone number to your Twitter account, go to https://apps.twitter.com/app/new to create a sample app and obtain API credentials to access the Twitter Stream API

Edit the index.js file and update the configuration at the top of the file:

```
var config = {
  mcafee_twitter_id: '961445378',  // you can change this to your own ID to test the functionality
  amount_to_buy: 1000,             // quantity of the coin you wish to purchase
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
```

## Caveats

This script does some really simple parsing of the tweet, for example it searches for the phrase "Coin of the day" as McAfee has used this for the last few recommendations he's posted. If he changes the format, it will fail to work.

Likewise it expects him to put the symbol for the coin (e.g RDD) in brackets somewhere within the tweet. We're hoping he doesn't make a typo ;)

McAfee has mentioned he's going to make it harder for automated bots so expect him to create images and to mix things up but this is open source so hopefully people can update the script.

It does not create a sell order so you can either fudge that into the script after X amount of mins or do it manually.

Lastly I bashed this up in a few minutes so don't hold me responsible for any mistakes / loss of funds! :)
