import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
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
        fontFamily: "raleway",
        color: props.colorMode === "dark" ? "white" : "gray.800",
        bg: props.colorMode === "dark" ? "gray.800" : "white",
      },
    }),
  },
});

export default theme;
