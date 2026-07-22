function showUserFrequency() {

    // Retrieve all registered users from localStorage
    const users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    // Gender Counters
    let male = 0;
    let female = 0;
    let other = 0;

    // Age Group Counters
    let age18to25 = 0;
    let age26to35 = 0;
    let age36to50 = 0;
    let age50plus = 0;

    // Loop through each registered user
    users.forEach(function(user) {

        // Count Gender
        if (user.gender === "Male") {
            male++;
        }
        else if (user.gender === "Female") {
            female++;
        }
        else {
            other++;
        }

        // Count Age Groups
        const age = Number(user.age);

        if (age >= 18 && age <= 25) {
            age18to25++;
        }
        else if (age >= 26 && age <= 35) {
            age26to35++;
        }
        else if (age >= 36 && age <= 50) {
            age36to50++;
        }
        else if (age > 50) {
            age50plus++;
        }

    });

    // Display Gender Results
    document.getElementById("genderResults").innerHTML = `
        <h3>Gender Frequency</h3>

        <p>Male: ${male}</p>
        <p>Female: ${female}</p>
        <p>Other: ${other}</p>
    `;

    // Display Age Results
    document.getElementById("ageResults").innerHTML = `
        <h3>Age Group Frequency</h3>

        <p>18 - 25 : ${age18to25}</p>
        <p>26 - 35 : ${age26to35}</p>
        <p>36 - 50 : ${age36to50}</p>
        <p>50+ : ${age50plus}</p>
    `;

}
        if (user.gender === "Male") {
            male++;
        }
        else if (user.gender === "Female") {
            female++;
        }
        else {
            other++;
        }

        // Age Group Count
        const age = Number(user.age);

        if (age >= 18 && age <= 25) {
            age18to25++;
        }
        else if (age >= 26 && age <= 35) {
            age26to35++;
        }
        else if (age >= 36 && age <= 50) {
            age36to50++;
        }
        else if (age > 50) {
            age50plus++;
        }

    });

    console.log("Gender Frequency");
    console.log("Male:", male);
    console.log("Female:", female);
    console.log("Other:", other);

    console.log("Age Groups");
    console.log("18-25:", age18to25);
    console.log("26-35:", age26to35);
    console.log("36-50:", age36to50);
    console.log("50+:", age50plus);

}
