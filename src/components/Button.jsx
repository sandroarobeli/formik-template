import React from "react";
import Button from "@mui/material/Button";
import { useFormikContext } from "formik";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm, isSubmitting } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    fullWidth: true,
    color: "primary",
    variant: "contained",
    onClick: handleSubmit,
    disabled: isSubmitting,
    ...otherProps
  };

  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
