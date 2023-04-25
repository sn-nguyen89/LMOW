var items;

$(document).ready(
  // call the function to load inventory data into the table
  showInventory()
);

$(document).on('click', '.edit', function () {
  $(this).parent().siblings('td.data').each(function () {
      //Grab the input value entered by user
    var content = $(this).html();
    $(this).html('<input value="' + content + '" />');
  });

  //Hide the edit button
  $(this).siblings('.save').show();
  $(this).siblings('.delete').hide();
  $(this).hide();
});

$(document).on('click', '.save', function () {
  var string = "";
  $('input').each(function () {
    var content = $(this).val();
    string += content + ",";
    $(this).html(content)
    $(this).contents().unwrap();
  });
  $(this).siblings('.edit').show();
  $(this).siblings('.delete').show();
  $(this).hide();
  let array = string.split(",");
  // Update the db with the current values
  updateInventory(array)
});


$(document).on('click', '.delete', function () {
  var string = "";
  $(this).parent().siblings('td.data').each(function () {
    var content = $(this).html();
    string += content + ",";
  });
  let array = string.split(",");
  // delete the the current record from db
  deleteInventory(array[0])
  $(this).parents('tr').remove();

});

$('.add').click(function () {

  // add a new wmpty row to the table
  $(this).parents('table').append('<tr><td class="data"></td><td class="data"></td><td class="data"></td><td><button hidden class="save admin-btn">Save</button><button hidden class="edit admin-btn ">Edit</button> <button hidden class="delete admin-btn">Delete</button></td></tr>');
  showButtons()
});

// Function to show the edit and delete buttons for admins
function showButtons() {
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
    }
  });
}
}

// Add the records to table loaded from db
async function showInventory() {
  items = await getdata();
  for (let i = 0; i < items.length; i++) {
    $('#invtable tr:last').after('<tr><td class="data">' + items[i].name + '</td><td class="data">' + items[i].qty + '</td><td class="data">' + items[i].date + '</td><td><button hidden class="save admin-btn">Save</button><button hidden class="edit admin-btn ">Edit</button> <button hidden class="delete admin-btn">Delete</button></td></tr>');
  }
  showButtons()
}

// Get the frozen food inventory data from db
function getdata() {
  let items = []
  return new Promise(function (res, rej) {
    db.collection("items")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let item = {
            "name": doc.data().name,
            "qty": doc.data().qty,
            "date": doc.data().date
          }
          items.push(item)
        });
        res(items)
      })
  })
}

// function to update inventory
function updateInventory(item) {
  db.collection("items").where("name", "==", item[0])  // get the current record based on the item
    .get()
    .then((querySnapshot) => {

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {

          doc.ref.set({   // update the db with the new data
            name: item[0],
            qty: item[1],
            date: item[2]
          })

        });
      } else {
        db.collection("items").doc().set({
          name: item[0],
          qty: item[1],
          date: item[2]
        })
      }
    })

}

// function to delele an inventory item
function deleteInventory(item) {

  db.collection("items").where("name", "==", item)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    })
}