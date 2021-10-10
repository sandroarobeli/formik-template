import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useField, useFormikContext } from "formik";

const SelectWrapper = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event) => {
    setFieldValue(name, event.target.value);
  };

  const configSelect = {
    select: true,
    fullWidth: true,
    variant: "outlined",
    onChange: handleChange,
    ...field,
    // "named" props above apply to all
    // Textfields present.
    // "otherProps" below will be custom tailored
    // to particular Text/Date etc. Fields
    // such as label, type, id, etc.
    ...otherProps
  };

  // meta object containes
  // submitForm, isSubmitting, touched, errors
  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, index) => (
        <MenuItem key={item} value={item}>
          {options[item]}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectWrapper;
