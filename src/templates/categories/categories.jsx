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

const Categories = ({ choosing }) => {
    const [timeLeft, setTimeLeft] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(false), 10000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    const categories = ["Bildung", "Umwelt", "Arbeit& Wirtschaft", "Gesundheit"];
    return (
        <>
            <CountDown />
            <Grid container spacing={3}>
                {choosing && (
                    <Typography variant="h3" component="h2">
                        Wähle eine Kategorie:
                    </Typography>
                )}
                {!choosing && (
                    <Typography variant="h3" component="h2">
                        Dein Gegner wählt eine Kategorie!
                    </Typography>
                )}
                <Grid item xs={12}>
                    {categories.map(category => (
                        <Button
                            color={!timeLeft ? "secondary" : "primary"}
                            variant="contained"
                            disabled={!choosing && timeLeft}
                            fullWidth
                            key={category}
                        >
                            {category}
                        </Button>
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

Categories.propTypes = {
    choosing: PropTypes.bool
};

export default Categories;
