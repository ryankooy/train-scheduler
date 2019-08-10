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

    var start = "";
    var train = "";
    var dest = "";
    var freq = "";
    var nextArrival;
    var minutesToHere;
    var date;

    function update() {
        date = moment(new Date());
        $('h2').text(date.format('HH:mm:ss'));
    }

    update();
    setInterval(update, 1000);

    $('#add-train').on('click', function(event) {

        event.preventDefault();

        var trainI = $('#train-input').val().trim();
        var destI = $('#dest-input').val().trim();
        var firstI = $('#first-input').val().trim();
        var freqI = $('#freq-input').val().trim();

        var newTrain = {
            name: trainI,
            destination: destI,
            firstTime: firstI,
            frequency: freqI
        };

        database.ref().push(newTrain);

        $('#train-input').val('');
        $('#dest-input').val('');
        $('#first-input').val('');
        $('#freq-input').val('');

    });

    database.ref().on('child_added', function(snapshot) {

        train = snapshot.val().name;
        dest = snapshot.val().destination;
        start = snapshot.val().firstTime;
        freq = snapshot.val().frequency;
        var difference = moment().diff(start, 'minutes');
        var rem = difference % freq;
        minutesToHere = freq - rem;
        nextArrival = moment().add(minutesToHere).format('HH:mm');

        var newRow = $("<tr>").append(
            $("<td>").text(train),
            $("<td>").text(dest),
            $("<td>").text(freq),
            $("<td>").text(nextArrival),
            $("<td>").text(minutesToHere)
        );

        $('.t-list > tbody').append(newRow);

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

});