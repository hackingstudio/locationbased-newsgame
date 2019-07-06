import React from "react";

import Grid from "@material-ui/core/es/Grid";
import Avatar from "@material-ui/core/es/Avatar";
import Typography from "@material-ui/core/es/Typography";
import * as classNames from "classnames";

import { locationsMap } from "../assets/locations";
import unicoat from "../assets/unicoat.png";
import styles from "./playerStatus.module.scss";

const PlayerStatus = ({ player }) => (
    <Grid container spacing={2}>
        <Grid item xs={4}>
            <div className={styles.crest}>
                <div>
                    <img src={unicoat} />
                </div>
                <Typography variant="subtitle1" component="h4">
                    {locationsMap[player.location]}
                </Typography>
            </div>
        </Grid>

        <Grid item xs={8}>
            <Typography variant="h6" component="h3">
                {player.name}
            </Typography>
            <div className={styles.dots}>
                {player.score.map((won, i) => (
                    <div key={i} className={classNames(styles.dot, won ? styles.won : styles.lost)} />
                ))}
            </div>
        </Grid>
    </Grid>
);

export default PlayerStatus;
