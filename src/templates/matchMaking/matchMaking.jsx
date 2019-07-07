import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/es/Typography";
import Grid from "@material-ui/core/es/Grid";
import CircularProgress from "@material-ui/core/es/CircularProgress";

import CountDown from "../../components/countDown";
import PlayerCard from "../../components/playerCard";

import styles from "./matchMaking.module.scss";

const MatchMaking = ({ user, opponent, findOpponent, startRound }) => {
  useEffect(() => {
    if (!opponent) {
      const timer = setTimeout(() => {
        findOpponent();
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    } else {
      const timer = setTimeout(() => {
        startRound();
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [opponent]);

  return (
    <>
      {opponent && <CountDown time={3} />}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PlayerCard player={user} />
        </Grid>
        <Grid item xs={12} className={styles.text}>
          <Typography variant="h3" component="h2">
            {!opponent ? `Suche Gegner...` : `Gegner gefunden!`}
          </Typography>
        </Grid>
        <Grid item xs={12} className={styles.loading}>
          {opponent ? <PlayerCard player={opponent} /> : <CircularProgress />}
        </Grid>
      </Grid>
    </>
  );
};

MatchMaking.propTypes = {
  user: PropTypes.object,
  opponent: PropTypes.object,
  findOpponent: PropTypes.func.isRequired,
  startRound: PropTypes.func.isRequired,
};

export default MatchMaking;
