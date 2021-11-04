import React from "react";
import classNames from "classnames";
import "components/Button.scss";

// Button component
export default function Button(props) {
  // Using classNames to to change the apperance based on the props that passed in
  let buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
