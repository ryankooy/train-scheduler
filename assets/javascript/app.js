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
    var date;

    function update() {
        date = moment(new Date());
        $('h2').text(date.format('HH:mm:ss'));
    }

    $('h2').addClass('time');
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
        var startConv = moment(start, 'HH:mm').subtract(1, 'years');
        var difference = moment().diff(moment(startConv), 'minutes');
        var rem = difference % freq;
        var minutesToHere = freq - rem;
        var nextArrival = moment().add(minutesToHere, 'minutes').format('HH:mm');
        var xButton = $('<button>').addClass('x-out');
        xButton.text('x');

        var newRow = $('<tr>').append(
            $('<td>').text(train),
            $('<td>').text(dest),
            $('<td>').text(freq),
            $('<td>').text(nextArrival),
            $('<td>').text(minutesToHere)
        );

        $('.t-list > tbody').append(newRow);
        newRow.append(xButton);

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $('.x-out').on('click', function() {
        $(this).remove('<tr>');
    });

});