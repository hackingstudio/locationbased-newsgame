import React, { } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/es/Typography";
import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid";
import CountDown from "../../components/countDown";
import PlayerStatus from "../../components/playerStatus";

import { locationsMap } from "../../assets/locations";

const Battle = ({ question, subQuestion, user, opponent }) => {
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
          <Typography variant="h5">{question}</Typography>
          <Typography variant="body1">{subQuestion}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button color="primary" variant="contained" fullWidth>
            {locationsMap[user.location]}
          </Button>
        </Grid>
        <Grid item xs={6}>
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
