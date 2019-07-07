import React, { useState, useEffect } from "react";

import Typography from "@material-ui/core/es/Typography";
import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid";
import Paper from "@material-ui/core/es/Paper";
import Avatar from "@material-ui/core/es/Avatar";
import CircularProgress from "@material-ui/core/es/CircularProgress";

import CountDown from "../../components/countDown";
import PlayerCard from "../../components/playerCard";

import CakeIcon from "@material-ui/icons/Cake";

import styles from "./results.module.scss";

const Results = ({ user, opponent, history }) => {
  let winState;

  const userWon = user.score.filter(x => x).length;
  const oppWon = opponent.score.filter(x => x).length;

  if (userWon > oppWon) {
    winState = "win";
  } else if (userWon < oppWon) {
    winState = "lost";
  } else {
    winState = "draw";
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={styles.winner}>
        <Typography variant="h3">
          {winState === "win" && `Du hast gewonnen!`}
          {winState === "lost" && `Du bist Zweite*r!`}
          {winState === "draw" && `Unentschieden!`}
        </Typography>
        <CakeIcon />
      </Grid>
      <Grid item xs={6}>
        <Button color="primary" variant="contained" fullWidth>
          Neues Spiel
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button color="secondary" variant="contained" fullWidth disabled>
          Menü
        </Button>
      </Grid>
      {history.map(item => (
        <Grid item xs={12}>
          <Paper className={styles.answers}>
            <Typography variant="h5">
              {item.question.content.question}
            </Typography>
            <div className={styles.result}>
              <Typography variant="h4">Neuruppin</Typography>
            </div>
            <Typography variant="body">
              Mehr Infos: <a href={item.link}>{item.link}</a>
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Results;
