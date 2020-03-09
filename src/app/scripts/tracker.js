
// Initialise variables for local temporary data storage
var page_history = {};
var click_history = [];
var mouseon_history = [];
var idle_history = 0;
var stored_keystrokes = {};
var path = window.location.pathname;
var page = path.split("/").pop();

//Run these given function while each page is loading
window.addEventListener('DOMContentLoaded', loadHandler);
window.onload = function () {

    setTimeout(function () {

        //Get value for page load data and save it temporarily
        let user_agent = navigator.userAgent;
        let user_language = navigator.language;
        let cookies_on = navigator.cookieEnabled;
        let Width = window.screen.width;
        let Height = window.screen.height;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let connection_type = navigator.connection.effectiveType;

        localStorage.setItem("javascript_on", false);
        //localStorage.setItem('css_on', window.getComputedStyle(document.getElementsByName('testButton')[0]).backgroundColor == 'rgb(75, 72, 72)');
        var data = {
            "current_page": page,
            "user_agent": user_agent,
            "user_language": user_language,
            "cookies_on": cookies_on,
            "screen_width": Width,
            "screen_height": Height,
            "window_width": width,
            "window_height": height,
            "connection_type": connection_type
        };
        
        //Use JS communication method - FETCH to send infomation to the endpoint for page_load data.
        fetch("https://us-central1-cse135-hw3-d14c9.cloudfunctions.net/collect?name=page", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'include', // include, *same-origin, omit
            // headers: {
            //   'Content-Type': 'application/json'
            //   // 'Content-Type': 'application/x-www-form-urlencoded',
            // },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(res => {
            console.log("page info is sent " + res.status);
        });
    }, 0);
}

//Function and event listerner handler
function loadHandler() {
    let el = document.querySelector('#useragent');
    let el2 = document.querySelector('#userlanguage');
    let el3 = document.querySelector('#cookies');
    let el4 = document.querySelector('#form_example_button');
    let el5 = document.querySelector('#testmouseimg');
    let el6 = document.querySelector('#testmouseimg2');
    if (el != null) {
        el.addEventListener('click', clickHandler);
    }
    if (el2 != null) {
        el2.addEventListener('click', clickHandler);
    }
    if (el3 != null) {
        el3.addEventListener('click', clickHandler);
    }
    if (el4 != null) {
        el4.addEventListener('click', clickHandler);
    }
    if (el5 != null) {
        el5.addEventListener('mouseover', mouseOnHandler);
    }
    if (el6 != null) {
        el6.addEventListener('mouseover', mouseOnHandler);
    }
    window.addEventListener('scroll', scrollHandler);

    //Keystrokes
    if (window.location.pathname.split('/').pop() == 'form') {
        document.querySelectorAll('input').forEach(element => {
            element.addEventListener('keydown', event => {

                if (stored_keystrokes[event.target.name]) {
                    stored_keystrokes[event.target.name] += event.key;
                    console.log(stored_keystrokes);
                }
                else {
                    stored_keystrokes[event.target.name] = event.key;
                    console.log(stored_keystrokes);
                }
                var date = new Date();
                page_history[date.toString()] = "User is typing on Page " + window.location.pathname.split('/').pop() + ' in textbox: ' + event.target.name + ' -- ' + stored_keystrokes[event.target.name];    
            })
        });
    }

    //When unloading, send history data to the endpoint.
    window.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        
        // Chrome requires returnValue to be set.
        event.returnValue = '';
        
        //process data and prepare to send to the endpoint /collect
        var idletime = {};
        idletime['page'] = page;
        idletime['value'] = "In total:  " + idle_history * 2 + " seconds";
        var date = new Date();
        page_history[date.toString()] = "User is leaving from Page " + window.location.pathname.split('/').pop();
        var clickData = {};
        clickData["page"] = page;
        clickData["value"] = click_history;
        var mouseonData = {};
        mouseonData["page"] = page;
        mouseonData["value"] = mouseon_history;


        //fetch the data to endpoint
        Promise.all([
            fetch("https://us-central1-cse135-hw3-d14c9.cloudfunctions.net/collect?name=idle", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                // headers: {
                //   'Content-Type': 'application/json'
                //   // 'Content-Type': 'application/x-www-form-urlencoded',
                // },
                // redirect: 'follow', // manual, *follow, error
                // referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(idletime) // body data type must match "Content-Type" header
            }).then(res => {
                console.log("page idle info is sent " + res.status);
            }),
            fetch("https://us-central1-cse135-hw3-d14c9.cloudfunctions.net/collect?name=history", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                // headers: {
                //   'Content-Type': 'application/json'
                //   // 'Content-Type': 'application/x-www-form-urlencoded',
                // },
                // redirect: 'follow', // manual, *follow, error
                // referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(page_history) // body data type must match "Content-Type" header
            }).then(res => {
                console.log("page history is sent " + res.status);
            }),
            fetch("https://us-central1-cse135-hw3-d14c9.cloudfunctions.net/collect?name=click", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                // headers: {
                //   'Content-Type': 'application/json'
                //   // 'Content-Type': 'application/x-www-form-urlencoded',
                // },
                // redirect: 'follow', // manual, *follow, error
                // referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(clickData) // body data type must match "Content-Type" header
            }).then(res => {
                console.log("page click info is sent " + res.status);
            }),
            fetch("https://us-central1-cse135-hw3-d14c9.cloudfunctions.net/collect?name=mouseon", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                // headers: {
                //   'Content-Type': 'application/json'
                //   // 'Content-Type': 'application/x-www-form-urlencoded',
                // },
                // redirect: 'follow', // manual, *follow, error
                // referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(mouseonData) // body data type must match "Content-Type" header
            }).then(res => {
                console.log("page mouseon info is sent " + res.status);
            })
        ])       

    });

    //Idle Time
    window.addEventListener('mousemove', idleHandler);
    window.addEventListener('click', idleHandler);
    window.addEventListener('mouseup', idleHandler);
    window.addEventListener('mousedown', idleHandler);
    window.addEventListener('keydown', idleHandler);
    window.addEventListener('keypress', idleHandler);
    window.addEventListener('keyup', idleHandler);
    window.addEventListener('change', idleHandler);
    window.addEventListener('scroll', idleHandler);
    window.addEventListener('resize', idleHandler);
    window.addEventListener('submit', idleHandler);
    window.addEventListener('mouseenter', idleHandler);
    var timer = null;
    function idleHandler() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function (t) {
            idle_history++;
            var date = new Date();
            page_history[date.toString()] = "User has been idle on Page " + window.location.pathname.split('/').pop() + ' for 2 seconds.';
        }, 2000);
    }

}


//Different event handler and save the value in local temporarily
function clickHandler(event) {
    click_history.push(event.target.id);
    var date = new Date();
    page_history[date.toString()] = 'User clicked button ' + event.target.id;
}


function mouseOnHandler(event) {
    mouseon_history.push(event.target.id);
    var date = new Date();
    page_history[date.toString()] = "User mouse on " + event.target.id;
}


function scrollHandler(event) {
    var date = new Date();
    page_history[date.toString()] = "User scroll on Page " + window.location.pathname.split('/').pop();
    window.removeEventListener('scroll', scrollHandler);
}

