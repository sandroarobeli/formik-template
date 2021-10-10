import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Alert Wrapper
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={7} ref={ref} variant="filled" {...props} />;
});

const SnackbarWrapper = (props) => {
  return (
    <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
      <Alert onClose={props.onClose} severity="success" width={props.width}>
        Submission successful!
      </Alert>
    </Snackbar>
  );
};

export default SnackbarWrapper;
// sx={{ width: "100%" }}