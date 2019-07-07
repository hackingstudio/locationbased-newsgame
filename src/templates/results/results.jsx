import React, { useMemo } from "react";
import DWChart from 'react-datawrapper-chart'

import Typography from "@material-ui/core/es/Typography";
import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid";
import Paper from "@material-ui/core/es/Paper";
import CakeIcon from "@material-ui/icons/Cake";

import { locationsMap } from "../../assets/locations";
import styles from "./results.module.scss";

const Results = ({ user, opponent, history, startGame }) => {
  const winState = useMemo(() => {
    const userWon = (user.score || []).filter(x => x).length;
    const oppWon = (opponent.score || []).filter(x => x).length;

    if (userWon > oppWon) {
      return "win";
    } else if (userWon < oppWon) {
      return "lost";
    }
    return "draw";
  }, [user, opponent])

  if (!history) {
    return "Waiting...";
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
        <Button color="primary" variant="contained" fullWidth onClick={startGame}>
          Neues Spiel
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button color="secondary" variant="contained" fullWidth disabled>
          Menü
        </Button>
      </Grid>
      {history.map(item => {
        const { map } = item.question.content;
        return (
          <Grid item xs={12}>
            <Paper className={styles.answers}>
              <Typography variant="h5">
                {item.question.content.question}
              </Typography>
              <div className={styles.result}>
                <Typography variant="h4">{locationsMap[item.result.winner]}</Typography>
              </div>
              {map && <DWChart src={map} />}
              <Typography variant="body1">
                <span style={{ textTransform: "uppercase", color: "grey" }}>Beispieltext</span>
                <p>Die Umwelt schützen ist wichtig – auch den Essenern. 2020 soll in der Innenstadt die erste „Umweltspur“ entstehen – die dann nur von umweltfreundlichen Fahrzeugen benutzt werden darf.</p>
                <a href="https://www.nrz.de/staedte/essen/essen-soll-im-sommer-2020-eine-erste-umweltspur-bekommen-id217108547.html">
                  Artikel: Erste Umweltspur in Essen (NRZ)
                </a>
              </Typography>
            </Paper>
          </Grid>
        )
      })}
    </Grid>
  );
};

export default Results;
