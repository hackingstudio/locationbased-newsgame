import React, { useState, useEffect } from "react";

import Typography from "@material-ui/core/es/Typography";
import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid";
import Paper from "@material-ui/core/es/Paper";
import Avatar from "@material-ui/core/es/Avatar";

import CountDown from "../../components/countDown";

const MatchMaking = () => {
    const [opponentFound, setOpponentFound] = useState(false);
    const [opponent, setOpponent] = useState(null);

    return (
        <>
            <CountDown />
            <Grid container spacing={3}>
                <Typography variant="h3" component="h2">
                    Dein Gegner:
                </Typography>
                <Grid item xs={12}>
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
