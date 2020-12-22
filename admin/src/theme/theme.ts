import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: 0,
        fontWeight: "normal",
      },
    },
  },
  styles: {
    global: (props) => ({
      "html, body": {
        fontFamily: "poppins",
        color: props.colorMode === "dark" ? "white" : "gray.800",
        bg: props.colorMode === "dark" ? "gray.800" : "white",
      },
    }),
  },
});

export default theme;
