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

      firebase.auth().signInWithEmailAndPassword(userid,userpw).then(function(){
        // pagemove('manageinst.html');
        console.log(user)
      }).catch(function(error) {
        Swal.fire({
          title: 'Error!',
          text: '아이디와 비밀번호를 확인해 주세요',
          type: 'error',
          confirmButtonText: 'OK'
        });
      });
    }else {

    }

  })
}

function setFirebase(){
  var user = firebase.auth().currentUser;

  if (user) {
    console.log(user)
    // pagemove('manageinst.html');
  } else {
    console.log('no signed user')
  }


}


function validationCheck(userid, userpw){
  if (userid == ''){
    Swal.fire({
      title: 'Error!',
      text: '아이디를 입력해주세요',
      type: 'error',
      confirmButtonText: 'OK'
    });
    return false;
  }
  if (userpw == '') {
    Swal.fire({
      title: 'Error!',
      text: '비밀번호를 입력해주세요',
      type: 'error',
      confirmButtonText: 'OK'
    });
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
