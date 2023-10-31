const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

// this will give us access to the firestore database store access tokens
admin.initializeApp();

const dbRef = admin.firestore().collection("notes");
console.log("dbRef: ", dbRef);

const TwitterApi = require("twitter-api-v2").default;
const twitterClient = new TwitterApi({
  clientId: "cG01dTBvSFFLMXdGT2Jnd0dlRGM6MTpjaQ",
  clientSecret: "m89M0dcxKifto46U17WxyDR0tczMvQ4PEwadJVU-P1wwNk73xj",
});

// const callbackURL = "https://us-central1-x-notes-d3f6a.cloudfunctions.net/callback";
const callbackURL = "https://x-notes-d3f6a.firebaseapp.com/__/auth/handler";

exports.auth = onRequest((request, response) => {
  logger.info("Hello logs, auth request!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.callback = onRequest((request, response) => {
  logger.info("Hello logs, callback request!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.tweet = onRequest((request, response) => {
  try {
    const postTweet = async () => {
      console.log("Post Tweet");
      const tweet = await twitterClient.tweets.createTweet({
        text: "Testing",
      });
      console.log("tweet: ", tweet);
    };
    postTweet();
  } catch (error) {
    console.log("error: ", error);
  }
});

