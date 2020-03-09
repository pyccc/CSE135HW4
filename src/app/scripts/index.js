const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
console.log("this is index js");
window.addEventListener('DOMContentLoaded',  loadHandler); 
//exports.messageHere = functions.https.onRequest((request, response) =>{
//    response.send("This is a message from Firebase!");
//});

var firebaseConfig = {
    apiKey: "AIzaSyAbR-MRI-1mzYs4yDOh7aWRuCPwnzk7TZc",
    authDomain: "cse135-hw3-d14c9.firebaseapp.com",
    databaseURL: "https://cse135-hw3-d14c9.firebaseio.com",
    projectId: "cse135-hw3-d14c9",
    storageBucket: "cse135-hw3-d14c9.appspot.com",
    messagingSenderId: "511768372754",
    appId: "1:511768372754:web:bcfcb97f881f64dfc99acb",
    measurementId: "G-1MRKSMSSB8"
};
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const docRef = firestore.doc("samples/page_load"); 

let user_agent = navigator.userAgent;
let user_language = navigator.language;
let cookies_on = navigator.cookieEnabled;
let Width = window.screen.width;
let Height = window.screen.height;
let width = window.innerWidth;
let height = window.innerHeight;
let connection_type = navigator.connection.effectiveType;

docRef.set(
    {
         user_agent: user_agent,
         user_language: user_language,
         cookies_on: cookies_on,
         screen_width: Width,
         screen_height: Height,
         window_width: width,
         window_height: height,
         connection_type:connection_type
    }
).then(function(){
    console.log("Status saved!");
}).catch(function (error){
    console.log("Got an error: ", error);
});


exports.clickFunction = functions.https.onRequest((request, response) =>{
    response.send("This is a message from Firebase!");
});

loadHandler()

function loadHandler(){
    let el = document.querySelector('#useragent');
    if (el!=null){
       el.addEventListener('click', clickHandler);  
    }

    window.addEventListener('unload', function() {
        fetch ('/clickFunction', {
            method: 'POST',
            body: 'test',
            keepalive: true
        });
    })
}
function clickHandler(event){
    //console.log("qq");
    // change message here
    //alert('you clicked JS Event button');
    var stored = JSON.parse(localStorage.getItem("click"));
    if (!stored){
        stored=[];
    }
    //console.log(stored);
    stored.push('you clicked button '+event.target.id);
    localStorage.setItem("click", JSON.stringify(stored));
    //console.log(localStorage.getItem("click"));
}