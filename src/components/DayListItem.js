import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = function () {
    let text;
    if (props.spots === 0) {
      text = "no spots remaining";
    } else if (props.spots > 0) {
      text = `${props.spots}${
        props.spots === 1 ? " spot " : " spots "
      } remaining`;
    }
    return text;
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}