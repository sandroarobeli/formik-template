import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

const DateTimePicker = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    fullWidth: true,
    type: "date",
    variant: "outlined",
    InputLabelProps: {
      shrink: true
    },
    ...field,
    // "named" props above apply to all
    // Textfields present.
    // "otherProps" below will be custom tailored
    // to particular Text/Date etc. Fields
    // such as label, type, id, etc.
    ...otherProps
  };

  // meta object contains
  // submitForm, isSubmitting, touched, errors
  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField {...configDateTimePicker} />;
};

export default DateTimePicker;
