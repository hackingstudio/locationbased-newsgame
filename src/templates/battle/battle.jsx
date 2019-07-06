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
import * as locations from "../../assets/locations.json";

const Battle = ({ question, ownCity, opponentCity }) => {
    return (
        <>
            <CountDown />
            <Grid container spacing={3}>
                <Paper>
                    <Typography variant="body1">{question}</Typography>
                </Paper>
                <Grid item xs={12}>
                    <Button color="primary" variant="contained">
                        {ownCity}
                    </Button>
                    <Button color="primary" variant="contained">
                        {opponentCity}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

Battle.propTypes = {
    question: PropTypes.string,
    ownCity: PropTypes.string,
    opponentCity: PropTypes.string
};

export default Battle;
