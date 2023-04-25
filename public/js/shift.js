var privilege;
$(document).ready(function () {
    // Gee the user id of current loggged in user
    var id = JSON.parse(sessionStorage.getItem('user_auth'));

    // Text info for the user if the suer is not logged in
    document.getElementById("drivers-text").innerHTML = 'Please log in to select shifts.';
    document.getElementById("sealers-text").innerHTML = 'Please log in to select shifts.';
    document.getElementById("packers-text").innerHTML = 'Please log in to select shifts.';
    document.getElementById("kitchen-helpers-text").innerHTML = 'Please log in to select shifts.';
    document.getElementById("office-support-text").innerHTML = 'Please log in to select shifts.';

    // Hide the tables for user's who are not logged in
    document.getElementById("drivers-table").style.display = 'none';
    document.getElementById("sealers-table").style.display = 'none';
    document.getElementById("packers-table").style.display = 'none';
    document.getElementById("kitchen-helpers-table").style.display = 'none';
    document.getElementById("office-support-table").style.display = 'none';


    
    if (id) {
        db.collection("users").doc(id).get().then(function (doc) {
            privilege = doc.data().privilege;
             console.log(privilege);

             if (privilege !="Guest" ){
                // Hide the text box if the user logs in and has privilege to access table
                document.getElementById("drivers-text").style.display = 'none';
                document.getElementById("sealers-text").style.display = 'none';
                document.getElementById("packers-text").style.display = 'none';
                document.getElementById("kitchen-helpers-text").style.display = 'none';
                document.getElementById("office-support-text").style.display = 'none';
        
        
                db.collection("users").doc(id).get().then(function (doc) {
                    //pulling data from firestore
                    var privilege = doc.data().privilege;
                    const download_btn = document.querySelectorAll('.clear');
                    // Display the clear table button for admins
                    download_btn.forEach(btn => {
                        if (privilege == "admin") {
                            btn.removeAttribute("hidden");
                        }
                    });
                });
        
                // Display the download button
                const download_btn = document.querySelectorAll('.download-btn');
                download_btn.forEach(btn => {
                    btn.removeAttribute("hidden");
                });
        
                // Update the driver shift table with data from db
                db.collection("drivers-table")
                    .get() //get whole collection
                    .then(function (snap) {
                        snap.forEach(function (doc) { //cycle thru each doc 
                            // do something with each document
                            var row = doc.data().row; //key "picture"
                            var column = doc.data().column;
                            var name = doc.data().name; //key "name"
                            $('#drivers-table' + ' tr:eq(' + row + ') td:eq(' + column + ')').text(name);
        
                        })
                    })
        
                // Update the packers shift table with data from db
                db.collection("packers-table")
                    .get() //get whole collection
                    .then(function (snap) {
                        snap.forEach(function (doc) { //cycle thru each doc 
                            // do something with each document
                            var row = doc.data().row; //key "picture"
                            var column = doc.data().column;
                            var name = doc.data().name; //key "name"
        
                            $('#packers-table' + ' tr:eq(' + row + ') td:eq(' + column + ')').text(name);
        
                        })
                    })
                
                // Update the sealers shift table with data from db
                db.collection("sealers-table")
                    .get() //get whole collection
                    .then(function (snap) {
                        snap.forEach(function (doc) { //cycle thru each doc 
                            // do something with each document
                            var row = doc.data().row; //key "picture"
                            var column = doc.data().column;
                            var name = doc.data().name; //key "name"
        
                            $('#sealers-table' + ' tr:eq(' + row + ') td:eq(' + column + ')').text(name);
        
                        })
                    })
        
                // Update the sealers shift table with data from db    
                db.collection("kitchen-helpers-table")
                    .get() //get whole collection
                    .then(function (snap) {
                        snap.forEach(function (doc) { //cycle thru each doc 
                            // do something with each document
                            var row = doc.data().row; //key "picture"
                            var column = doc.data().column;
                            var name = doc.data().name; //key "name"
        
                            $('#kitchen-helpers-table' + ' tr:eq(' + row + ') td:eq(' + column + ')').text(name);
        
                        })
                    })
        
                // Update the sealers shift table with data from db    
                db.collection("office-support-table")
                    .get() //get whole collection
                    .then(function (snap) {
                        snap.forEach(function (doc) { //cycle thru each doc 
                            // do something with each document
                            var row = doc.data().row; //key "picture"
                            var column = doc.data().column;
                            var name = doc.data().name; //key "name"
        
                            $('#office-support-table' + ' tr:eq(' + row + ') td:eq(' + column + ')').text(name);
        
                        })
                    })

                $('#drivers-table').show();
                $('#sealers-table').show();
                $('#packers-table').show();
                $('#kitchen-helpers-table').show();
                $('#office-support-table').show();
            } else {
                //Hide  the tables if the user  doesnt have the Voluteer or admin privelege
                document.getElementById("drivers-table").style.display = 'none';
                document.getElementById("sealers-table").style.display = 'none';
                document.getElementById("packers-table").style.display = 'none';
                document.getElementById("kitchen-helpers-table").style.display = 'none';
                document.getElementById("office-support-table").style.display = 'none';
        
                document.getElementById("drivers-text").innerHTML = 'Please wait for the admin to provide Voluteer access.';
                document.getElementById("sealers-text").innerHTML = 'Please wait for the admin to provide Voluteer access.';
                document.getElementById("packers-text").innerHTML = 'Please wait for the admin to provide Voluteer access.';
                document.getElementById("kitchen-helpers-text").innerHTML = 'Please wait for the admin to provide Voluteer access.';
                document.getElementById("office-support-text").innerHTML = 'Please wait for the admin to provide Voluteer access.';
            }
        });
       
    }
});

$(document).on('click', '.shiftButton', function (event) {
    // Alert for confirmation of shift
    swal.fire({
        title: "You are picking up this shift.",
        text: "Please Confirm",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonColor: "#FF0000",
        confirmButtonColor: "#008000",
        allowOutsideClick: false,
        confirmButtonText: 'Confirm'
    }).then(function (result) {
        if (result.isConfirmed) {

            // get the detials of the shift picked
            let row = event.target.parentNode.parentNode.rowIndex;
            let col = event.target.parentNode.cellIndex;
            let tableID = event.target.parentNode.parentNode.parentNode.parentNode.id;

            var username = JSON.parse(sessionStorage.getItem('user_name'));

            //Update the db for the shift picked by user
            console.log("Row :" + row +
                "Column :" + col + "Table ID:" + tableID);
            db.collection(tableID).doc().set({
                row: row,
                column: col,
                name: username
            }).then(function () {
                window.location.reload();
            })
        }
    })
})

// refresh The table based on the click event and clear db
async function refreshShiftTable(tableName) {
    //Alert for confirmation to clear
    swal.fire({
        title: "Are you sure to clear this table?",
        text: "Please Confirm",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonColor: "#FF0000",
        confirmButtonColor: "#008000",
        allowOutsideClick: false,
        confirmButtonText: 'Confirm'
    }).then(function (result) {
        console.log(tableName);

    // Clear the table whne the clear button is clicked
        db.collection(tableName)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            }).then(setTimeout(function () {
                window.location.reload();
            }, 1000));
    })

}