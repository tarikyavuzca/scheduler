import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";
// import "components/InterviewerList.scss";

export default function InterviewerListItem(props) {
  let interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  // console.log(props);
  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
