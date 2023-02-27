import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";

import { validateEmail, validatePassword } from "helpers/validation";
import colors from "theme/foundations/colors";

//custom input component
const InputComponent = ({
  type,
  errors,
  handleEmailErrors,
  handleFormChange,
}) => {
  return (
    <Input
      autoComplete="off"
      borderColor={errors === "" ? colors.black : colors.red}
      maxW="100%"
      minW="30%"
      name={type}
      onBlur={handleEmailErrors}
      onChange={handleFormChange}
      placeholder={type === "email" ? "Email" : "Password"}
      type={type}
      variant="outline"
    />
  );
};

const LoginPageContainer = () => {
  //-----InternalStates
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  //using toast to display errors
  const toast = useToast();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formErrors.email === "" && formErrors.password === "") {
      //api call to save data
      // router.push("/")
      console.log(true, formErrors);
    } else {
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
      console.log(false, formErrors);
    }
  };

  const handleFormChange = (e) => {
    setFormValues((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEmailErrors = (email) => {
    const result = validateEmail(email);
    if (!(result === "")) {
      setFormErrors((prevErrState) => ({ ...prevErrState, email: result }));
    } else {
      setFormErrors((prevErrState) => ({ ...prevErrState, email: "" }));
    }
  };
  const handlePasswordErrors = (password) => {
    const result = validatePassword(password);
    if (!(result === "")) {
      setFormErrors((prevErrState) => ({ ...prevErrState, password: result }));
    } else {
      setFormErrors((prevErrState) => ({ ...prevErrState, password: "" }));
    }
  };

  return (
    <Container minH="100vh" minW="40%">
      <Flex
        as="form"
        autoComplete="off"
        autoCorrect="off"
        h="100vh"
        direction="column"
        gap="60px"
        justify="center"
        align="center"
        onSubmit={handleFormSubmit}
      >
        <Heading textAlign="center" variant="h1">
          Fashion <br /> Maverick
        </Heading>
        <Flex
          direction="column"
          gap="30px"
          w="90%"
          maxW="70%"
          align="center"
          justify="center"
        >
          <FormControl
            isRequired
            // isInvalid={formErrors.email !== ""}
          >
            <InputComponent
              type="email"
              errors={formErrors.email}
              handleEmailErrors={(e) => handleEmailErrors(e.target.value)}
              handleFormChange={handleFormChange}
            />
            {/* <FormErrorMessage color={colors.red}>
              {formErrors.email}
            </FormErrorMessage> */}
          </FormControl>

          <FormControl
            isRequired
            // isInvalid={formErrors.password !== ""}
          >
            <InputComponent
              type="password"
              errors={formErrors.password}
              handlePasswordErrors={(e) => handlePasswordErrors(e.target.value)}
              handleFormChange={handleFormChange}
            />
            {/* <FormErrorMessage color={colors.red}>
              {formErrors.password}
            </FormErrorMessage> */}
          </FormControl>
          <Flex w="100%" justify="end">
            <Button
              isDisabled={formValues.email === "" || formValues.password === ""}
              type="submit"
              variant="outline"
            >
              Login
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
export default LoginPageContainer;
