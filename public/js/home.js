$(document).ready(
   hideErrorImages(),
  getId()

);

function getId() {
  var id = JSON.parse(sessionStorage.getItem('user_auth'));
  if(id){
  db.collection("users").doc(id).get().then(function (doc) {
    //pulling data from firestore
    var privilege = doc.data().privilege;

    const admin_btn = document.querySelectorAll('.admin-btn');
    if (privilege == "admin") {
      admin_btn.forEach(btn => {
        btn.removeAttribute("hidden");
      });
    };

  });
}
}

//function dynamically loads cards from database
async function loadNotifications() {
  return new Promise(function (res, rej) {
  var x = 0;
  db.collection("updates")
    .get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        var title = doc.data().title;
        var body = doc.data().body;
        var buttonpath = doc.data().buttonpath;
        var imagepath = doc.data().imagepath;
        var id = doc.data().id;
        //First entry needs active for notification carosal to work
        var active;
        var carousel_item;

        if (x == 0) {
          active = ' active'
        } else {
          active = ''
        }

        if (x % 2 == 0) {
          carousel_start = '<div class="carousel-item' + active + '">' + '<div class="cards-wrapper" id = wrapper' + x + '>'
          carousel_end = ''
        } else {
          carousel_start = ''
          carousel_end = '</div></div>'
        }
        // add new card to the carousel
        var codestring =
          carousel_start +
          '<div class="card customcard overflow-auto shadow p-3 mb-5 bg-white rounded">' +
          '<h4 class="card-title text-center text-uppercase">' + title + '</h4>' +
          '<div class="card-body d-flex flex-column">' +
          '<p class="card-text">' + body + '</p>' +
          '<a href="' + imagepath + '" text-center ><img class="rounded mx-auto d-block" alt="Image" id = "hidden_image" hidden src="' + imagepath + '"></a>' +
          '<a href="' + buttonpath + '" class="mt-auto btn btn-primary btn-outline-new-orange" id = "hidden_button">More Information</a>' +
          '<button type="button" class="btn btn-danger admin-btn" id=' + id + ' hidden>Delete</button>' +
          '</div>' +
          '</div>' +
          carousel_end;

        if (x % 2 == 0) {
          $('.carousel-inner').append(codestring);
        } else {
          var j = x - 1
          $('#' + 'wrapper' + j).append(codestring);
        }
        x++;
        
      })
    }).then(function(){
      res(true)
    })
  })
}
// delete the card from db on clicking delete button
$(document).on('click', '.btn-danger', function () {
  db.collection("updates")
    .where('id', '==', this.id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        db.collection("updates").doc(doc.id).delete().then(() => {
          window.location.reload();
        });
      })
    })
});

// function to hide the image if there i no image on the card
async function hideErrorImages() {

  let check = await loadNotifications();
  
  if(check){
  document.getElementById("hidden_button").removeAttribute("hidden");
  document.getElementById("hidden_image").removeAttribute("hidden");
  }

}