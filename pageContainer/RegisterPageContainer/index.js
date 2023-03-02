import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  validateCountry,
  validateDay,
  validateMobileNumber,
  validateMonth,
  validateName,
  validateYear,
} from "helpers/validation";
import router from "next/router";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import colors from "theme/foundations/colors";

//----------------------USER DEFINED COMPONENTS-------------------------//

//user defined divided flex Container
const SplitContainer = ({ children }) => {
  return (
    <Flex direction={["column", "column", "column", "row", "row"]} gap="3em">
      {children}
    </Flex>
  );
};

//user defined form control container for Image Upload
const FormControlImageContainer = ({ handleFileInputChange }) => {
  return (
    <FormControl isRequired justify="center" align="center">
      <Flex
        direction="column"
        bgColor="#D9D9D9"
        borderRadius="50%"
        h={["10em", "10em", "12em", "14em", "15em"]}
        w={["10em", "10em", "12em", "14em", "15em"]}
        justify="center"
        align="center"
        gap="1em"
        onClick={() => document.querySelector("input[type=file]").click()}
      >
        <Input
          type="file"
          multiple
          onChange={handleFileInputChange}
          accept=".jpeg,.jpg,.png"
          style={{ display: "none" }}
        />
        <IconButton fontSize="4xl" fontWeight="extrabold" icon={<GrAdd />} />
        <Text fontWeight="bold">Upload Profile Picture</Text>
      </Flex>
    </FormControl>
  );
};

//user defined form control container for input fields
const FormControlInputContainer = ({ label, children, errorValue }) => {
  return (
    <FormControl isRequired isInvalid={errorValue !== ""}>
      <FormLabel>{label}</FormLabel>
      {children}
      <FormErrorMessage color={colors.red}>{errorValue}</FormErrorMessage>
    </FormControl>
  );
};

////user defined form control container for number input fields
const FormControlNumberInputContainer = ({
  min,
  max,
  children,
  errorValue,
}) => {
  return (
    <FormControl isRequired isInvalid={errorValue !== ""}>
      <NumberInput max={max} min={min}>
        {children}
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormErrorMessage color={colors.red}>{errorValue}</FormErrorMessage>
    </FormControl>
  );
};

//---------------------------------Main COMPONENT---------------------------------//
const RegisterPageContainer = () => {
  //-----InternalStates
  const [formValues, setFormValues] = useState({
    country: "",
    day: 0,
    image: "",
    mobileNumber: "",
    month: 0,
    name: "",
    year: 0,
  });
  const [formErrors, setFormErrors] = useState({
    country: "",
    day: "",
    image: "",
    mobileNumber: "",
    month: "",
    name: "",
    year: "",
  });
  //STAte to handle Image files
  const [selectedFiles, setSelectedFiles] = useState([]);

  //handle state change for local form states
  const handleFormChange = (e) => {
    setFormValues((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  ///-----------------ERROR HANDLING METHODS-------------------------//

  const handleNameErrors = (name) => {
    const result = validateName(name);
    if (!(result === "")) {
      setFormErrors((prevErrState) => ({ ...prevErrState, name: result }));
    } else {
      setFormErrors((prevErrState) => ({ ...prevErrState, name: "" }));
    }
  };
  const handleDayErrors = (day) => {
    const result = validateDay(day);
    if (!(result === "")) {
      setFormErrors((prevErrState) => ({ ...prevErrState, day: result }));
    } else {
      setFormErrors((prevErrState) => ({ ...prevErrState, day: "" }));
    }
  };
  const handleMonthErrors = (month) => {
    const result = validateMonth(month);
    if (!(result === "")) {
      setFormErrors((prevErrState) => ({ ...prevErrState, month: result }));
    } else {
      setFormErrors((prevErrState) => ({ ...prevErrState, month: "" }));
    }
  };
  const handleYearErrors = (year) => {
    const result = validateYear(year);
    if (!(result === "")) {
      setFormErrors((prevErrState) => ({ ...prevErrState, year: result }));
    } else {
      setFormErrors((prevErrState) => ({ ...prevErrState, year: "" }));
    }
  };
  const handleMobileNumberErrors = (number) => {
    const result = validateMobileNumber(number);
    if (!(result === "")) {
      setFormErrors((prevErrState) => ({
        ...prevErrState,
        mobileNumber: result,
      }));
    } else {
      setFormErrors((prevErrState) => ({ ...prevErrState, mobileNumber: "" }));
    }
  };
  const handleCountryErrors = (country) => {
    const result = validateCountry(country);
    if (!(result === "")) {
      setFormErrors((prevErrState) => ({ ...prevErrState, country: result }));
    } else {
      setFormErrors((prevErrState) => ({ ...prevErrState, country: "" }));
    }
  };
  //handleChange method for image file
  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const allowedExtensions = /(\.jpeg|\.jpg|\.png)$/i;
    const selectedFilesArray = Array.from(files).filter((file) =>
      allowedExtensions.test(file.name)
    );
    setSelectedFiles(selectedFilesArray);
  };

  //handle method for final form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedFiles); // Do something with the selected files
  };
  console.log(formValues);
  //MAIN REGISTER PAGE VIEW COMPONENT
  return (
    <Container minW="90%">
      {/* Form Container */}
      <Flex
        as="form"
        autoComplete="off"
        autoCorrect="off"
        direction="column"
        gap="4em"
        h="100vh"
        onSubmit={handleSubmit}
      >
        <Flex direction="column" mt="3em" gap="2em" align="center">
          <FormControlImageContainer
            handleFileInputChange={handleFileInputChange}
          />
          {/* //input fields */}
          <Flex direction="column" gap="3em" minW="80%">
            {/* Row 1 of input fields */}
            <SplitContainer>
              {/* NAME INPUT */}
              <FormControlInputContainer
                errorValue={formErrors.name}
                label="Name"
              >
                <Input
                  name="name"
                  onBlur={(e) => {
                    handleNameErrors(e.target.value);
                  }}
                  onChange={handleFormChange}
                  placeholder="Someone Surname"
                  type="text"
                  variant="outline"
                />
              </FormControlInputContainer>

              <FormControlInputContainer label="Date Of Birth">
                <SplitContainer>
                  {/* Year INPUT */}
                  <FormControlNumberInputContainer
                    errorValue={formErrors.year}
                    min={1923}
                    max={2023}
                  >
                    <NumberInputField
                      maxLength={4}
                      name="year"
                      onBlur={(e) => {
                        handleYearErrors(e.target.value);
                      }}
                      onChange={handleFormChange}
                      placeholder="Year"
                    />
                  </FormControlNumberInputContainer>
                  {/* Month INPUT */}
                  <FormControlNumberInputContainer
                    errorValue={formErrors.month}
                    min={1}
                    max={12}
                  >
                    <NumberInputField
                      maxLength={2}
                      name="month"
                      onBlur={(e) => {
                        handleMonthErrors(e.target.value);
                      }}
                      onChange={handleFormChange}
                      placeholder="Month"
                    />
                  </FormControlNumberInputContainer>
                  {/* DAY INPUT */}
                  <FormControlNumberInputContainer
                    errorValue={formErrors.day}
                    min={1}
                    max={31}
                  >
                    <NumberInputField
                      maxLength={2}
                      name="day"
                      onBlur={(e) => {
                        handleDayErrors(e.target.value);
                      }}
                      onChange={handleFormChange}
                      placeholder="Day"
                    />
                  </FormControlNumberInputContainer>
                </SplitContainer>
              </FormControlInputContainer>
            </SplitContainer>
            {/* Row 2 of input fields */}
            <SplitContainer>
              {/* MObileNumber INPUT */}
              <FormControlInputContainer
                errorValue={formErrors.mobileNumber}
                label="Mobile Number"
              >
                <NumberInput>
                  <NumberInputField
                    maxLength={10}
                    name="mobileNumber"
                    onBlur={(e) => {
                      handleMobileNumberErrors(e.target.value);
                    }}
                    onChange={handleFormChange}
                    placeholder="10-Digit Mobile Number"
                  />
                </NumberInput>
              </FormControlInputContainer>
              {/* COUNTRY INPUT */}
              <FormControlInputContainer
                errorValue={formErrors.country}
                label="Country"
              >
                <Input
                  name="country"
                  onBlur={(e) => {
                    handleCountryErrors(e.target.value);
                  }}
                  onChange={handleFormChange}
                  type="text"
                  variant="outline"
                  placeholder="Country of Birth"
                />
              </FormControlInputContainer>
            </SplitContainer>
          </Flex>
        </Flex>
        {/* //submit button */}
        <Flex justify="end">
          <Button
            disabled={
              selectedFiles.length === 0 ||
              formValues.country === "" ||
              formValues.day === 0 ||
              formValues.mobileNumber === "" ||
              formValues.month === 0 ||
              formValues.name === "" ||
              formValues.year === 0
            }
            mr="2em"
            mb="3em"
            type="submit"
            variant="outline"
          >
            Register
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};
export default RegisterPageContainer;
