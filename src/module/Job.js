import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import clsx from "clsx";
import { makeStyles, lighten } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import Tags from "./Tags";

import addTag from "../actions/addTag";

const borderThick = 5;
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: 23,
    paddingBottom: 7, // padding - <Tag /> margin-bottom
    paddingLeft: 23,
    [theme.breakpoints.up("md")]: {
      padding: [32, 24, 32, 38],
    },
  },
  gridContent: {},
  gridTags: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      marginBottom: -16,
      marginRight: -16,
    },
  },
  gridAvatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    position: "absolute",
    top: -theme.spacing(6),
    left: 0,
    [theme.breakpoints.up("md")]: {
      position: "relative",
      top: 0,
      width: 88,
      height: 88,
    },
  },
  flex: {
    display: "flex",
    height: 100,
    background: "skyblue",
  },
  breadcrumbs: {
    "& p": {
      fontWeight: 500,
      // color: lighten(theme.palette.neutral.darkGrayishCyan, 0.1),
      fontSize: "0.78rem",
    },
    [theme.breakpoints.up("md")]: {
      "& p": {
        fontSize: ".9rem",
      },
    },
  },
  tag: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      marginBottom: 16,
    },
  },
  position: {
    display: "block",
    marginBottom: 12,
    color: theme.palette.neutral.veryDarkGrayishCyan,
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.125rem",
      marginBottom: 8,
    },
  },
  company: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "& .MuiTypography-root": {
      marginRight: theme.spacing(2),
    },
    "& .MuiChip-root": {
      marginRight: theme.spacing(1),
      "&:last-child": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 0,
      "& .MuiTypography-root": {
        fontSize: ".9rem",
      },
    },
  },
  divider: {
    margin: `${theme.spacing(2)}px 0`,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
const useStylesBorderLeft = makeStyles((theme) => ({
  root: {
    // borderLeft: `${borderThick}px solid ${theme.palette.primary.main}`,
    paddingLeft: 23 - borderThick,
    [theme.breakpoints.up("md")]: {
      paddingLeft: 38 - borderThick,
    },
  },
}));
const useStylesDot = makeStyles((theme) => ({
  root: {
    height: 4,
    width: 4,
    // backgroundColor: lighten(theme.palette.neutral.darkGrayishCyan, 0.2),
    borderRadius: "100%",
  },
}));

const imagesPath = "./images/";

function Dot() {
  const styles = useStylesDot();
  return <div className={styles.root}></div>;
}
function Job({
  logo,
  isNew,
  featured,
  company,
  position,
  postedAt,
  location,
  contract,
  tags,
  addTag,
  ...props
}) {
  const styles = useStyles();

  function onClickTag(value) {
    return function () {
      addTag(value);
    };
  }

  let stylesBorderLeft = {};
  // if (featured) {
  //   stylesBorderLeft = useStylesBorderLeft();
  // }
  return (
    <Paper
      className={clsx(styles.root, stylesBorderLeft.root, props.className)}
      elevation={10}
    >
      <Grid container>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid className={styles.gridAvatar} item md={3}>
              <Avatar
                className={styles.avatar}
                src={imagesPath + logo}
              ></Avatar>
            </Grid>
            <Grid item md={9}>
              <Box className={styles.company}>
                <Typography color="primary" variant="body1" component="span">
                  {company}
                </Typography>
                {isNew ? <Chip label="NEW!" color="primary" /> : null}
                {featured ? <Chip label="FEATURED" color="secondary" /> : null}
              </Box>
              <Link className={styles.position} href="#" variant="h6">
                {position}
              </Link>
              <Breadcrumbs className={styles.breadcrumbs} separator={<Dot />}>
                <Typography>{postedAt}</Typography>
                <Typography>{contract}</Typography>
                <Typography>{location}</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <Divider className={styles.divider} />
        </Grid>
        <Grid className={styles.gridTags} item xs={12} md={6}>
          <Tags tags={tags} styles={styles.tag} handleClick={onClickTag} />
        </Grid>
      </Grid>
    </Paper>
  );
}

function mapDispatch(dispatch) {
  return bindActionCreators({ addTag }, dispatch);
}

export default connect(null, mapDispatch)(Job);
