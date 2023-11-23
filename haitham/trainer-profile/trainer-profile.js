let trainerData;
let id;
let trainerDataKey = "trainerData";

document.addEventListener("DOMContentLoaded", function () {
  // Load data from local storage
  ShowTrainerData();
});

function ShowTrainerData() {
  // Get currently logged in trainer id
  id = GetCurrentlyLoggedInId();
  // Get trainer data
  trainerData = LoadTrainerData();
  console.log(trainerData);
  // Set the data to the html elements
  document.getElementById("trainerImage").src = trainerData.trainerImage;
  document.getElementById("trainerFirstName").value = trainerData.firstName;
  document.getElementById("trainerLastName").value = trainerData.lastName;
  document.getElementById("trainerEmail").value = trainerData.email;
  document.getElementById("trainerPassword").value = trainerData.password;
}

function EnableEditing() {
  // Show the save button
  document.getElementById("saveButton").style.display = "block";

  // Hide the edit button
  document.getElementById("editButton").style.display = "none";

  // Show the password input field
  document.getElementById("passwordContainer").style.display = "block";

  // Remove readonly from the input fields
  document.getElementById("trainerFirstName").readOnly = false;
  document.getElementById("trainerLastName").readOnly = false;
  document.getElementById("trainerEmail").readOnly = false;
}

function SaveChanges() {
  // Show the edit button
  document.getElementById("editButton").style.display = "block";

  // Hide the save button
  document.getElementById("saveButton").style.display = "none";

  // Hide the password input field
  document.getElementById("passwordContainer").style.display = "none";

  // Add readonly to the input fields
  document.getElementById("trainerFirstName").readOnly = true;
  document.getElementById("trainerLastName").readOnly = true;
  document.getElementById("trainerEmail").readOnly = true;

  // Save the changes to the local storage
  SaveTrainerData();
}

function SaveTrainerData() {
  // Get all the users from local storage
  var allUsers = JSON.parse(localStorage.getItem("userArray")) || [];

  // Get the information from the input fields
  allUsers[0].firstName = document.getElementById("trainerFirstName").value;
  allUsers[0].lastName = document.getElementById("trainerLastName").value;
  allUsers[0].email = document.getElementById("trainerEmail").value;
  allUsers[0].password = document.getElementById("trainerPassword").value;

  // Save the data to local storage
  localStorage.setItem("userArray", JSON.stringify(allUsers));
}

function LoadTrainerData() {
  // Get the data from local storage
  let getTrainersData = JSON.parse(localStorage.getItem("userArray")) || [];
  let getTrainerData = getTrainersData[0];

  return getTrainerData;
}

function GetCurrentlyLoggedInId() {
  // Loop through all the trainers' isLoggedIn key in local storage till we find the one that is true
  for (let key in Object.keys(localStorage)) {
    // Get the key name
    let keyName = Object.keys(localStorage)[key].split("-")[0];
    // Check if the key name is trainerData
    if (keyName == trainerDataKey) {
      let getData = JSON.parse(
        localStorage.getItem(Object.keys(localStorage)[key])
      );
      if (getData.isLoggedIn == "true") {
        // Get the trainer id
        let id = Object.keys(localStorage)[key].split("-")[1];

        // Return the trainer id
        return id;
      }
    }
  }
}
