import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // creating reset function to cleant the name and the interviewer
  // when the user cancel making an appointment
  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  // creating cancel function to cancel an appointment and return the previous state
  const cancel = () => {
    reset();
    props.onCancel();
  };

  // creating validate function to save the appointment form
  // creating if-else statement to check if the user leave the name and interviewer blank
  const validate = () => {
    if (name === "") {
      setError("The name cannot be left blank.");
      return;
    } else if (interviewer === null) {
      setError("An interviewer must be selected.");
      return;
    } else {
      setError("");
      return props.onSave(name, interviewer);
    }
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (event.target.value !== "") {
                setError(false);
              }
            }}
          />
        </form>
        {error && (
          <section className="appointment__validation">{error}</section>
        )}
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
