var db;
$(document).ready(function(){
  $('.parallax').parallax({
  });
  hideMainloader();
  setFirebase();
  setInterface();
});
function setInterface(){
  $('#pagehead').load('admin-pagetop.html');
  $('#login-btn').click(function(){
    var userid = $('#userid').val().trim();
    var userpw = $('#userpw').val().trim();

    if (  validationCheck(userid, userpw) ){
      showMainloader();
      firebase.auth().signInWithEmailAndPassword(userid,userpw).then(function(){
        console.log('들어오나');
         hideMainloader();
         setFirebase();
      }).catch(function(error) {
        hideMainloader();
        fireswal('ERROR!', '아이디와 비밀번호를 다시 확인해 주세요.','error','OK')
        console.log(error)
      });
    }else {
        showMainloader();
        fireswal('ERROR!', 'fail to validation check','error','OK')

    }

  })
}

function fireswal(title,text,type,confirmButtonText){
  Swal.fire({
    title: title,
    text: text,
    type: type,
    confirmButtonText: confirmButtonText
  });
}

function setFirebase(){

  var user = firebase.auth().currentUser;
 hideMainloader();
  if (user) {
    // setUserToFirebase(user)
    getUserAuth(user);
    console.log(user)
    // pagemove('manageinst.html');
  } else {
    console.log('no signed user')
  }


}

function getUserAuth(user){
  
}

function setUserToFirebase(user){
  db = firebase.firestore();
  dbRef = db.collection("users").doc('admin');
  dbRef.set({
    uid: user.uid,
    email: user.email,
    auth: 'admin'
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

function validationCheck(userid, userpw){
  if (userid == ''){
    fireswal('Error!','아이디를 입력해주세요','error','OK');
    return false;
  }
  if (userpw == '') {
    fireswal('Error!','비밀번호를 입력해주세요','error','OK')
    return false;}
    return true;
  }


  var pagemove = function(target) {
    var pagePath = $(location).attr("pathname");

    var path

    if (pagePath == '/index.html' || pagePath =='/') {
      path = 'pages/' + target
    } else {
      path = target
    }
    window.location = path;

  }

  function showMainloader(){
    $('.main-loader').show();
  }
  function hideMainloader(){
    $('.main-loader').hide();
  }
