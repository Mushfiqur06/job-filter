import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, StylesProvider } from "@mui/styles";
import bgHeaderMobile from "../images/bg-header-mobile.svg";
import bgHeaderDesktop from "../images/bg-header-desktop.svg";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Filter from "./Filter";
import Jobs from "./Jobs";

import filterTagsByType from "../api/filterTagsByType";
import database from "../database.json"

const useStyles = makeStyles((theme) => ({
  header: {
    height: 156,
    backgroundColor: theme.palette.primary.main,
  },
  bgHeaderMobile: {
    height: "100%",
    backgroundImage: `url("${bgHeaderMobile}")`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  bgHeaderDesktop: {
    display: "none",
    height: "100%",
    backgroundImage: `url("${bgHeaderDesktop}")`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  main: {
    paddingBottom: theme.spacing(10),
    paddingTop: theme.spacing(7),
    minHeight: "calc(100vh - 156px)",
    backgroundColor: theme.palette.neutral.lightGrayishCyanBg,
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(10),
    },
  },
  container: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  filter: {
    marginBottom: theme.spacing(7),
    marginTop: -92,
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(5),
      marginTop: -112,
    },
  },
  job: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(3),
    },
  },
}));

function Home({ jobs, selectedTags }) {
  const styles = useStyles();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.bgHeaderMobile} />
        <div className={styles.bgHeaderDesktop} />
      </header>
      <main className={styles.main}>
        <Container className={styles.container}>
          <Filter className={styles.filter} tags={selectedTags} />
          {jobs.length == 0 && (
            <Typography>No jobs available based on filter applied.</Typography>
          )}
          {/* [TERNYATA] mapping data yang return <Component /> yang bikin lemot!!!, di dalam Job ada mapping data lagi */}
          <Jobs jobs={jobs} styles={styles.job} />
        </Container>
      </main>
    </>
  );
}

function renderJobs(jobs, tags) {
  jobs = jobs.filter((job) => {
    tags = tags.map((item) => item.toUpperCase());
    return tags.every((item) => {
      const newJobTags = job.tags.map((tag) => tag.toUpperCase());
      return newJobTags.includes(item);
    });
  });
  return jobs;
}

function mapStateToProps(state, ownProps) {
  return {
    jobs: renderJobs(state.jobs, state.selectedTags),
    selectedTags: state.selectedTags,
  };
}

export default connect(mapStateToProps)(Home);
