import React from "react";

import Grid from "@material-ui/core/es/Grid";
import Typography from "@material-ui/core/es/Typography";
import * as classNames from "classnames";

import { locationsMap, crestMap } from "../assets/locations";
import styles from "./playerStatus.module.scss";

const PlayerStatus = ({ player, reverse = false }) => (
  <Grid container spacing={2} className={reverse ? styles.reverse : ""}>
    <Grid item>
      <div className={styles.crest}>
        <div>
          <img src={crestMap[player.location]} alt="" />
        </div>
        <Typography variant="subtitle1" component="h4">
          {locationsMap[player.location]}
        </Typography>
      </div>
    </Grid>

    <Grid item className={classNames(reverse ? styles.playerReverse : "", styles.player)}>
      <Typography variant="h6" component="h3">
        {player.name}
      </Typography>
      {player.score && <div className={classNames(reverse ? styles.dotsReverse : "", styles.dots)}>
        {player.score.map((won, i) => (
          <div key={i} className={classNames(styles.dot, won ? styles.won : styles.lost)} />
        ))}
      </div>}
    </Grid>
  </Grid>
);

export default PlayerStatus;
