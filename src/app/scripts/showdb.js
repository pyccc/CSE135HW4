console.log("script");

fetch("https://us-central1-cse135-hw3-d14c9.cloudfunctions.net/showdb", {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
            }).then(res => {
                console.log("page idle info is sent " + res);
                document.getElementById("#history").innerText = res.toString();
            })


// loadInfo1.get().then(doc => {
//     document.getElementById("#page").innerText = doc;
// });
// history1.get().then(doc => {
//     document.getElementById("#history").innerText = doc;
// });
// clickInfo1.get().then(doc => {
//     document.getElementById("#click").innerText = doc;
// });
// mouseon1.get().then(doc => {
//     document.getElementById("#mouseon").innerText = doc;
// });
// idle1.get().then(doc => {
//     document.getElementById("#idle").innerText = doc;
// });