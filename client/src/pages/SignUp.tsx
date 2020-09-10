import React, { ChangeEvent, Dispatch, FormEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import { SignUpValuesType, ValidationErrorsType } from "../types";

interface SignUpPropTypes {
  handleSubmitSignUp: (e: FormEvent) => void;
  signUpValues: SignUpValuesType;
  setInputValues: Dispatch<SignUpValuesType>;
  errors: ValidationErrorsType;
  message: { type: string; message: string };
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: React.FC<SignUpPropTypes> = ({
  handleSubmitSignUp,
  signUpValues,
  setInputValues,
  errors,
  message,
}) => {
  const classes = useStyles();

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { name, value } = e.target;
    // @ts-ignore
    setInputValues((prevState: SignUpValuesType) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmitSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.username}
                helperText={errors.username}
                autoComplete="username"
                name="username"
                variant="outlined"
                fullWidth
                label="Username"
                autoFocus
                value={signUpValues.username}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                fullWidth
                label="Name"
                name="name"
                autoComplete="name"
                value={signUpValues.name}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={signUpValues.email}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.password}
                helperText={errors.password}
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={signUpValues.password}
                onChange={handleInputs}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2" component={RouterLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {message && (
        <h2 style={{ color: message.type === "error" ? "red" : "green" }}>
          {message.message}
        </h2>
      )}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default SignUp;
