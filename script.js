let firstName, lastName, email, tel, currentJob, password1, password2;
const inputIDsList = [
  'firstName',
  'lastName',
  'email',
  'tel',
  'currentJob',
  'password1',
  'password2'
];
const errorMessageElement = document.getElementById('errorMessage');

document.getElementById('submit').addEventListener('click', () => {
  onSubmit();
});

// Umbrella submit function. Tracks through each of the required validations and returns out when it hits an issue so the user to can ammend the input. If there are no validation errors and passwords match then details are successfully submitted
const onSubmit = () => {
  obtainValues();
  removeErrorBorders();
  removeErrorMessage();
  const emptyValues = checkEmptyValues();
  if (emptyValues) return;
  const validFirstName = validateText(firstName, 'firstName');
  if (!validFirstName) return;
  const validLastName = validateText(lastName, 'lastName');
  if (!validLastName) return;
  const validEmail = validateEmail();
  if (!validEmail) return;
  const validCurrentJob = validateText(currentJob, 'currentJob');
  if (!validCurrentJob) return;
  const validTel = validateTel();
  if (!validTel) return;
  const validPassword1 = validatePassword(password1, 'password1');
  if (!validPassword1) return;
  const validPassword2 = validatePassword(password2, 'password2');
  if (!validPassword2) return;
  const matchingPasswords = checkPasswordsMatch();
  if (!matchingPasswords) return;
  outputUserDetails();
  onSuccess();
};

// Grab the values from each input for use in validations
const obtainValues = () => {
  firstName = document.getElementById('firstName').value;
  lastName = document.getElementById('lastName').value;
  email = document.getElementById('email').value;
  tel = document.getElementById('tel').value;
  currentJob = document.getElementById('currentJob').value;
  password1 = document.getElementById('password1').value;
  password2 = document.getElementById('password2').value;
  source = document.getElementById('source').value;
};

// Check for empty inputs
const checkEmptyValues = () => {
  const userInputs = [
    firstName,
    lastName,
    email,
    tel,
    currentJob,
    password1,
    password2
  ];
  let emptyValuesExist = false;

  // Loop through the list of user inputs, check to see if the input field is empty and add a red border to those fields that are
  for (let i = 0; i < userInputs.length; i++) {
    if (!userInputs[i]) {
      emptyValuesExist = true;
      const emptyField = document.getElementById(inputIDsList[i]);
      errorMessageElement.innerHTML =
        'Please ensure that all fields are filled in';
      emptyField.style.borderColor = 'red';
    }
  }

  return emptyValuesExist;
};

// Remove error message to reset on every submission
const removeErrorMessage = () => {
  errorMessageElement.innerHTML = '';
};

// Removes all error borders before checks are made. This is so the styles are in a fresh state everytime the user tries to submit the form
const removeErrorBorders = () => {
  for (let i = 0; i < inputIDsList.length; i++) {
    const inputField = document.getElementById(inputIDsList[i]);
    inputField.style.borderColor = 'grey';
  }
};

// ------- INPUT VALIDATION FUNCTIONS ---------
const stringRegex = new RegExp(/[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~0-9]/);
const emailRegex = new RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const telRegex = new RegExp('[0-9]{11}');
const passwordRegex = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&+=]).{8,}$');
// Validate text fields depending on arguments passed to function
const validateText = (name, id) => {
  let isValid = true;
  // Test the user input for all text fields and check if it contains numbers or special characters. If so then it is invalid an error message is generated and red borders added to input element
  const invalidString = stringRegex.test(name);
  if (invalidString) {
    errorMessageElement.innerHTML =
      'Names and current positions should contain no numbers or special characters';
    document.getElementById(id).style.borderColor = 'red';
    isValid = false;
  }

  return isValid;
};

const validateEmail = () => {
  let isValid = true;
  // Test the user input email to check whether it is in a valid email format. If not then generate error message and display error borders
  const valid = emailRegex.test(email);
  if (!valid) {
    errorMessageElement.innerHTML = 'Please input a valid email';
    document.getElementById('email').style.borderColor = 'red';
    isValid = false;
  }

  return isValid;
};

const validateTel = () => {
  let isValid = true;
  // Test input tel number is a valid number. If not generate an error message and display error borders
  const valid = telRegex.test(tel);
  if (!valid || tel.length > 11) {
    errorMessageElement.innerHTML = 'Please input a valid telephone number';
    document.getElementById('tel').style.borderColor = 'red';
    isValid = false;
  }

  return isValid;
};

const validatePassword = (password, id) => {
  let isValid = true;
  // Test the user input for passwords and ensure that the password is 8 characters long, has one digit and one special character
  const validPassword = passwordRegex.test(password);
  if (!validPassword) {
    errorMessageElement.innerHTML =
      'Passwords must be at least 8 characters long, contain at least one digit and one special character';
    document.getElementById(id).style.borderColor = 'red';
    isValid = false;
  }

  return isValid;
};

// Ensure that the values of both password and confirm password fields are indentical
const checkPasswordsMatch = () => {
  const passwordsMatch = password1 == password2;
  if (!passwordsMatch) {
    errorMessageElement.innerHTML = 'Both passwords must match';
    document.getElementById('password1').style.borderColor = 'red';
    document.getElementById('password2').style.borderColor = 'red';
  }
  return passwordsMatch;
};

// ----- SUCCESS FUNCTIONS -----
// Output user data to the console
const outputUserDetails = () => {
  const user = {};
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.tel = tel;
  user.currentJob = currentJob;
  user.password = password1;
  console.log(source);
  user.source = source;

  console.log(user);
};

// Remove form field and display success message to user
const onSuccess = () => {
  const successMessage = `
 <div class="success-message">
  <h1>Signup Successful</h1>
 </div>`;
  const container = document.getElementById('main');
  container.innerHTML = successMessage;
};
