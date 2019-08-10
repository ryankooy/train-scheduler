// firebase, moment.js
// display the next arrival times and minutes-away for all trains
// add user inputs into array and display them in table
// push items to firebase

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

    // var database = firebase.database();

    var trains = {
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
    };

    var tArray = [];

    var start = "";
    var train = "";
    var d = "";
    var nextArrival;
    var minutesToHere;

    function tAdd() {

        for (var i = 0; i < tArray.length; i++) {

            train = tArray[i].name;
            start = tArray[i].start;
            d = tArray[i].dest;
            var firstTime = moment(start, 'HH:mm').subtract(1, 'years');
            var difference = moment().diff(moment(firstTime), 'minutes');
            var frequency = tArray[i].freq;
            var rem = difference % frequency;
            minutesToHere = parseInt(frequency - rem);
            nextArrival = moment().add(minutesToHere, 'minutes').format('HH:mm');
            console.log(nextArrival);

            $('.train').text(train);
            $('.dest').text(d);
            $('.freq').text(frequency);
            $('.next').text(nextArrival);
            $('.min-away').text(minutesToHere);

        }

    }

    tAdd();

    // database.ref().set({
    //     arrivalTime: nextArrival,
    //     minutesAway: minutesToHere
    // });

    // database.ref().on('value', function(snapshot) {
    //     nextArrival = snapshot.val().arrivalTime;
    //     minutesToHere = parseInt(snapshot.val().minutesAway);
    // }, function(errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    // });

});