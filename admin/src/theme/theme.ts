import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: 0,
        fontWeight: "normal",
      },
    },
    Table: {
      baseStyle: {
        td: {
          border: "1px solid #eee",
        },
        th: {
          border: "1px solid #eee",
          fontWeight: "700",
        },
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
      "*": {
        "::selection": {
          background: "purple.400",
          opacity: 1,
          color: "white",
        },
      },
      "table > thead > tr > *": {
        bg: "purple.400",
        fontSize: "1rem !important",
        color: "white !important",
      },
    }),
  },
});

export default theme;
