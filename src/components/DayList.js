import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // an array of day list to render
  return (
    <ul>
      {props.days.map((day) => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={() => props.setDay(day.name)}
        />
      ))}
    </ul>
  );
}
