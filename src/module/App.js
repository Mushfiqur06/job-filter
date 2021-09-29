import React from "react";
import { create } from "jss";
import preset from "jss-preset-default";
import { ThemeProvider } from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../customization";
import Home from "./Home";
import { useQuery, gql } from "@apollo/client";

const jss = create();
jss.setup(preset());

const GET_ALL_JOBS = gql`
  query GetAllJobs {
    jobs {
      id
      company
    }
  }
`;

export default function App() {
  const { loading, error, data } = useQuery(GET_ALL_JOBS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log("Data", data);

  return (
    <React.StrictMode>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Home />
        </ThemeProvider>
      </StylesProvider>
    </React.StrictMode>
  );
}
