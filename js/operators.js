




firebase.database().ref('helprequests/').on('value', function (snapshot) {
    var req = 0;
    snapshot.forEach(function (childSnapshot) {
        var status = childSnapshot.child('state').val().toString();
        if(status=='pending'){
            req++;
            updateLabelreq(req)
        }

    });
    if(req==0){
        updateLabelreq(0)
    }


});




function updateLabelreq(req){
    //alert(''+count)
    $('#myBadgeReq').text(req)
}







