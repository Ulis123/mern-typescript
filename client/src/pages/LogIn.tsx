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
import { LogInValuesType, ValidationErrorsType } from "../types";

interface LogInPropTypes {
  handleSubmitLogIn: (e: FormEvent) => void;
  logInValues: LogInValuesType;
  setLogInValues: Dispatch<LogInValuesType>;
  errors: ValidationErrorsType;
  message: { type: string; message: string };
}

const Copyright: React.FC = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <Link color="inherit" href="https://material-ui.com/">
      Your Website
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LogIn: React.FC<LogInPropTypes> = ({
  handleSubmitLogIn,
  logInValues,
  setLogInValues,
  errors,
  message,
}): JSX.Element => {
  const classes = useStyles();

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { name, value } = e.target;
    // @ts-ignore
    setLogInValues((prevState: LogInValuesType) => ({
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
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmitLogIn}>
          <TextField
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            variant="outlined"
            margin="normal"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            value={logInValues.email}
            onChange={handleInputs}
            autoFocus
          />
          <TextField
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            variant="outlined"
            margin="normal"
            name="password"
            label="Password"
            type="password"
            value={logInValues.password}
            onChange={handleInputs}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signup" variant="body2" component={RouterLink}>
                {"Don't have an account? Sign Up"}
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default LogIn;
