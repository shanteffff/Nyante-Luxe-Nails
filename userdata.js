function showUserFrequency() {

    const users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    let male = 0;
    let female = 0;
    let other = 0;

    let age18to25 = 0;
    let age26to35 = 0;
    let age36to50 = 0;
    let age50plus = 0;

    users.forEach(user => {

        // Gender Count
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