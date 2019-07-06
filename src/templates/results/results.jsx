import React, { useState, useEffect } from "react";

import Typography from "@material-ui/core/es/Typography";
import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid";
import Paper from "@material-ui/core/es/Paper";
import Avatar from "@material-ui/core/es/Avatar";
import CircularProgress from "@material-ui/core/es/CircularProgress";

import CountDown from "../../components/countDown";
import PlayerCard from "../../components/playerCard";

const Results = ({ user, opponent, questions }) => {
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
            <Grid item xs={12}>
                <Typography variant="h3">
                    {winState === "win" && `Du hast gewonnen!`}
                    {winState === "lost" && `Du bist Zweite*r!`}
                    {winState === "draw" && `Unentschieden!`}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Button color="primary" variant="contained" fullWidth>Neues Spiel</Button>
            </Grid>
            <Grid item xs={6}>
                <Button color="secondary" variant="contained" fullWidth disabled>
                    Menü
                </Button>
            </Grid>
            {questions.map(question => (
                <Grid item xs={12}>
                    <Paper>
                        <Typography variant="h4">{question.question}</Typography>
                        <Typography variant="body">{question.subquestion}</Typography>
                        <Typography variant="body">
                            Mehr Infos: <a href={question.link} />
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default Results;
