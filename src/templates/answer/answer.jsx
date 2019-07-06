import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

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
import unicoat from "../../assets/unicoat.png";

import { locationsMap } from "../../assets/locations";
import styles from "./answer.module.scss";

const Answer = ({ answer, subAnswer, user, opponent }) => {
    return (
        <>
            <CountDown />
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <PlayerStatus player={user} />
                </Grid>
                <Grid item xs={6}>
                    <PlayerStatus player={opponent} reverse />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">{answer}</Typography>
                    <Typography variant="body1">{subAnswer}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={styles.answer}>
                        {locationsMap[user.location]}
                        <div className={styles.crest}>
                            <img src={unicoat} />
                            <img src={unicoat} />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={styles.answer}>
                        {locationsMap[opponent.location]}
                        <div className={styles.crest}>
                            <img src={unicoat} />
                            <img src={unicoat} />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

Answer.propTypes = {
    answer: PropTypes.string,
    subAnswer: PropTypes.string
};

export default Answer;
