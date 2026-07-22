function registerUser(event) {

    // Stop the form from refreshing the page
    event.preventDefault();

    // Get form values
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let dob = document.getElementById('date-of-birth').value;
    let gender = document.getElementById('gender').value;
    let phone = document.getElementById('phone-number').value;
    let email = document.getElementById('email-address').value;
    let trn = document.getElementById('registration-trn').value;
    let password = document.getElementById('registration-password').value;
    let confirmPassword = document.getElementById('confirm-password').value;

    let message = document.getElementById('registration-message');

    try {

        // PASSWORD LENGTH VALIDATION
        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters.');
        }

        // PASSWORD MATCH VALIDATION
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match.');
        }

        // AGE VALIDATION (18+)
        let birthDate = new Date(dob);
        let today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        let monthDifference = today.getMonth() - birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        if (age < 18) {
            throw new Error('You must be at least 18 years old to register.');
        }

        // TRN FORMAT VALIDATION
        let trnPattern = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/;

        if (!trnPattern.test(trn)) {
            throw new Error('TRN must be in the format 000-000-000.');
        }

        // GET EXISTING DATA FROM LOCALSTORAGE
        let users = JSON.parse(localStorage.getItem('RegistrationData')) || [];

        // CHECK IF TRN IS UNIQUE
        let existingUser = users.find(function (user) {
            return user.trn === trn;
        });

        if (existingUser) {
            throw new Error('TRN already exists. Please use a different TRN.');
        }

        // CREATE USER OBJECT
       let user = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    dateOfBirth: dob,
    gender: gender,
    phoneNumber: phone,
    emailAddress: email,
    trn: trn,
    password: password,
    dateOfRegistration: new Date().toLocaleString(),
    cart: {},
    invoices: []
};
        // APPEND USER TO ARRAY
        users.push(user);

        // SAVE ARRAY TO LOCALSTORAGE
        localStorage.setItem('RegistrationData', JSON.stringify(users));

        // SUCCESS MESSAGE
        message.textContent = 'Registration successful!';

        // CLEAR FORM
        document.getElementById('registration-form').reset();

        console.log(users);

    } catch (error) {

        // JAVASCRIPT ERROR HANDLING
        message.textContent = error.message;
    }
}

function loginUser(event) {

    event.preventDefault();

    try {

        let trn = document.getElementById("login-trn").value;
        let password = document.getElementById("login-password").value;

        let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

        let user = users.find(function(user) {
            return user.trn === trn && user.password === password;
        });

        let attempts = Number(localStorage.getItem("loginAttempts")) || 0;

        if (user) {
            localStorage.setItem("CurrentUser", JSON.stringify(user));

            localStorage.setItem("loginAttempts", 0);

            alert("Login Successful!");

            window.location.href = "products.html";

        } else {

            attempts++;

            localStorage.setItem("loginAttempts", attempts);

            if (attempts >= 3) {

                window.location.href = "locked.html";

            } else {

                alert("Invalid TRN or Password. Attempts left: " + (3 - attempts));

            }

        }

    } catch (error) {

        alert("An error occurred.");

    }

}
