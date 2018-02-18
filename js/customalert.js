function onClickExplore(){
    var positionY = $('#explore').first().offset().top;
    $("html, body").animate({ scrollTop: positionY }, 500);
}

function onClickFindYourClass(){

    var user=firebase.auth().currentUser;
    if(user==null){
        console.log("User not logged")
        bootbox.confirm({
            message: '<center><img width=150 height=60 src="logo.png"><br><br><p>the user must be logged in</p></center>',
            buttons: {
                confirm: {
                    label: 'Login',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Dismiss',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                console.log('Callback: ' + result);
                if(result){
                    location.replace("Login.html");
                }
            }
        });

    }
    else{
        console.log(user);
        location.replace("Classes.html");

    }

}
function onClickFindPlaces(){

    var user=firebase.auth().currentUser;
    localStorage.setItem("otherplaces_clicked","otherplaces")

    if(user==null){
        console.log("User not logged")
        bootbox.confirm({
            message: '<center><img width=150 height=60 src="logo.png"><br><br><p>the user must be logged in</p></center>',
            buttons: {
                confirm: {
                    label: 'Login',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Dismiss',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                console.log('Callback: ' + result);
                if(result){
                    location.replace("LogIn.html");
                }
            }
        });

    }
    else{
        console.log(user);
        location.replace("OtherPlaces.html");

    }

}