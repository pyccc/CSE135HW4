const functions = require('firebase-functions');
var firebase = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


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

const loadInfo = firestore.doc("collect/page_info");
const clickInfo = firestore.doc("collect/click_info");
const history = firestore.doc("collect/user_history");
const idle = firestore.doc("collect/idle");
const mouseon = firestore.doc("collect/mouseon");

exports.showdb = functions.https.onRequest((req,res)=>{

    firestore.doc("collect/user_history").get().then(doc=>{
        console.log(doc.data());
        res.send(doc.data());
        return doc.data();
    }).catch(error=>{
        console.log(error);
    });
});


exports.collect = functions.https.onRequest((req, res) => {
    //check user auth, create session
    // var user=firebase.auth().CurrentUser;

    // check method -- only allow POST and GET

    switch (req.method) {
        case 'GET':
            loadInfo.get().then(doc => {
                if (doc && doc.exists) {
                    const myData = doc.data();
                    res.status(200).send(myData);
                }
                return doc;
            }).catch(error => {
                res.status(405).send({ error: 'Something blew up!' });
                console.log(error)
            });
            break;
        case 'POST':
            console.log("body:  " + req.body);
            console.log("method:  " + req.method);
            console.log("contenttype:   " + req.get('content-type'));
            var data;
            switch (req.get('content-type')) {
                // '{"name":"John"}'
                case 'application/json;charset=UTF-8':
                    ({ data } = req.body);
                    console.log('json data:' + data);
                    break;

                // 'John', stored in a Buffer
                case 'application/octet-stream;charset=UTF-8':
                    data = req.body.toString(); // Convert buffer to a string
                    console.log('application/octet-stream data:' + data);
                    break;

                // 'John'
                case 'text/plain;charset=UTF-8':
                    data = req.body;
                    console.log('text data:' + data);
                    break;

                // 'name=John' in the body of a POST request (not the URL)
                case 'application/x-www-form-urlencoded;charset=UTF-8':
                    ({ data } = req.body);
                    console.log('data:' + data);
                    break;
                default:
                    console.log("no content type");
                    break;
            }
            if (data) {
                switch (req.query.name) {
                    case "page":
                        console.log("page:   " + data);
                        loadInfo.set(JSON.parse(data));
                        history.get().then(doc => {
                            var myData={};
                            var date = new Date();
                            if (doc && doc.exists) {
                                myData = doc.data();
                            }
                            myData[date.toTimeString()] = "User is visiting " + JSON.parse(req.body).current_page + " page.";
                            history.set(myData);
                            return doc;
                        }).catch(error => {
                            res.status(405).send({ error: 'Something blew up!' });
                            console.log(error);
                        });
                        break;

                    case "click":
                        console.log("click:   " + data);
                        clickInfo.get().then(doc => {
                            var myData={};
                            if (doc && doc.exists) {
                                myData = doc.data();
                            }
                            myData[JSON.parse(req.body).page] = JSON.parse(req.body).value;
                            clickInfo.set(myData);
                            return doc;
                        }).catch(error => {
                            res.status(405).send({ error: 'Something blew up!' });
                            console.log(error);
                        });
                        break;

                    case "idle":
                        console.log("idle:   " + data);
                        idle.get().then(doc => {
                            var myData={};
                            if (doc && doc.exists) {
                                myData = doc.data();
                            }
                            myData[JSON.parse(req.body).page] = JSON.parse(req.body).value;
                            idle.set(myData);
                            return doc;
                        }).catch(error => {
                            res.status(405).send({ error: 'Something blew up!' });
                            console.log(error);
                        });
                        break;

                    case "history":
                        history.get().then(doc => {
                            var myData={};
                            if (doc && doc.exists) {
                                myData = doc.data();
                            }

                            var attributes = Object.keys(JSON.parse(data)); 
                            for (var i = 0; i < attributes.length; i++) {
                                myData[attributes[i]] = data[attributes[i]];
                            }

                            history.set(myData);
                            return doc;
                        }).catch(error => {
                            res.status(405).send({ error: 'Something blew up!' });
                            console.log(error);
                        });
                        break;

                    case "mouseon":
                        console.log("mouseon:   " + data);
                        mouseon.get().then(doc => {
                            var myData={};
                            if (doc && doc.exists) {
                                myData = doc.data();
                            }
                            myData[JSON.parse(req.body).page] = JSON.parse(req.body).value;
                            mouseon.set(myData);
                            return doc;
                        }).catch(error => {
                            res.status(405).send({ error: 'Something blew up!' });
                            console.log(error);
                        });
                        break;
                        
                    default:
                        console.log("wrong query name");
                        break;
                }
                res.status(200).send(data);
            }
            else {
                res.status(400).send({ error: 'Nothing is sent.' });
            }
            break;
        case 'PUT':
            res.status(403).send('Forbidden!');
            break;
        default:
            res.status(405).send({ error: 'Something blew up!' });
            break;
    }
});



