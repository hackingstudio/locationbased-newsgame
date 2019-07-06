import React from "react";

import Paper from "@material-ui/core/es/Paper";
import Grid from "@material-ui/core/es/Grid";
import Avatar from "@material-ui/core/es/Avatar";
import Typography from "@material-ui/core/es/Typography";

import unicoat from "../assets/unicoat.png";
import styles from "./playerCard.module.scss";

const PlayerCard = ({ player }) => (
    <Paper>
        <Grid container spacing={1}>
            <Avatar>{player.name[0].toUpperCase()}</Avatar>
            <Typography variant="h4" component="h3">
                {player.name}
            </Typography>
        </Grid>
        <img className={styles.crest} src={unicoat} />
        <Typography variant="h5">{player.location}</Typography>
    </Paper>
);

export default PlayerCard;
