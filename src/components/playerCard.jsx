import React from "react";

import Paper from "@material-ui/core/es/Paper";
import Grid from "@material-ui/core/es/Grid";
import Typography from "@material-ui/core/es/Typography";

import { crestMap } from "../assets/locations";
import { locationsMap } from "../assets/locations";
import styles from "./playerCard.module.scss";

const PlayerCard = ({ player }) => (
  <Paper className={styles.players}>
    <Grid container spacing={1} className={styles.player}>
      <Typography variant="h4" component="h3">
        {player.name}
      </Typography>
    </Grid>
    <img className={styles.crest} src={crestMap[player.location]} alt="" />
    <Grid container spacing={1} className={styles.player}>
      <Typography variant="h5">{locationsMap[player.location]}</Typography>
    </Grid>
  </Paper>
);

export default PlayerCard;
