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

    var now = moment();
    var start = "00:00";
    var startCCE = "06:00";
    var startCCT = "05:45";
    var startB = "20:00";
    var startTS = "04:30";
    var firstTime = moment(start, 'HH:mm').subtract(1, 'years');
    var diff = moment().diff(moment(firstTime), 'minutes');
    var freq = 0;
    var rem = diff % freq;
    var minutesToHere = freq - rem;
    var nextArrival = moment().add(minutesToHere, 'minutes');
    console.log(nextArrival);

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