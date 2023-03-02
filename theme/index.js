import { extendTheme } from "@chakra-ui/react";

//foundation
import colors from "./foundations/colors";

//components
import Button from "./components/Button";
import Heading from "./components/Heading";
import Input from "./components/Input";

const theme = extendTheme({
  colors,
  components: {
    Button,
    Input,
    Heading,
    NumberInput: { ...Input },
  },
  fonts: {
    body: "Montserrat",
    heading: "EB Garamond",
  },
});

export default theme;
