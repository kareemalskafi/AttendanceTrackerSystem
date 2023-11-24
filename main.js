//---------------------------------------------------------------------------------------------------------------//
//--------------------------------------------   Login   --------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------//

const loginUser = () => {
  var loginEmail = document.getElementById("loginEmail").value;
  var loginPassword = document.getElementById("loginPassword").value;
  var existingUsers = JSON.parse(localStorage.getItem("userArray")) || [];
  var userLoggingIn = existingUsers.find((user) => {
    return user.email === loginEmail && user.password === loginPassword;
  });

  if (userLoggingIn) {
    userLoggingIn.loginactive = true;
    localStorage.setItem("userArray", JSON.stringify(existingUsers));
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password. Please try again.");
  }
};

//---------------------------------------------------------------------------------------------------------------//
//--------------------------------------------   Register  ------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------//

const registerUser = () => {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var loginactive = false;

  var user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    loginactive: loginactive,
  };

  var existingUsers = JSON.parse(localStorage.getItem("userArray")) || [];
  var isEmailTaken = existingUsers.some((user) => {
    return user.email === email;
  });

  if (!isEmailTaken) {
    existingUsers.push(user);
    localStorage.setItem("userArray", JSON.stringify(existingUsers));
    alert("Registration successful!");
    window.location.href = "login.html";
  } else {
    alert("Email is already registered. Please use a different email.");
  }
};

//---------------------------------------------------------------------------------------------------------------//
//--------------------------------------------   Modal  News  ---------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------//

// Get the modal and the button that opens it
const modal = document.getElementById("myModalNews");
const btn = document.getElementById("openModalBtnNews");
const closeBtn = document.getElementsByClassName("close")[0];

// Open the modal when the button is clicked
btn.onclick = function () {
  modal.style.display = "block";
};

// Close the modal when the close button is clicked
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Close the modal when clicking outside the modal content
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

//---------------------------------------------------------------------------------------------------------------//
//--------------------------------------------  Fetch  news.json  -----------------------------------------------//
//---------------------------------------------------------------------------------------------------------------//

fetch("news.json")
  .then((response) => response.json())
  .then((data) => {
    const slider = document.getElementById("slider");

    // Iterate through each news in the JSON data
    data.forEach((news) => {
      // Create a slide element
      const slide = document.createElement("div");
      slide.classList.add("slide");

      // Create image element
      const imageElement = document.createElement("img");
      imageElement.src = news.image;
      imageElement.alt = news.contant; // Set alt text for accessibility
      imageElement.style.margin = "30px";
      // Create elements for title, url, and contant

      const titleElement = document.createElement("h4");
      titleElement.textContent = news.title;
      titleElement.style.margin = "30px";

      const contantElement = document.createElement("h5");
      contantElement.textContent = news.contant;
      contantElement.style.margin = "30px";

      // Append elements to the slide
      slide.appendChild(imageElement);
      slide.appendChild(titleElement);
      slide.appendChild(contantElement);

      // Append the slide to the slider container
      slider.appendChild(slide);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

//---------------------------------------------------------------------------------------------------------------//
//--------------------------------------------  Trainees Form  --------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------//

var totalTask = 20;
// Function to show student input
function showStudentInput() {
  // Get the student input div
  var student = document.getElementById("addNewStudent");
  // Toggle the display property
  student.style.display = student.style.display === "none" ? "block" : "none";
  document.getElementById("addNewTask").style.display = "none";
  document.getElementById("addNewFeedback").style.display = "none";
}

// Function to show task input
function showTaskInput() {
  // Get the task input div
  var task = document.getElementById("addNewTask");
  // Toggle the display property
  task.style.display = task.style.display === "none" ? "block" : "none";
  document.getElementById("addNewStudent").style.display = "none";
  document.getElementById("addNewFeedback").style.display = "none";
}

// Function to show feedback input
function showFeedbackInput() {
  // Get the feedback input div
  var feedback = document.getElementById("addNewFeedback");
  // Toggle the display property
  feedback.style.display = feedback.style.display === "none" ? "block" : "none";
  document.getElementById("addNewStudent").style.display = "none";
  document.getElementById("addNewTask").style.display = "none";
}

// Function to add a new row to the table
// Function to add a row to the table
function addRowToTable(allData) {
  // Get the table and its body
  var table = document
    .getElementById("traineesTable")
    .getElementsByTagName("tbody")[0];
  // Insert a new row
  var newRow = table.insertRow(table.rows.length);
  // Insert cells into the new row
  var idCell = newRow.insertCell(0);
  var nameCell = newRow.insertCell(1);
  var solvedTasksCell = newRow.insertCell(2);
  var counterS_task = newRow.insertCell(3); // counter for solved task
  var totalTaskCell = newRow.insertCell(4);
  var numberOfAbsenceCell = newRow.insertCell(5);
  var counterAbsent = newRow.insertCell(6); // counter of absence student
  var removeCell = newRow.insertCell(7); // button for removing row
  // Populate cells with values
  idCell.innerHTML = allData.studentID;
  nameCell.innerHTML = allData.studentName;
  solvedTasksCell.innerHTML = allData.solvedTasks || 0;
  counterS_task.innerHTML =
    '<button class="button scrolly" onclick="counterS_task(this)"> (+)</button>';
  totalTaskCell.innerHTML = allData.studentTasks[allData.studentID];
  numberOfAbsenceCell.innerHTML = allData.absence || allData.absent;
  counterAbsent.innerHTML =
    '<button class="button scrolly" onclick="counterAbsent(this)"> (+)</button>';
  removeCell.innerHTML =
    '<button class="button scrolly" onclick="removeRow(this)" id="btnR">Remove</button>';
  populateStudentDropdown();
}

// Function to add data to the table and local storage
// Function to add a row to the table
function addRowToTable(allData) {
  // Get the table and its body
  var table = document
    .getElementById("traineesTable")
    .getElementsByTagName("tbody")[0];
  // Insert a new row
  var newRow = table.insertRow(table.rows.length);
  // Insert cells into the new row
  var idCell = newRow.insertCell(0);
  var nameCell = newRow.insertCell(1);
  var solvedTasksCell = newRow.insertCell(2);
  var counterS_task = newRow.insertCell(3); // counter for solved task
  var totalTaskCell = newRow.insertCell(4);
  var numberOfAbsenceCell = newRow.insertCell(5);
  var counterAbsent = newRow.insertCell(6); // counter of absence student
  var removeCell = newRow.insertCell(7); // button for removing row
  // Populate cells with values
  idCell.innerHTML = allData.studentID;
  nameCell.innerHTML = allData.studentName;
  solvedTasksCell.innerHTML = allData.solvedTasks || 0;
  counterS_task.innerHTML =
    '<button class="button scrolly" onclick="counterS_task(this)" >(+)</button>';
  totalTaskCell.innerHTML = allData.studentTasks[allData.studentID];
  numberOfAbsenceCell.innerHTML = allData.absence || allData.absent;
  counterAbsent.innerHTML =
    '<button class="button scrolly" onclick="counterAbsent(this)" >(+)</button>';
  removeCell.innerHTML =
    '<button class="button scrolly" onclick="removeRow(this)" id="btnR">Remove</button>';
  populateStudentDropdown();
}

// Function to add data to the table and local storage
function AddtoTable() {
  var storedData = localStorage.getItem("allData");
  var allDataArray = storedData ? JSON.parse(storedData) : [];
  // Parse the existing data or initialize an empty array
  var studentTasks = {};
  var newStudent = false;
  // Get input values
  var newDataRow = {
    studentName: document.getElementById("studentName").value,
    studentID: document.getElementById("studentID").value,
    taskValue: document.getElementById("s_task").value,
    absent: document.getElementById("absent").value,
    studentTasks: studentTasks,
  };

  // Check if the student ID is already in the object
  if (newDataRow.studentTasks[newDataRow.studentID]) {
    // Update the tasks array for the existing student
    newDataRow.studentTasks[newDataRow.studentID] +=
      parseInt(newDataRow.taskValue) + totalTask;
  } else {
    // Create a new tasks array for the student
    newDataRow.studentTasks[newDataRow.studentID] =
      parseInt(newDataRow.taskValue) + totalTask;
    newStudent = true;
  }

  if (newStudent) {
    addRowToTable(newDataRow);
    allDataArray.push(newDataRow); // Add the new row to the array
  }

  localStorage.setItem("allData", JSON.stringify(allDataArray));
  alert("These data are saved in local storage");
  populateStudentDropdown();
}

// Function to retrieve data from local storage and populate the table on page load
function retriveDataTableLS() {
  var storedData = localStorage.getItem("allData");
  if (storedData) {
    var parsedData = JSON.parse(storedData);
    parsedData.forEach(function (data) {
      addRowToTable(data);
    });
  }
  populateStudentDropdown();
}

// Function to increment the absence counter
function counterAbsent(button) {
  // Get the row of the clicked button
  var row = button.parentNode.parentNode;
  // Get the cell containing the absence number
  var counterAbsentCell = row.cells[5];
  // Get the current number of absense
  var currentCount = parseInt(counterAbsentCell.innerText);
  // Increment the count
  currentCount++;
  // Update the cell with the new count
  counterAbsentCell.innerText = currentCount;
  var studentID = row.cells[0].innerText;
  // Update the value in localStorage
  updateLocalStorage(studentID, "absence", currentCount.toString());
}

// Function to increment the solved tasks counter
function counterS_task(button) {
  // Get the row of the clicked button
  var row = button.parentNode.parentNode;
  // Get the cell containing the solved tasks counter
  var counterS_taskCell = row.cells[2];
  // Get the current count
  var currentCount = parseInt(counterS_taskCell.innerText);
  // Increment the count
  currentCount++;
  // Update the cell with the new count
  counterS_taskCell.innerText = currentCount;
  // Get the student ID from the row (assuming it's in the first cell)
  var studentID = row.cells[0].innerText;
  // Update the value in localStorage
  updateLocalStorage(studentID, "solvedTasks", currentCount.toString());
}

// Function to remove a row
// Function to remove a row and its associated data from localStorage
function removeRow(button) {
  // Get the row of the clicked button
  var row = button.parentNode.parentNode;
  // Get the student ID from the row (assuming it's in the first cell)
  var studentID = row.cells[0].innerText;
  // Remove the row from its parent (the table body)
  row.parentNode.removeChild(row);
  // Remove the corresponding data from localStorage
  var storedData = localStorage.getItem("allData");
  if (storedData) {
    var parsedData = JSON.parse(storedData);
    // Find the index of the data with the matching student ID
    var dataIndex = parsedData.findIndex(function (data) {
      return data.studentID === studentID;
    });

    if (dataIndex !== -1) {
      parsedData.splice(dataIndex, 1); // Remove the data entry
      localStorage.setItem("allData", JSON.stringify(parsedData)); 
    }
  }
  populateStudentDropdown();
}

// Function to update total tasks for all rows
function updateAllTasks() {
  // Get the table body
  var tableBody = document
    .getElementById("traineesTable")
    .getElementsByTagName("tbody")[0];
  // Get all rows in the table body
  var rows = tableBody.getElementsByTagName("tr");
  // Get the new task input value
  var newTask = document.getElementById("newTaskInput").value;
  // Loop through each row
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    // Get the total task cell for the current row
    var totalTaskCell = row.cells[4];
    // Update the total task based on the new task input
    var currentTotalTasks = parseInt(totalTaskCell.innerText) || 0;
    var updatedTotalTasks = currentTotalTasks + parseInt(newTask);
    // Update the total task cell with the new value
    totalTaskCell.innerText = updatedTotalTasks;
  }
}

// Function to update the localStorage data
function updateLocalStorage(studentID, key, value) {
  var storedData = localStorage.getItem("allData");
  if (storedData) {
    var parsedData = JSON.parse(storedData);
    // Find the student data by ID
    var studentData = parsedData.find(function (data) {
      return data.studentID === studentID;
    });
    // Update the specific key in the student's data
    if (studentData) {
      studentData[key] = value;
      localStorage.setItem("allData", JSON.stringify(parsedData));
    }
  }
}

function addFeedback() {
  var studentName = document.getElementById("studentDropdown").value;
  var feedbackText = document.getElementById("Feedback").value;
  var currentDate = new Date().toLocaleDateString();
  var feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];
  var userArray = localStorage.getItem("userArray");
  if (userArray) {
    var convertData = JSON.parse(userArray);
    var loggedInTrainer = convertData.find((user) => {
      return user.loginactive === true;
    });
  }
  if (loggedInTrainer) {
    var FirstName = loggedInTrainer.firstName;
    var LastName = loggedInTrainer.lastName;
  }
  var fullName = FirstName + " " + LastName;

  feedbackData.push({
    student: studentName,
    trainer: fullName,
    feedback: feedbackText,
    date: currentDate,
  });

  localStorage.setItem("feedbackData", JSON.stringify(feedbackData));
  // Optional: You can redirect to the Feedback page after saving feedback
  updateFeedbackTable();
  alert("feedback added sucssefully :)");
}

// Function to update the feedback table
function updateFeedbackTable() {
  var feedbackTable = document
    .getElementById("feedbackTable")
    .getElementsByTagName("tbody")[0];
  var feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];
  feedbackTable.innerHTML = "";
  feedbackData.forEach(function (entry) {
    var newRow = feedbackTable.insertRow(feedbackTable.rows.length);
    var studentCell = newRow.insertCell(0);
    var trainerCell = newRow.insertCell(1);
    var feedbackCell = newRow.insertCell(2);
    var dateCell = newRow.insertCell(3);

    studentCell.innerHTML = entry.student;
    trainerCell.innerHTML = entry.trainer;
    feedbackCell.innerHTML = entry.feedback;
    dateCell.innerHTML = entry.date;
  });
}

// Function to populate the student dropdown with options from localStorage
function populateStudentDropdown() {
  var storedData = localStorage.getItem("allData");
  if (storedData) {
    var parsedData = JSON.parse(storedData);
    var dropdown = document.getElementById("studentDropdown");
    // Clear existing options
    dropdown.innerHTML = "";
    // Add options based on the student names from localStorage
    parsedData.forEach(function (data) {
      var option = document.createElement("option");
      option.value = data.studentName;
      option.textContent = data.studentName;
      dropdown.appendChild(option);
    });
  }
}
// Call this function to update the table when the page loads
window.onload = function () {
  populateStudentDropdown();
  retriveDataTableLS();
  updateFeedbackTable();
};

//---------------------------------------------------------------------------------------------------------------//
//--------------------------------------------  Note  -----------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------//

// Function to retrieve tasks from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// Function to display tasks on the web page
function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const tasks = getTasks();
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(index));
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.addEventListener("click", () => deleteTask(index)); 

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteIcon); 
    taskList.appendChild(listItem);
  });
}

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();
  if (text !== "") {
    const tasks = getTasks();
    const newTask = { text: text, completed: false };
    tasks.push(newTask);
    saveTasks(tasks);
    taskInput.value = "";
  }
}

// Function to toggle task completion
function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
}

// Function to filter tasks based on completion status
function filterTasks() {
  const filterSelect = document.getElementById("filterSelect");
  const filterValue = filterSelect.value;
  const tasks = getTasks();
  let filteredTasks = [];

  if (filterValue === "complete") {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (filterValue === "incomplete") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else {
    filteredTasks = tasks;
  }
  displayFilteredTasks(filteredTasks);
}

// Function to display filtered tasks
function displayFilteredTasks(filteredTasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(index));
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.addEventListener("click", () => deleteTask(index));

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteIcon);
    taskList.appendChild(listItem);
  });
}

// Function to delete a task
function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  displayTasks();
}

//---------------------------------------------------------------------------------------------------------------//
//--------------------------------------------  Trainer Form  ---------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------//

// Function to populate form fields with logged-in user data
function displayLoggedInUserData() {
  var loggedInUser = existingUsers.find(function (user) {
    return user.loginactive === true;
  });

  if (loggedInUser) {
    document.getElementById("trainerFirstName").value = loggedInUser.firstName;
    document.getElementById("trainerLastName").value = loggedInUser.lastName;
    document.getElementById("trainerEmail").value = loggedInUser.email;
    document.getElementById("trainerPassword").value = loggedInUser.password;
  }
}

// Function to enable editing of form fields
function enableEditing() {
  // Show the save button
  document.getElementById("saveButton").style.display = "table-column";
  // Hide the edit button
  document.getElementById("editButton").style.display = "none";
  // Show the password input field
  document.getElementById("passwordContainer").style.display = "block";
  // Remove readonly from the input fields
  document.getElementById("trainerFirstName").readOnly = false;
  document.getElementById("trainerLastName").readOnly = false;
  document.getElementById("trainerEmail").readOnly = false;
  document.getElementById("trainerPassword").readOnly = false;
}

// Function to save changes to localStorage
function saveChanges() {
  // Show the edit button
  document.getElementById("editButton").style.display = "table-column";
  // Hide the save button
  document.getElementById("saveButton").style.display = "none";
  // Hide the password input field
  document.getElementById("passwordContainer").style.display = "none";
  var updatedUser = {
    firstName: document.getElementById("trainerFirstName").value,
    lastName: document.getElementById("trainerLastName").value,
    email: document.getElementById("trainerEmail").value,
    password: document.getElementById("trainerPassword").value,
    loginactive: true, // Set to true assuming the user is currently logged in
  };
  // Find the index of the logged-in user in existingUsers array
  var loggedInUserIndex = existingUsers.findIndex(function (user) {
    return user.loginactive === true;
  });

  if (loggedInUserIndex !== -1) {
    // Update the user's data in existingUsers array
    existingUsers[loggedInUserIndex] = updatedUser;
    // Save the updated user data back to localStorage
    localStorage.setItem("userArray", JSON.stringify(existingUsers));
    // Optionally, notify the user that changes have been saved
    alert("Changes saved successfully!");
  } else {
    alert("User not found or not logged in.");
  }
}
// Retrieve userArray from localStorage or initialize an empty array
var existingUsers = JSON.parse(localStorage.getItem("userArray")) || [];
// Display the data of the logged-in user in the form
displayLoggedInUserData();


//---------------------------------------------------------------------------------------------------------------//
//-------------------------------------------- Trainer Name -----------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------//

  // Retrieve userArray from localStorage  NAME--------------------------------------------------------------------
  var existingUsers = JSON.parse(localStorage.getItem('userArray')) || [];
  function displayUserArray() {
    var titleElement = document.getElementById('title');
    titleElement.innerHTML = '';
    var loggedInUser = existingUsers.find(function (user) {
      return user.loginactive === true;
    });
    if (loggedInUser) {
      var h1 = document.createElement('h1');
      h1.textContent = loggedInUser.firstName;
      titleElement.appendChild(h1);
    } else {
      var noUserMsg = document.createElement('p');
      noUserMsg.textContent = 'No user is currently logged in.';
      titleElement.appendChild(noUserMsg);
    }
  }
  displayUserArray();


//---------------------------------------------------------------------------------------------------------------//
//--------------------------------------------  Logout  ---------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------//


  function logOut() {
    var existingUsers = JSON.parse(localStorage.getItem('userArray')) || [];
    var loggedInUserIndex = existingUsers.findIndex(function (user) {
      return user.loginactive === true;
    });
    if (loggedInUserIndex !== -1) {
      existingUsers[loggedInUserIndex].loginactive = false;
      localStorage.setItem('userArray', JSON.stringify(existingUsers));
    }
    window.location.href = 'login.html'; // Redirect to login.html after logout
  }
