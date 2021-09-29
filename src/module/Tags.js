import React from "react";
import { v4 as uuid } from "uuid";
import Tag from "./Tag";

function Tags({ tags, styles, handleClick }) {
  return tags.map((label) => (
    <Tag
      key={uuid()}
      className={styles}
      label={label}
      handleClick={handleClick}
    />
  ));
}

const MemoizedTags = React.memo(Tags);
export default MemoizedTags;
