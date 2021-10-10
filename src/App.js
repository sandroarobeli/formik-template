// Third party imports
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import { object, string, number, date, boolean } from "yup";
import CssBaseline from '@mui/material/CssBaseline'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";


// Custom imports
import TextFieldWrapper from "./components/TextField";
import SelectWrapper from './components/Select'
import DateTimePicker from './components/DateTimePicker'
import CheckboxWrapper from './components/Checkbox'
import ButtonWrapper from './components/Button'
import SnackbarWrapper from './components/Snackbar'
import states from './data/states.json'
import countries from './data/countries.json'

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 641,
      laptop: 1008
    }
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    fontFamily: "Open Sans, sans-serif"
  },
  formWrapper: {
    textAlign: 'left',
    maxWidth: theme.breakpoints.values.tablet,
    margin: `${theme.spacing(10)} auto`,
    padding: theme.spacing(5),
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.60)"
  },
}))

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  departureDate: "",
  arrivalDate: "",
  message: "",
  termsOfService: false
}

// Sets predetermined constants for earliest and latest dates
const minDate = new Date();
minDate.setDate(minDate.getDate() - 1);
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 90);

// validationSchema
const validationSchema = object({
  firstName: string().required("First name required"),
  lastName: string().required('Last name required'),
  email: string().email("Invalid email").required("Email required"),
  phone: number()
    .positive("The number must be positive")
    .integer("The number must be an integer")
    .typeError("Please enter a valid phone number")
    .required("Phone number required"),
  addressLine1: string().required("Address required"),
  addressLine2: string(),
  city: string().required("City required"),
  state: string().required("State required"),
  country: string().required("Country required"),
  departureDate: date()
    .required("Date of departure required")
    .max(maxDate, "Reservation must be within 90 days")
    .min(minDate, "Cannot use past days"),
  arrivalDate: date()
    .required("Date of arrival required")
    .max(maxDate, "Reservation must be within 90 days")
    .min(minDate, "Cannot use past days"),
  message: string(),
  termsOfService: boolean()
    .oneOf([true], "The terms and conditions must be accepted.")
    .required("The terms and conditions must be accepted.")
})

const MainModule = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  // actions = { setSubmitting, resetForm, isSubmitting }
  const submitHandler = (values, actions) => {
    setTimeout(() => {
      // setSubmitting not needed with async
      actions.setSubmitting(false);
      //actions.resetForm(initialFormState);
      setOpen(true);
      console.log(values); // test
    }, 2000)
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Container className={classes.formWrapper}>
        <Formik
          initialValues={initialFormState}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {
            ({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item mobile={12}>
                    <Typography style={{ fontFamily: "Fleur De Leah, cursive", fontSize: "2rem" }}>
                      Personal Details
                    </Typography>
                  </Grid>
                  <Grid item mobile={12} tablet={6}>
                    <TextFieldWrapper
                      name='firstName'
                      label='First Name'
                      type='text'
                    />
                  </Grid>
                  <Grid item mobile={12} tablet={6}>
                    <TextFieldWrapper
                      name='lastName'
                      label='Last Name'
                      type='text'
                    />
                  </Grid>
                  <Grid item mobile={12}>
                    <TextFieldWrapper
                      name='email'
                      label="Email"
                      type='email'
                    />
                  </Grid>
                  <Grid item mobile={12}>
                    <TextFieldWrapper
                      name='phone'
                      label="Phone"
                      type='number'
                    />
                  </Grid>
                  <Grid item mobile={12}>
                    <Typography style={{ fontFamily: "Fleur De Leah, cursive", fontSize: "2rem" }}>
                      Address
                    </Typography>
                  </Grid>
                  <Grid item mobile={12}>
                    <TextFieldWrapper
                      name='addressLine1'
                      label='Address Line 1'
                      type='text'
                    />
                  </Grid>
                  <Grid item mobile={12}>
                    <TextFieldWrapper
                      name='addressLine2'
                      label='Address Line 2'
                      type='text'
                    />
                  </Grid>
                  <Grid item mobile={12} tablet={6}>
                    <TextFieldWrapper
                      name='city'
                      label='City'
                      type='text'
                    />
                  </Grid>
                  <Grid item mobile={12} tablet={6}>
                    <SelectWrapper
                      name='state'
                      label='State'
                      type='text'
                      options={states}
                    />
                  </Grid>
                  <Grid item mobile={12}>
                    <SelectWrapper
                      name='country'
                      label='Country'
                      type='text'
                      options={countries}
                    />
                  </Grid>
                  <Grid item mobile={12}>
                    <Typography style={{ fontFamily: "Fleur De Leah, cursive", fontSize: "2rem" }}>
                      Booking Dates
                    </Typography>
                  </Grid>
                  <Grid item mobile={12} tablet={6}>
                    <DateTimePicker name='departureDate' label='Departure Date' />
                  </Grid>
                  <Grid item mobile={12} tablet={6}>
                    <DateTimePicker name='arrivalDate' label='Arrival Date' />
                  </Grid>
                  <Grid item mobile={12}>
                    <Typography style={{ fontFamily: "Fleur De Leah, cursive", fontSize: "2rem" }}>
                      Special Notes
                    </Typography>
                  </Grid>
                  {
                    isSubmitting && (
                      <Grid item mobile={12}>
                        <LinearProgress />
                      </Grid>
                    )
                  }
                  <Grid item mobile={12}>
                    <TextFieldWrapper
                      name='message'
                      label='Enter your message'
                      multiline
                      rows={5}
                    />
                  </Grid>
                  <Grid item mobile={12}>
                    <CheckboxWrapper
                      name='termsOfService'
                      legend='Terms of Service'
                      label='I Agree'
                    />
                  </Grid>
                  <Grid item mobile={12}>
                    <ButtonWrapper>submit form</ButtonWrapper>
                  </Grid>
                  <Grid item mobile={12} tablet={6} desktop={3}>
                    <SnackbarWrapper open={open} onClose={handleClose} width={theme.breakpoints.values === 'mobile' ? '80%' : '25%'} />
                  </Grid>
                </Grid>
              </Form>
            )
          }
        </Formik>
      </Container>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainModule />
    </ThemeProvider>
  );
}

export default App;
