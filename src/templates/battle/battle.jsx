import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/es/Typography";
import TextField from "@material-ui/core/es/TextField";
import Select from "@material-ui/core/es/Select";
import MenuItem from "@material-ui/core/es/MenuItem";
import Button from "@material-ui/core/es/Button";
import LinearProgress from "@material-ui/core/es/LinearProgress";
import FormControl from "@material-ui/core/es/FormControl";
import FormHelperText from "@material-ui/core/es/FormHelperText";
import Grid from "@material-ui/core/es/Grid";
import Paper from "@material-ui/core/es/Paper";
import Avatar from "@material-ui/core/es/Avatar";
import CountDown from "../../components/countDown";
import PlayerStatus from "../../components/playerStatus";

import { locationsMap } from "../../assets/locations";
import styles from "./battle.module.scss";

const Battle = ({ question, subQuestion, user, opponent }) => {
    return (
        <>
            <CountDown />
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <PlayerStatus player={user} />
                </Grid>
                <Grid item xs={6}>
                    <PlayerStatus player={opponent} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">{question}</Typography>
                    <Typography variant="body1">{subQuestion}</Typography>
                </Grid>
                <Grid item xs={6} className={styles.flex}>
                    <Button color="primary" variant="contained" fullWidth>
                        {locationsMap[user.location]}
                    </Button>
                </Grid>
                <Grid item xs={6} className={styles.flex}>
                    <Button color="primary" variant="contained" fullWidth>
                        {locationsMap[opponent.location]}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

Battle.propTypes = {
    question: PropTypes.string,
    subQuestion: PropTypes.string
};

export default Battle;
