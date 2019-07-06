import React, { useState, useEffect } from "react";

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
import * as locations from "../../assets/locations.json";

const MatchMaking = () => {
    const [opponentFound, setOpponentFound] = useState(false);
    const [waitingTime, setWaitingTime] = useState(10);
    const [opponent, setOpponent] = useState(null);
    useEffect(() => {
        const progress = () => {
            setWaitingTime(oldWaitingTime => {
                if (oldWaitingTime <= 0.05) {
                    setOpponentFound(true);
                    setOpponent({ name: "Robo-Jannes", location: "Bremen" });
                    return 0;
                }
                return oldWaitingTime - 0.05;
            });
        };
        const timer = setInterval(progress, 50);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <>
            <Grid container spacing={3}>
                <Typography variant="h3" component="h2">
                    Dein Gegner:
                </Typography>
                <Grid item xs={12}>
                    {!opponentFound && <LinearProgress value={waitingTime * 10} variant="determinate" />}
                    {opponentFound && (
                        <Paper>
                            <Grid container spacing={1}>
                                <Avatar>RJ</Avatar>
                                <Typography variant="h4" component="h3">
                                    {opponent.name}
                                </Typography>
                            </Grid>
                            <Typography variant="h5">{opponent.location}</Typography>
                        </Paper>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {opponentFound && (
                        <Button color="primary" variant="contained">
                            Weiter
                        </Button>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default MatchMaking;
