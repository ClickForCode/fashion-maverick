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
  Text,
  useToast,
} from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import colors from "theme/foundations/colors";

//user defined form control container for Image Upload
const FormControlImageContainer = ({ handleFileInputChange }) => {
  return (
    <FormControl isRequired justify="center" align="center">
      <Flex
        direction="column"
        bgColor="#a7a59d"
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
const FormControlInputContainer = ({
  inputType,
  inputName,
  label,
  multipleInputTypes = [],
  handleFormChange,
}) => {
  const createInputFields = (inputFields) => {
    return inputFields.map((i, index) => {
      return (
        <Input
          onChange={handleFormChange}
          name={i.name}
          key={index}
          type={i.type}
        />
      );
    });
  };

  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      {multipleInputTypes.length > 1 ? (
        <SplitContainer>{createInputFields(multipleInputTypes)}</SplitContainer>
      ) : (
        <Input onChange={handleFormChange} name={inputName} type={inputType} />
      )}
    </FormControl>
  );
};

//user defined divided flex Container
const SplitContainer = ({ children }) => {
  return (
    <Flex justify="space-around" gap="3em">
      {children}
    </Flex>
  );
};

const RegisterPageContainer = () => {
  //-----InternalStates
  const [formValues, setFormValues] = useState({
    country: "",
    dob: {
      day: 0,
      month: 0,
      year: 0,
    },
    image: "",
    mobileNumber: "",
    name: "",
  });
  const [formErrors, setFormErrors] = useState({
    country: "",
    dob: {
      day: "",
      month: "",
      year: "",
    },
    image: "",
    mobileNumber: "",
    name: "",
  });
  //
  const [selectedFiles, setSelectedFiles] = useState([]);

  //handle state change
  const handleFormChange = (e) => {
    setFormValues((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  //handleChange methods
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
  return (
    <Container minW="80%">
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
        {/* //input fields */}
        <Flex direction="column" mt="3em" gap="2em" align="center">
          <FormControlImageContainer
            handleFileInputChange={handleFileInputChange}
          />
          <Flex direction="column" gap="3em" w="80%">
            {/* Row 1 of input fields */}
            <SplitContainer>
              <FormControlInputContainer
                handleFormChange={handleFormChange}
                inputType="text"
                inputName="name"
                label="Name"
              />
              <FormControlInputContainer
                handleFormChange={handleFormChange}
                inputType="number"
                multipleInputTypes={[
                  { name: "day", type: "number" },
                  { name: "month", type: "number" },
                  { name: "year", type: "number" },
                ]}
                label="Date Of Birth"
              />
            </SplitContainer>
            {/* Row 2 of input fields */}
            <SplitContainer>
              <FormControlInputContainer
                handleFormChange={handleFormChange}
                inputType="number"
                inputName="mobileNumber"
                label="Mobile Number"
              />
              <FormControlInputContainer
                handleFormChange={handleFormChange}
                inputType="text"
                label="Country"
              />
            </SplitContainer>
          </Flex>
        </Flex>
        {/* //submit button */}
        <Flex justify="end">
          <Button
            disabled={selectedFiles.length === 0}
            variant="outline"
            mr="2em"
            type="submit"
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};
export default RegisterPageContainer;
