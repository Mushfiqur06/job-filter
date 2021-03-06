import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import toggleTag from "../actions/toggleTag";

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: "100%",
    marginTop: -112,
    marginBottom: 40,
  },
  button: {
    display: "block",
    width: "100%",
    padding: 14,
    [theme.breakpoints.up("md")]: {
      padding: 25,
    },
  },
}));

function FilterSelect({
  reduxTagsByType,
  selectedTags,
  toggleTag,
}: {
  reduxTagsByType: any;
  selectedTags: any;
  toggleTag: any;
}) {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(e: any) {
    setAnchorEl(e.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function handleSelect(value: any) {
    return function () {
      toggleTag(value);
    };
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Paper className={styles.root} elevation={10}>
      <Button
        className={styles.button}
        onClick={handleClick}
        aria-describedby={id}
      >
        Filter By
      </Button>

      {open && (
        <Popover
          // className={styles.select}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <List style={{ minWidth: 200 }}>
            {reduxTagsByType.map((item: any) => (
              <React.Fragment key={item.type}>
                <ListItem key={item.type}>
                  <ListItemText secondary={item.type} />
                </ListItem>
                {item.tags.map((tag: any) => (
                  <ListItem key={tag} button onClick={handleSelect(tag)}>
                    <ListItemIcon>
                      <Checkbox
                        checked={selectedTags.indexOf(tag) !== -1}
                        inputProps={{ "aria-label": tag, tabIndex: -1 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={tag} />
                  </ListItem>
                ))}
              </React.Fragment>
            ))}
          </List>
        </Popover>
      )}
    </Paper>
  );
}

function filterTagsByType(data: any, type: any) {
  function removeDuplicate(arr: any) {
    return arr.reduce((acc: any, item: any) => {
      const newItem = item.toUpperCase();
      if (acc.map((el: any) => el.toUpperCase()).includes(newItem)) {
        return [...acc];
      } else {
        return [...acc, item];
      }
    }, []);
  }
  if (Array.isArray(data[0][type])) {
    return removeDuplicate(
      data.reduce((acc: any, job: any) => [...acc, ...job[type]], [])
    );
  } else {
    return removeDuplicate(data.map((item: any) => item[type]));
  }
}

function mapState(state: any, ownProps: any) {
  return {
    reduxTagsByType: [
      { type: "role", tags: filterTagsByType(state.jobs, "role") },
      { type: "level", tags: filterTagsByType(state.jobs, "level") },
      { type: "languages", tags: filterTagsByType(state.jobs, "languages") },
      { type: "tools", tags: filterTagsByType(state.jobs, "tools") },
    ],
  };
}

function mapDispatch(dispatch: any, ownProps: any) {
  return bindActionCreators({ toggleTag }, dispatch);
}

export default connect(mapState, mapDispatch)(FilterSelect);
