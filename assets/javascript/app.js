// firebase, moment.js
// display the next arrival times and minutes-away for all trains





$(document).on('ready', function() {

    var firebaseConfig = {
        apiKey: "AIzaSyCTIAppQqJZCBIsN3ok1UXGejv11Nfgzy8",
        authDomain: "projectification-21972.firebaseapp.com",
        databaseURL: "https://projectification-21972.firebaseio.com",
        projectId: "projectification-21972",
        storageBucket: "",
        messagingSenderId: "649772529131",
        appId: "1:649772529131:web:f8d4cccaa5761d63"
    };

    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    var trains = [{
        CCE: {
            name: 'Choo Choo Express',
            dest: 'Stockholm',
            freq: 30,
            start: "06:00"
        },
        CCT: {
            name: 'Chugga Chugga Train',
            dest: 'Oslo',
            freq: 45,
            start: "05:45"
        },
        B: {
            name: 'Bob',
            dest: 'Gothenburg',
            freq: 1576800,
            start: "20:00"
        },
        TS: {
            name: 'Track Scorcher',
            dest: 'Copenhagen',
            freq: 20,
            start: "04:30"
        }
    }];

    var now = moment();
    var start = "00:00";
    var firstTime = moment(start, 'HH:mm').subtract(1, 'years');
    var diff = moment().diff(moment(firstTime), 'minutes');
    var freq = 0;
    var rem = diff % freq;
    var minutesToHere = freq - rem;
    var nextArrival = moment().add(minutesToHere, 'minutes');
    console.log(nextArrival);

    for (var i = 0; i < trains.length; i++( {
        
    }

    database.ref().set({
        arrivalTime: nextArrival,
        minutesAway: minutesToHere
    });

    database.ref().on('value', function(snapshot) {
        nextArrival = snapshot.val().arrivalTime;
        minutesToHere = parseInt(snapshot.val().minutesAway);
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

});