import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CANCEL = "CANCEL";
const EDIT = "EDIT";
const ERROR_SAVING = "ERROR_SAVING";
const ERROR_DELETING = "ERROR_DELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };

    props.bookInterview(props.id, interview).then((response) => {
      transition(SHOW);
    });
  }

  function deleteAppointment() {
    transition(DELETE);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETING));
  }

  function cancelConfirmation() {
    transition(CANCEL);
  }

  function edit() {
    transition(EDIT);
  }
  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancelConfirmation}
          onEdit={edit}
        />
      )}
      {mode === CANCEL && (
        <Confirm
          message="Are you sure?"
          onConfirm={deleteAppointment}
          onCancel={back}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer["id"]}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVING && (
        <Error message="Could not save." onClose={() => back()} />
      )}
      {mode === ERROR_DELETING && (
        <Error message="Could not delete." onClose={() => back()} />
      )}

      {mode === DELETE && <Status message="DELETING..." />}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
}
