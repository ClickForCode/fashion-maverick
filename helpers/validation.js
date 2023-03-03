import { countryList } from "./countryList";

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

export const validateName = (name) => {
  if (name === "") {
    return "Please Enter a Name";
  }
  if (name.length < 4) {
    return "Name must be at least 3 characters long";
  }
  //regex for full name

  const regex = /^[a-z A-Z]{3,50}$/;
  if (!regex.test(name)) {
    return "Please keep it simple without special characters or numbers";
  }
  return "";
};

export const validateCountry = (country) => {
  if (typeof country !== "string" || country.length === 0) {
    return "Please enter a valid country";
  }
  const regex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  if (!regex.test(country)) {
    return "Please enter a valid country";
  }
  return "";
};
export const validateDay = (day) => {
  const regex = /^(0?[1-9]|[1-2][0-9]|3[0-1])$/;
  if (!regex.test(day)) {
    return "Please enter a valid day between 01 and 31.";
  }
};

export const validateMonth = (month) => {
  const regex = /^(0?[1-9]|1[0-2])$/;
  if (!regex.test(month)) {
    return "Please enter a month between 01 and 12.";
  }
};
export const validateYear = (year) => {
  const regex = /^(\d{4})$/;
  if (!regex.test(year)) {
    return "Please enter a valid year in the format YYYY.";
  }
};
export const validateMobileNumber = (number) => {
  const regex = /^\d{10}$/;
  if (!regex.test(number)) {
    return "Please enter a valid mobile number.";
  }
};
