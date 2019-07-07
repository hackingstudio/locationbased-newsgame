import React, { useEffect } from "react";

import Typography from "@material-ui/core/es/Typography";
import Grid from "@material-ui/core/es/Grid";
import Paper from "@material-ui/core/es/Paper";
import DoneIcon from "@material-ui/icons/Done";
import CountDown from "../../components/countDown";
import PlayerStatus from "../../components/playerStatus";

import { locationsMap, crestMap } from "../../assets/locations";
import styles from "./answer.module.scss";

const Answer = ({
  question,
  user,
  opponent,
  answers,
  result,
  startRound,
  addPoints,
}) => {
  const { content } = question || {};
  const defResult = result || {};

  useEffect(() => {
    if (!defResult.winner || !answers.self) {
      return;
    }
    addPoints(defResult.winner === answers.self);
  }, [defResult.winner, answers.self]);

  useEffect(() => {
    const timer = setTimeout(() => startRound(), 3000);
    return () => clearTimeout(timer);
  }, []);

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
          <Typography variant="h5">{content.question}</Typography>
          <Typography variant="body1">{content.description}</Typography>
        </Grid>
        {result &&
          [user, opponent].map(({ location }) => (
            <Grid item xs={6}>
              <Paper className={styles.answer}>
                <div>
                  <div className={styles.verticalCenter}>
                    <Typography variant="h5" component="h6">
                      {locationsMap[location]}
                    </Typography>
                    {result.winner === location && (
                      <DoneIcon fontSize="large" className={styles.checkMark} />
                    )}
                  </div>
                  <div className={styles.crest}>
                    {["self", "opponent"].map(
                      playerType =>
                        answers[playerType] === location && (
                          <img src={crestMap[playerType === "self" ? user.location : opponent.location]} />
                        ),
                    )}
                  </div>
                </div>
                {result.stats && (
                  <>
                    <Typography variant="h6" component="span">
                      {result.stats[location]}&nbsp;
                    </Typography>
                    <Typography variant="body2" component="span">
                      {question.content.unit}
                    </Typography>
                  </>
                )}
              </Paper>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Answer;
