// Validate Find Pet Form
function validateFindPetForm() {
    const petType = document.getElementById('petType').value;
    const breed = document.getElementById('breed').value;
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const comp = document.querySelectorAll('input[name="compatibility"]:checked');

    let errorMessage = '';

    if (petType === '') {
        errorMessage += 'Pet Type is required.\n';
    }
    if (breed === '') {
        errorMessage += 'Breed is required.\n';
    }
    if (age === '') {
        errorMessage += 'Age is required.\n';
    }
    if (!gender) {
        errorMessage += 'Gender is required.\n';
    }
    if (comp.length === 0) {
        errorMessage += 'At least one compatibility option is required.\n';
    }

    if (errorMessage) {
        alert(errorMessage);
        return false;
    }
    return true;
}

// Validate Donate Pet Form
function validateDonatePetForm() {
    const petType = document.getElementById('petType').value;
    const breed = document.getElementById('breed').value;
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const comp = document.querySelectorAll('input[name="comp[]"]:checked');
    const ownerName = document.getElementById('ownerName').value;
    const ownerEmail = document.getElementById('ownerEmail').value;

    let errorMessage = '';

    if (petType === '') {
        errorMessage += 'Pet Type is required.\n';
    }
    if (breed === '') {
        errorMessage += 'Breed is required.\n';
    }
    if (age === '') {
        errorMessage += 'Age is required.\n';
    }
    if (!gender) {
        errorMessage += 'Gender is required.\n';
    }
    if (comp.length === 0) {
        errorMessage += 'At least one compatibility option is required.\n';
    }
    if (ownerName === '') {
        errorMessage += 'Owner Name is required.\n';
    }
    if (ownerEmail === '') {
        errorMessage += 'Owner Email is required.\n';
    }

    if (errorMessage) {
        alert(errorMessage);
        return false;
    }
    return true;
}

// Add validation to the forms
function addValidation(formId, validateFunction) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', function(event) {
        if (!validateFunction()) {
            event.preventDefault();
        }
    });
}

// Add validation to the find pet form
addValidation('findPetForm', validateFindPetForm);

// Add validation to the donate pet form
addValidation('donatePetForm', validateDonatePetForm);







// // Function to add validation to a form
// function addValidation(formId, validationFunction) {
//     const form = document.getElementById(formId);
//     if (form) {
//         console.log(`${formId} found`);
//         form.addEventListener('submit', function (event) {
//             console.log('Form submit event triggered');
//             event.preventDefault(); // Prevent the form from submitting
//             validationFunction(form);
//         });
//     } else {
//         console.log(`Form with ID "${formId}" not found`);
//     }
// }

// // Validation function for petForm
// function validatePetForm(form) {
//     let isValid = true;
//     let errorMessage = '';

//     // Validate breed
//     const breed = document.getElementById('breed').value.trim();
//     if (!breed) {
//         errorMessage += 'Breed is required.\n';
//         isValid = false;
//     }

//     // Validate gender
//     const genderRadios = document.getElementsByName('gender');
//     let genderSelected = false;
//     for (let i = 0; i < genderRadios.length; i++) {
//         if (genderRadios[i].checked) {
//             genderSelected = true;
//             break;
//         }
//     }
//     if (!genderSelected) {
//         errorMessage += 'Gender is required.\n';
//         isValid = false;
//     }

//     // Validate compatibility
//     const compatibility = document.querySelectorAll('input[name="comp[]"]:checked');
//     if (compatibility.length === 0) {
//         errorMessage += 'At least one compatibility option is required.\n';
//         isValid = false;
//     }

//     if (!isValid) {
//         alert(errorMessage);
//     } else {
//         alert('Form submitted successfully!');
//         form.reset();
//     }
// }

// // Validation function for donateForm
// function validateDonateForm(form) {
//     let isValid = true;
//     let errorMessage = '';

//     // Validate breed
//     const breed = document.getElementById('breed').value.trim();
//     if (!breed) {
//         errorMessage += 'Breed is required.\n';
//         isValid = false;
//     }

//     // Validate gender
//     const genderRadios = document.getElementsByName('gender');
//     let genderSelected = false;
//     for (let i = 0; i < genderRadios.length; i++) {
//         if (genderRadios[i].checked) {
//             genderSelected = true;
//             break;
//         }
//     }
//     if (!genderSelected) {
//         errorMessage += 'Gender is required.\n';
//         isValid = false;
//     }

//     // Validate compatibility
//     const compatibility = document.querySelectorAll('input[name="comp[]"]:checked');
//     if (compatibility.length === 0) {
//         errorMessage += 'At least one compatibility option is required.\n';
//         isValid = false;
//     }

//     // Validate owner's name
//     const ownerName = document.getElementById('ownerName').value.trim();
//     if (!ownerName) {
//         errorMessage += "Owner's name is required.\n";
//         isValid = false;
//     }

//     // Validate owner's email
//     const ownerEmail = document.getElementById('ownerEmail').value.trim();
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!ownerEmail) {
//         errorMessage += "Owner's email is required.\n";
//         isValid = false;
//     } else if (!emailPattern.test(ownerEmail)) {
//         errorMessage += 'Please enter a valid email address.\n';
//         isValid = false;
//     }

//     // Validate comments
//     const comments = document.getElementById('comments').value.trim();
//     if (!comments) {
//         errorMessage += 'Comments are required.\n';
//         isValid = false;
//     }

//     if (!isValid) {
//         alert(errorMessage);
//     } else {
//         alert('Form submitted successfully!');
//         form.reset();
//     }
// }

// // Add validation to both forms
// addValidation('petForm', validatePetForm);
// addValidation('donatePetForm', validateDonateForm);


