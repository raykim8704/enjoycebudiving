
var db;
$(document).ready(function(){
  $('#pagehead').load('admin-pagetop.html',function(){
    setMenuInterface();
  });
  setUserStateObserver();

});

function setUserStateObserver(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('user signin');
      console.log(user)
      $('.user-email').text(user.email)

    } else {
      console.log('user signout');
      pagemove('../admin.html')
    }
  });
}


function checkCurrentUser(){

  var user = firebase.auth().currentUser;
  if (user) {
    console.log('user signed')
    console.log(user)

  } else {
    console.log('no signed user')
  }

}

function setMenuInterface(){
  $('.menu-logout').click(function(){
    console.log(' able to set signout')
    var signout = firebase.auth().signOut();

    signout.then(function(){
      console.log('signout!')
      // pagemove('../admin.html')
    },
    function(error){
      console.log('fail to signout',error)
    })
  });
  $('.menu-instructor').click(function(){
    $('#pagebody').load('instructor.html',function(){
      $('#add-instructor').click(function(){
        popup().then(fileupload);
      });
      $('.sidenav').sidenav('close');
    });
  });

  function fileupload(file){
    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'
    var mountainsRef = storageRef.child('test2.jpg');

    // Create a reference to 'images/mountains.jpg'
    var mountainImagesRef = storageRef.child('images/test2.jpg');

    mountainsRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });

  }

  async function popup(){
    const {value: file} = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })

    if (file) {
      const reader = new FileReader
      reader.onload = function(e){
        Swal.fire({
          title: 'Your uploaded picture',
          imageUrl: e.target.result,
          imageAlt: 'The uploaded picture'
        })
      }
      reader.readAsDataURL(file)
      return Promise.resolve(file)
    }
  }
  // $('.menu-instructor').click(function() {
  //   pagemove('instructor.html')
  // });
  // $('.menu-popup').click(function(){
  //   pagemove('fundive.html')
  // });
  // $('.menu-price').click(function(){
  //   pagemove('price.html')
  // });

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
