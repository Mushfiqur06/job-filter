import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import clsx from "clsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles, useTheme } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import FilterTag from "./FilterTag";
import FilterSelect from "./FilterSelect";

import clearTags from "../actions/clearTags";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "relative",
    padding: 20,
    paddingBottom: 4, // padding  - marginBottom of <FIlterTag  />
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
  gridFilterContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    order: 2,
    [theme.breakpoints.up("md")]: {
      order: 1,
    },
  },
  gridFilterSelect: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    order: 1,
    marginTop: -100,
    [theme.breakpoints.up("md")]: {
      paddingLeft: 16,
      marginTop: 0,
      order: 2,
    },
  },
  gridClear: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  clear: {
    padding: 0,
    minWidth: 0,
    fontSize: "0.85rem",
    fontWeight: "bold",
    color: theme.palette.neutral.darkGrayishCyan,
    marginBottom: theme.spacing(2), // equal to <FilterTag />
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.primary.main,
      textDecoration: "underline",
    },
  },
  filterTag: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
  },
}));

function Filter({ tags, clearTags, ...props }) {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <Grid container>
      <Grid className={styles.gridFilterContainer} item xs={12} md={10}>
        <Paper
          className={clsx(styles.root, props.className)}
          style={tags.length <= 0 ? { padding: 27.5 } : null}
          elevation={10}
        >
          <Grid container>
            <Grid item xs={10}>
              {tags.length <= 0 && (
                <Typography>No filters applied...</Typography>
              )}
              {tags.map((tag) => (
                <FilterTag key={tag} className={styles.filterTag} label={tag} />
              ))}
            </Grid>
            {tags.length > 0 && (
              <Grid className={styles.gridClear} item xs={2}>
                <Button className={styles.clear} onClick={clearTags}>
                  Clear
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
      <Grid className={styles.gridFilterSelect} item xs={12} md={2}>
        <FilterSelect
          show={tags.length > 0 ? false : true}
          selectedTags={tags}
        />
      </Grid>
    </Grid>
  );
}

function mapDispatch(dispatch) {
  return bindActionCreators({ clearTags }, dispatch);
}

export default connect(null, mapDispatch)(Filter);
