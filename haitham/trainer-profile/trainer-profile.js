let trainerData;
let id;
let trainerDataKey = "trainerData";

document.addEventListener("DOMContentLoaded", function () {
  // Load mock data to local storage
  LocalStorageMockData();

  // Load data from local storage
  ShowTrainerData();
});

function ShowTrainerData() {
  // Get currently logged in trainer id
  id = GetCurrentlyLoggedInId();
  // Get trainer data
  trainerData = LoadTrainerData(id);
  console.log(trainerData.trainerImage);
  // Set the data to the html elements
  document.getElementById("trainerImage").src = trainerData.trainerImage;
  document.getElementById("trainerFirstName").value =
    trainerData.trainerFirstName;
  document.getElementById("trainerLastName").value =
    trainerData.trainerLastName;
  document.getElementById("trainerEmail").value = trainerData.trainerEmail;
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
  let image = trainerData.image;

  // Save the data to local storage
  localStorage.setItem(
    `trainerData-${id}`,
    JSON.stringify({
      trainerFirstName: document.getElementById("trainerFirstName").value,
      trainerLastName: document.getElementById("trainerLastName").value,
      trainerEmail: document.getElementById("trainerEmail").value,
      trainerPassword: document.getElementById("trainerPassword").value,
      image: image,
      isLoggedIn: "true",
    })
  );

  // Save the data to local storage
  localStorage.setItem(
    `trainerFirstName-${id}`,
    document.getElementById("trainerFirstName").value
  );
  localStorage.setItem(
    `trainerLastName-${id}`,
    document.getElementById("trainerLastName").value
  );
  localStorage.setItem(
    `trainerEmail-${id}`,
    document.getElementById("trainerEmail").value
  );
  localStorage.setItem(
    `trainerPassword-${id}`,
    document.getElementById("trainerPassword").value
  );
}

function LoadTrainerData(id) {
  // Get the data from local storage
  let getData = JSON.parse(localStorage.getItem(`trainerData-${id}`));

  return getData;
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

function LocalStorageMockData() {
  localStorage.clear();

  localStorage.setItem(
    "trainerData-1",
    JSON.stringify({
      trainerFirstName: "Haitham",
      trainerLastName: "Alrawi",
      trainerEmail: "haitham.alrawi19@gmail.com",
      trainerPassword: "123456789",
      trainerImage:
        "https://edtech4beginnerscom.files.wordpress.com/2021/05/1.png",
      isLoggedIn: "false",
    })
  );

  localStorage.setItem(
    "trainerData-2",
    JSON.stringify({
      trainerFirstName: "Haitham",
      trainerLastName: "Alrawi",
      trainerEmail: "haitham.alrawi19@gmail.com",
      trainerPassword: "123456789",
      trainerImage:
        "https://edtech4beginnerscom.files.wordpress.com/2021/05/1.png",
      isLoggedIn: "false",
    })
  );

  localStorage.setItem(
    "trainerData-3",
    JSON.stringify({
      trainerFirstName: "Haitham",
      trainerLastName: "Alrawi",
      trainerEmail: "haitham.alrawi19@gmail.com",
      trainerPassword: "123456789",
      trainerImage:
        "https://edtech4beginnerscom.files.wordpress.com/2021/05/1.png",
      isLoggedIn: "true",
    })
  );

  localStorage.setItem(
    "trainerData-4",
    JSON.stringify({
      trainerFirstName: "Haitham",
      trainerLastName: "Alrawi",
      trainerEmail: "haitham.alrawi19@gmail.com",
      trainerPassword: "123456789",
      trainerImage:
        "https://edtech4beginnerscom.files.wordpress.com/2021/05/1.png",
      isLoggedIn: "false",
    })
  );

  localStorage.setItem(
    "trainerData-5",
    JSON.stringify({
      trainerFirstName: "Haitham",
      trainerLastName: "Alrawi",
      trainerEmail: "haitham.alrawi19@gmail.com",
      trainerPassword: "123456789",
      trainerImage:
        "https://edtech4beginnerscom.files.wordpress.com/2021/05/1.png",
      isLoggedIn: "false",
    })
  );
}
