import React, { useState, useEffect } from "react";

import Typography from "@material-ui/core/es/Typography";
import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid";
import Paper from "@material-ui/core/es/Paper";
import Avatar from "@material-ui/core/es/Avatar";
import CircularProgress from "@material-ui/core/es/CircularProgress";

import CountDown from "../../components/countDown";
import PlayerCard from "../../components/playerCard";

import styles from "./matchMaking.module.scss";

const MatchMaking = ({ player }) => {
  const [opponent, setOpponent] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!opponent) {
        setOpponent({ name: "Robo-Jannes", location: "Bremen" });
      }
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (opponent) {
      const timer = setTimeout(() => {
        alert(`Starting game`);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [opponent]);

  return (
    <>
      {opponent && <CountDown time={3} />}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PlayerCard player={player} />
        </Grid>
        <Grid item xs={12} className={styles.text}>
          <Typography variant="h3" component="h2">
            {!opponent ? `Suche Gegner...` : `Gegner gefunden!`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {opponent ? <PlayerCard player={opponent} /> : <CircularProgress />}
        </Grid>
      </Grid>
    </>
  );
};

export default MatchMaking;
