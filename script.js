/* ========================================
   ELEMENTS
======================================== */

const loginForm = document.getElementById("loginForm");

const createAccountButton =
    document.getElementById("createAccountButton");

const profileSection =
    document.getElementById("profileSection");

const profileForm =
    document.getElementById("profileForm");

const maritalStatus =
    document.getElementById("maritalStatus");

const familyGroup =
    document.getElementById("familyGroup");

const successMessage =
    document.getElementById("successMessage");

const loginError =
    document.getElementById("loginError");

const dashboard =
    document.getElementById("dashboard");

const userName =
    document.getElementById("userName");

const logoutButton =
    document.getElementById("logoutButton");


/* ========================================
   PROFILE INPUTS
======================================== */

const profileName =
    document.getElementById("profileName");

const gender =
    document.getElementById("gender");

const salary =
    document.getElementById("salary");

const profileEmail =
    document.getElementById("profileEmail");

const profilePassword =
    document.getElementById("profilePassword");

const familyMembers =
    document.getElementById("familyMembers");


/* ========================================
   LOGIN INPUTS
======================================== */

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");


/* ========================================
   CREATE ACCOUNT
======================================== */

createAccountButton.addEventListener(
    "click",
    function () {

        /*
         * Show profile form
         */
        profileSection.classList.remove("hidden");


        /*
         * Scroll smoothly to profile
         */
        setTimeout(function () {

            profileSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }
);


/* ========================================
   MARITAL STATUS
======================================== */

maritalStatus.addEventListener(
    "change",
    function () {

        if (maritalStatus.value === "Married") {

            familyGroup.classList.remove("hidden");

        } else {

            familyGroup.classList.add("hidden");

            familyMembers.value = "";

        }

    }
);


/* ========================================
   PASSWORD SHOW / HIDE
======================================== */

function setupPasswordToggle(
    input,
    button
) {

    button.addEventListener(
        "click",
        function () {

            if (input.type === "password") {

                input.type = "text";

                button.textContent = "🙈";

            } else {

                input.type = "password";

                button.textContent = "👁";

            }

        }
    );

}


setupPasswordToggle(
    loginPassword,
    document.getElementById(
        "loginPasswordToggle"
    )
);


setupPasswordToggle(
    profilePassword,
    document.getElementById(
        "profilePasswordToggle"
    )
);


/* ========================================
   VALIDATION
======================================== */

function clearErrors() {

    document.getElementById(
        "nameError"
    ).textContent = "";

    document.getElementById(
        "genderError"
    ).textContent = "";

    document.getElementById(
        "salaryError"
    ).textContent = "";

    document.getElementById(
        "emailError"
    ).textContent = "";

    document.getElementById(
        "passwordError"
    ).textContent = "";

    document.getElementById(
        "maritalError"
    ).textContent = "";

}


function validateProfile() {

    clearErrors();

    let valid = true;


    /* Name */

    if (profileName.value.trim() === "") {

        document.getElementById(
            "nameError"
        ).textContent =
            "Please enter your full name.";

        valid = false;

    }


    /* Gender */

    if (gender.value === "") {

        document.getElementById(
            "genderError"
        ).textContent =
            "Please select your gender.";

        valid = false;

    }


    /* Salary */

    if (
        salary.value === "" ||
        Number(salary.value) < 0
    ) {

        document.getElementById(
            "salaryError"
        ).textContent =
            "Please enter your monthly salary.";

        valid = false;

    }


    /* Email */

    if (profileEmail.value.trim() === "") {

        document.getElementById(
            "emailError"
        ).textContent =
            "Please enter your email.";

        valid = false;

    } else if (
        !profileEmail.value.includes("@")
    ) {

        document.getElementById(
            "emailError"
        ).textContent =
            "Please enter a valid email.";

        valid = false;

    }


    /* Password */

    if (profilePassword.value === "") {

        document.getElementById(
            "passwordError"
        ).textContent =
            "Please create a password.";

        valid = false;

    } else if (
        profilePassword.value.length < 6
    ) {

        document.getElementById(
            "passwordError"
        ).textContent =
            "Password must contain at least 6 characters.";

        valid = false;

    }


    /* Marital Status */

    if (maritalStatus.value === "") {

        document.getElementById(
            "maritalError"
        ).textContent =
            "Please select your marital status.";

        valid = false;

    }


    return valid;

}


/* ========================================
   SUBMIT PROFILE
======================================== */

profileForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /*
         * Validate
         */

        if (!validateProfile()) {

            return;

        }


        /*
         * Create profile object
         */

        const profileData = {

            name:
                profileName.value.trim(),

            gender:
                gender.value,

            salary:
                salary.value,

            email:
                profileEmail.value.trim()
                    .toLowerCase(),

            password:
                profilePassword.value,

            maritalStatus:
                maritalStatus.value,

            familyMembers:
                maritalStatus.value === "Married"
                    ? familyMembers.value
                    : "1"

        };


        /*
         * Save to localStorage
         */

        localStorage.setItem(
            "expenseTrackerUser",
            JSON.stringify(profileData)
        );


        /*
         * Pre-fill login email
         */

        loginEmail.value =
            profileData.email;


        /*
         * Password must remain empty
         */

        loginPassword.value = "";


        /*
         * Hide profile section
         */

        profileSection.classList.add(
            "hidden"
        );


        /*
         * Clear profile form
         */

        profileForm.reset();

        familyGroup.classList.add(
            "hidden"
        );

        clearErrors();


        /*
         * Show success message
         */

        successMessage.classList.remove(
            "hidden"
        );


        loginError.classList.add(
            "hidden"
        );


        /*
         * Scroll to login
         */

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* ========================================
   LOGIN
======================================== */

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /*
         * Get saved account
         */

        const savedUser =
            localStorage.getItem(
                "expenseTrackerUser"
            );


        /*
         * No account
         */

        if (!savedUser) {

            loginError.textContent =
                "Please create an account first.";

            loginError.classList.remove(
                "hidden"
            );

            successMessage.classList.add(
                "hidden"
            );

            return;

        }


        /*
         * Convert JSON to object
         */

        const user =
            JSON.parse(savedUser);


        const enteredEmail =
            loginEmail.value
                .trim()
                .toLowerCase();

        const enteredPassword =
            loginPassword.value;


        /*
         * Check credentials
         */

        if (
            enteredEmail === user.email &&
            enteredPassword === user.password
        ) {

            /*
             * Successful login
             */

            loginError.classList.add(
                "hidden"
            );

            successMessage.classList.add(
                "hidden"
            );


            /*
             * Show dashboard
             */

            document.querySelector(
                ".auth-wrapper"
            ).classList.add(
                "hidden"
            );

            dashboard.classList.remove(
                "hidden"
            );


            /*
             * Display user's name
             */

            userName.textContent =
                user.name;

        } else {

            /*
             * Invalid login
             */

            loginError.textContent =
                "Invalid email or password.";

            loginError.classList.remove(
                "hidden"
            );

            successMessage.classList.add(
                "hidden"
            );

        }

    }
);


/* ========================================
   LOGOUT
======================================== */

logoutButton.addEventListener(
    "click",
    function () {

        /*
         * Hide dashboard
         */

        dashboard.classList.add(
            "hidden"
        );


        /*
         * Show login
         */

        document.querySelector(
            ".auth-wrapper"
        ).classList.remove(
            "hidden"
        );


        /*
         * Clear password
         */

        loginPassword.value = "";


        /*
         * Hide messages
         */

        loginError.classList.add(
            "hidden"
        );

        successMessage.classList.add(
            "hidden"
        );


        /*
         * Go to top
         */

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);