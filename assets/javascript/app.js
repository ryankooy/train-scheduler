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

    database.ref().set({
        arrivalTime: nextArrival,
        minutesAway: minutesToHere
    });

    database.ref().get(function(snapshot) {
        
    });

});