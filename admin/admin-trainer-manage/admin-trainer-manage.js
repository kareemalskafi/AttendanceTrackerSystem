let trainerData;

document.addEventListener("DOMContentLoaded", function () {
  // Load data from local storage
  ShowTrainerData();
});

function ShowTrainerData() {
  // get student table
  let nextRow = document.getElementById("table");

  // Load student data from local storage
  trainerData = LoadTrainerData();

  for (trainer of trainerData) {
    nextRow.innerHTML += `
  <tr>
  <td>${trainer.firstName} ${trainer.lastName}</td>
  <td>${trainer.email}</td>
  </tr>
    `;
  }
}

function LoadTrainerData() {
  // Get the data from local storage
  let getTrainerData = JSON.parse(localStorage.getItem("userArray")) || [];

  return getTrainerData;
}

// Add the following JavaScript code to your existing admin-trainer-manage.js file

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function addTrainer() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Create a new entry object
  const newTrainer = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    loginActive: false,
    password: password,
    isDeleted: false,
    isAdmin: false,
  };

  // Retrieve existing entries from local storage
  let usersArray = JSON.parse(localStorage.getItem("userArray")) || [];

  // Add the new entry to the array
  usersArray.push(newTrainer);

  // Update the local storage
  localStorage.setItem("userArray", JSON.stringify(usersArray));

  // Close the modal
  closeModal();

  // You may want to reload the table to reflect the changes
  // For simplicity, you can reload the entire page
  location.reload();
}
