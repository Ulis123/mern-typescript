import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import setAuthToken from "../utils/setAuthToken";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const About: React.FC = () => {
  const classes = useStyles();

  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get("/api/me");
      setUser(res.data.user);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        {errorMessage ? (
          <h2>{errorMessage}</h2>
        ) : (
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {user && user.name}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              {user && user.email}
            </Typography>
          </Container>
        )}
      </div>
    </main>
  );
};

export default About;
