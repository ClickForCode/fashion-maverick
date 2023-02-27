import colors from "theme/foundations/colors";
const Input = {
  // The parts of the component
  parts: [],
  // The base styles for each part
  baseStyle: {
    field: {
      border: `10px solid ${colors.black}`,
      color: colors.black,
    },
  },
  // The size styles for each part
  sizes: {
    md: { field: { borderRadius: "0.2em" } },
  },
  // The variant styles for each part
  variants: {},
  // The default `size` or `variant` values
  defaultProps: {
    variant: null,
  },
};

export default Input;
