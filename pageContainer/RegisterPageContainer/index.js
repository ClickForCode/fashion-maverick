import router from "next/router";
import { useRef, useState } from "react";

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
import { GrAdd } from "react-icons/gr";

import {
  validateCountry,
  validateDay,
  validateMobileNumber,
  validateMonth,
  validateName,
  validateYear,
} from "helpers/validation";

import { allowedExtensions } from "helpers/regex";
import colors from "theme/foundations/colors";

//-------------------------------USER DEFINED COMPONENTS-----------------------------//

//user defined divided flex Container
const SplitContainer = (props) => {
  const RESPONSIVE_FLEX_DIRECTION_ARRAY = [
    "column",
    "column",
    "column",
    "row",
    "row",
  ];
  return (
    <Flex
      direction={RESPONSIVE_FLEX_DIRECTION_ARRAY}
      gap="2em"
      {...props}
    ></Flex>
  );
};

const FormContainer = (props) => {
  return (
    <Flex
      as="form"
      autoComplete="off"
      autoCorrect="off"
      direction="column"
      gap="4em"
      h="100vh"
      {...props}
    ></Flex>
  );
};

const UserInputContentSection = (props) => {
  return (
    <Flex
      direction="column"
      mt="3em"
      gap="2em"
      align="center"
      {...props}
    ></Flex>
  );
};

const UserInputFieldsSection = (props) => {
  return <Flex direction="column" gap="3em" minW="80%" {...props}></Flex>;
};
//user defined form control container for Image Upload
const ImageContainer = ({ handleFileInputChange, errorValue }) => {
  const fileTypedInputRef = useRef();

  const RESPONSIVE_SIZE_FOR_FLEX_IMAGE_INPUT_CONTAINER = [
    "10em",
    "10em",
    "12em",
    "14em",
    "15em",
  ];
  const ACCEPTED_FILE_TYPES = ".jpeg,.jpg,.png";

  return (
    <FormControl
      isRequired
      justify="center"
      align="center"
      isInvalid={errorValue !== ""}
    >
      <Flex
        direction="column"
        bgColor={colors.gray}
        borderRadius="50%"
        h={RESPONSIVE_SIZE_FOR_FLEX_IMAGE_INPUT_CONTAINER}
        w={RESPONSIVE_SIZE_FOR_FLEX_IMAGE_INPUT_CONTAINER}
        justify="center"
        align="center"
        gap="1em"
        onClick={() => {
          fileTypedInputRef.current.click();
        }}
      >
        <Input
          type="file"
          multiple
          onChange={handleFileInputChange}
          accept={ACCEPTED_FILE_TYPES}
          display="none"
          ref={fileTypedInputRef}
        />
        <IconButton fontSize="4xl" fontWeight="extrabold" icon={<GrAdd />} />
        <Text fontWeight="bold">Upload Profile Picture</Text>
        <FormErrorMessage color={colors.red}>{errorValue}</FormErrorMessage>
      </Flex>
    </FormControl>
  );
};

//user defined form control container for input fields
const InputContainer = ({ label, children, errorValue }) => {
  return (
    <FormControl isRequired isInvalid={errorValue !== ""}>
      <FormLabel>{label}</FormLabel>
      {children}
      <FormErrorMessage color={colors.red}>{errorValue}</FormErrorMessage>
    </FormControl>
  );
};

////user defined form control container for number input fields
const NumberInputContainer = ({ min, max, children, errorValue }) => {
  return (
    <FormControl isRequired isInvalid={errorValue !== ""}>
      <NumberInput variant="outline" max={max} min={min}>
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

const RegisterButton = (props) => {
  return (
    <Button
      mr="2em"
      mb="3em"
      type="submit"
      variant="outline"
      {...props}
    ></Button>
  );
};

//---------------------------------MAIN COMPONENT---------------------------------//
const RegisterPageContainer = () => {
  //---=----------------------InternalStates-----------------------------------//
  const [formValues, setFormValues] = useState({
    name: "",

    country: "",
    mobileNumber: "",
    imageFile: [],

    day: 0,
    month: 0,
    year: 0,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",

    imageFile: "",
    country: "",
    mobileNumber: "",

    day: "",
    month: "",
    year: "",
  });

  const toast = useToast();

  //---------------METHOD TO IMPLEMENT DISABLED PROPERTY----------------//
  const IS_FORM_FILLED = !(
    formValues.imageFile.name === "" ||
    formValues.country === "" ||
    formValues.day === 0 ||
    formValues.mobileNumber === "" ||
    formValues.month === 0 ||
    formValues.name === "" ||
    formValues.year === 0
  );
  const ERRORS_DONT_EXIST =
    formErrors.imageFile === "" &&
    formErrors.country === "" &&
    formErrors.day === "" &&
    formErrors.mobileNumber === "" &&
    formErrors.month === "" &&
    formErrors.name === "" &&
    formErrors.year === "";

  ///-----------------ERROR HANDLING METHODS-------------------------//

  const handleErrors = (keyName, value) => {
    //create result variable
    let result = "";

    //check what value to give to result variable
    switch (keyName) {
      case "name":
        result = validateName(value);
        break;
      case "month":
        result = validateMonth(value);
        break;
      case "year":
        result = validateYear(value);
        break;
      case "day":
        result = validateDay(value);
        break;
      case "mobileNumber":
        result = validateMobileNumber(value);
        break;
      case "country":
        result = validateCountry(value);
        break;

      default:
        break;
    }

    // update result to error state
    if (result) {
      setFormErrors((prevErrState) => ({ ...prevErrState, [keyName]: result }));
    } else {
      setFormErrors((prevErrState) => ({ ...prevErrState, [keyName]: "" }));
    }
  };

  ///-----------------Change HANDLING METHODS-------------------------//

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    allowedExtensions.test(file.name)
      ? setFormValues((oldState) => ({
          ...oldState,
          imageFile: file,
        }))
      : setFormErrors((prevErrState) => ({
          ...prevErrState,
          imageFile: "invalid format",
        }));
  };

  //handle state change for local form states
  const handleFormChange = (e) => {
    setFormValues((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  //final form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Do something with the selected files
    if (ERRORS_DONT_EXIST) {
      console.log(formValues);
      //api call to save data
      // router.push("/")
    } else {
      console.log(formErrors);

      toast({
        title: "Error!!",
        description: "Please resolve errors",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        containerStyle: {
          backgroundColor: colors.red,
        },
      });
    }
  };

  //MAIN REGISTER PAGE VIEW COMPONENT
  return (
    <Container minW="90%">
      <FormContainer onSubmit={handleSubmit}>
        <UserInputContentSection>
          <ImageContainer
            handleFileInputChange={handleFileInputChange}
            errorValue={formErrors.imageFile}
          />
          <UserInputFieldsSection>
            <SplitContainer>
              <InputContainer errorValue={formErrors.name} label="Name">
                <Input
                  name="name"
                  onBlur={(e) => {
                    handleErrors(e.target.name, e.target.value);
                  }}
                  onChange={handleFormChange}
                  placeholder="Someone Surname"
                  variant="outline"
                />
              </InputContainer>

              <InputContainer label="Date Of Birth">
                <SplitContainer>
                  <NumberInputContainer
                    errorValue={formErrors.year}
                    min={1923}
                    max={2023}
                  >
                    <NumberInputField
                      maxLength={4}
                      name="year"
                      onBlur={(e) => {
                        handleErrors(e.target.name, e.target.value);
                      }}
                      onChange={handleFormChange}
                      placeholder="Year"
                    />
                  </NumberInputContainer>
                  <NumberInputContainer
                    errorValue={formErrors.month}
                    min={1}
                    max={12}
                  >
                    <NumberInputField
                      maxLength={2}
                      name="month"
                      onBlur={(e) => {
                        handleErrors(e.target.name, e.target.value);
                      }}
                      onChange={handleFormChange}
                      placeholder="Month"
                    />
                  </NumberInputContainer>
                  <NumberInputContainer
                    errorValue={formErrors.day}
                    min={1}
                    max={31}
                  >
                    <NumberInputField
                      maxLength={2}
                      name="day"
                      onBlur={(e) => {
                        handleErrors(e.target.name, e.target.value);
                      }}
                      onChange={handleFormChange}
                      placeholder="Day"
                    />
                  </NumberInputContainer>
                </SplitContainer>
              </InputContainer>
            </SplitContainer>
            <SplitContainer>
              <InputContainer
                errorValue={formErrors.mobileNumber}
                label="Mobile Number"
              >
                <NumberInput variant="outline">
                  <NumberInputField
                    maxLength={10}
                    name="mobileNumber"
                    onBlur={(e) => {
                      handleErrors(e.target.name, e.target.value);
                    }}
                    onChange={handleFormChange}
                    placeholder={`${10}-Digit Mobile Number`}
                  />
                </NumberInput>
              </InputContainer>
              <InputContainer errorValue={formErrors.country} label="Country">
                <Input
                  name="country"
                  onBlur={(e) => {
                    handleErrors(e.target.name, e.target.value);
                  }}
                  onChange={handleFormChange}
                  variant="outline"
                  placeholder="Country of Birth"
                />
              </InputContainer>
            </SplitContainer>
          </UserInputFieldsSection>
        </UserInputContentSection>
        <Flex justify="end">
          <RegisterButton disabled={!IS_FORM_FILLED}>Register</RegisterButton>
        </Flex>
      </FormContainer>
    </Container>
  );
};
export default RegisterPageContainer;
