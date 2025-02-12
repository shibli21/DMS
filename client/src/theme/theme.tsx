import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      "html, body": {
        fontFamily: "raleway",
        color: props.colorMode === "dark" ? "white" : "gray.800",
        bg: props.colorMode === "dark" ? "gray.800" : "white",
      },
      "*": {
        "::selection": {
          background: "purple.400",
          opacity: 1,
          color: "white",
        },
      },
    }),
  },
});

export default theme;
