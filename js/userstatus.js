



var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
        firebase.auth().onAuthStateChanged(function(user){
            if(user && user.email.includes('operatore')){
                firebase.database().ref('operators/'+user.uid+'/status/').set('online')

            }
            setDailyCookie()

        })
    } else {
        firebase.auth().onAuthStateChanged(function(user){

           
            
            if(user && user.email.includes('operatore')){
                firebase.database().ref('operators/'+user.uid+'/status/').onDisconnect().set('offline')
            }


        })    
    }
});


function setDailyCookie(){
    //alert('cookie settato')
    var date = new Date()
    date.setDate(date.getDate() + 1);
    //Setting cookie
    document.cookie = "UniIndoors=ORACOLO; expires="+date+"; path=/";
}

