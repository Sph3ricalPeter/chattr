import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/raleway/300.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/700.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";
import "@fontsource/jetbrains-mono";
import { AuthProvider } from "./Auth.tsx";

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "blackAlpha.900",
        color: "white",
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        color: "pink.400",
      },
    },
    Button: {
      baseStyle: {
        color: "white",
      },
      variants: {
        primary: () => ({
          backgroundColor: "none",
          borderWidth: "1px",
          borderColor: "pink.500",
          _hover: {
            backgroundColor: "pink.500",
            color: "black",
          },
        }),
        secondary: () => ({
          backgroundColor: "none",
          borderWidth: "1px",
          borderColor: "white",
          _hover: {
            backgroundColor: "white",
            color: "black",
          },
        }),
      },
    },
    Input: {
      baseStyle: {
        bgColor: "gray.300",
        border: "1px solid white",
      },
      variants: {
        main: {
          field: {
            bg: "whiteAlpha.100",
            color: "white",
            borderWidth: "0",
            _focus: {
              bg: "whiteAlpha.200",
            },
            _invalid: {
              borderColor: "tomato",
            },
            _placeholder: {
              color: "whiteAlpha.500"
            }
          },
        },
      },
    },
    Code: {
      baseStyle: {
        fontFamily: "JetBrains Mono, sans-serif",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
