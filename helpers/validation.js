export const validateEmail = (email) => {
  if (email === "") {
    return "Please Enter an Email ID";
  }
  //regex for email
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (email.length < 5 || !regex.test(email)) {
    return "Please Enter Correct Email ID";
  }
  return "";
};

export const validatePassword = (password) => {
  if (password === "") {
    return "Please enter your password";
  }
  if (password.length < 8 || password.length > 15) {
    return "Password Length should be between 8 and 15 characters";
  }
  //regex for password containing at least one big alphabet, One Small alphabet one number and one special character
  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (!regex.test(password)) {
    return "Password must Contain at least one big alphabet, one Small alphabet, one number, and one special character";
  }
  return "";
};
