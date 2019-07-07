import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/es/Typography";
import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid";
import CountDown from "../../components/countDown";
import PlayerStatus from "../../components/playerStatus";

import { locationsMap } from "../../assets/locations";

const Battle = ({ question, user, opponent, answers, setAnswer, nextStep, calculateResult }) => {
  const { content } = question || {};
  const hasChoosen = !!answers.self;

  useEffect(() => {
    if (hasChoosen) {
      calculateResult();
      const timer = setTimeout(() => nextStep(), 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => nextStep(), 10000);
      return () => clearTimeout(timer);
    }
  }, [hasChoosen]);

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
        {content && <Grid item xs={12}>
          <Typography variant="h5">{content.question}</Typography>
          <Typography variant="body1">{content.description}</Typography>
        </Grid>}
        {[user, opponent].map(({ location }) => {
          const selected = answers.self === location;
          return (
            <Grid item xs={6}>
              <Button
                color={!selected ? "primary" : "secondary"}
                disabled={hasChoosen && !selected}
                variant="contained"
                fullWidth
                onClick={() => setAnswer(location)}
              >
                {locationsMap[location]}
              </Button>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
};

Battle.propTypes = {
  question: PropTypes.object,
  user: PropTypes.object,
  opponent: PropTypes.object,
  answers: PropTypes.object,
  setAnswer: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default Battle;
