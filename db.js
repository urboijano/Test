// Initialize IndexedDB
let db;
const request = indexedDB.open("User Database", 2); // Incremented version to 2

request.onerror = function(event) {
    console.error("Database error: ", event.target.errorCode);
};

request.onsuccess = function(event) {
    db = event.target.result;
    // Retrieve and display the user's email when the database is successfully opened
    getUserEmail().then(email => {
        if (email) {
            displayUserEmail(email);
        } else {
            console.error("User  email not found.");
        }
    }).catch(error => {
        console.error("Error retrieving user email:", error);
    });
};

request.onupgradeneeded = function(event) {
    db = event.target.result;

    // Create object stores
    const userStore = db.createObjectStore("users", { keyPath: "email" });
    const patientStore = db.createObjectStore("patients", { keyPath: "registrationNo" }); // Ensure this line is present
};

function addUser (email, password, name) {
    if (!email || !password || !name) {
        console.error("Email, password, and name are required.");
        return;
    }

    const transaction = db.transaction(["users"], "readwrite");
    const objectStore = transaction.objectStore("users");
    const getRequest = objectStore.get(email);

    getRequest.onsuccess = function() {
        if (getRequest.result) {
            console.error("A user with this email already exists.");
        } else {
            const addRequest = objectStore.add({ email: email, password: password, name: name });

            addRequest.onsuccess = function() {
                console.log("User  added to the database");
                window.location.href = "login.html"; // Redirect to login page
            };

            addRequest.onerror = function() {
                console.error("Error adding user: ", addRequest.error);
            };
        }
    };

    getRequest.onerror = function() {
        console.error("Error checking for existing user: ", getRequest.error);
    };
}

function getUser (email) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["users"], "readonly");
        const objectStore = transaction.objectStore("users");
        const request = objectStore.get(email);

        request.onsuccess = function() {
            resolve(request.result);
        };

        request.onerror = function() {
            reject("Error retrieving user: ", request.error);
        };
    });
}

function getUserEmail() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["users"], "readonly");
        const objectStore = transaction.objectStore("users");
        const request = objectStore.getAll();

        request.onsuccess = function() {
            if (request.result.length > 0) {
                console.log("User  data retrieved:", request.result);
                resolve(request.result[0].email);
            } else {
                console.warn("No user data found in the database.");
                resolve(null);
            }
        };

        request.onerror = function() {
            console.error("Error retrieving user email:", request.error);
            reject("Error retrieving user email: ", request.error);
        };
    });
}

function displayUserEmail(email) {
    const userEmailElement = document.getElementById("userEmail");
    if (userEmailElement) {
        userEmailElement.textContent = email;
    }
}

// Function to get all patients
function getPatients() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["patients"], "readonly");
        const objectStore = transaction.objectStore("patients");
        const request = objectStore.getAll();

        request.onsuccess = function() {
            resolve(request.result);
        };

        request.onerror = function() {
            reject("Error retrieving patients: ", request.error);
        };
    });
}