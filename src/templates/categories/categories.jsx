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
import CompareArrows from '@material-ui/icons/CompareArrows';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import LocalFlorist from '@material-ui/icons/LocalFlorist';
import LocalHospital from '@material-ui/icons/LocalHospital';
import * as locations from "../../assets/locations.json";
import styles from "./categories.module.scss";

const Categories = ({ choosing }) => {
    const [timeLeft, setTimeLeft] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(false), 10000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    const categories = [
        { name: "Bildung", icon: <CompareArrows className={styles.buttonIcon} /> },
        { name: "Umwelt", icon: <LocalFlorist className={styles.buttonIcon} /> },
        { name: "Arbeit & Wirtschaft", icon: <EuroSymbol className={styles.buttonIcon} /> },
        { name: "Gesundheit", icon: <LocalHospital className={styles.buttonIcon} /> }
    ];
    return (
        <>
            <CountDown />
            <Grid container spacing={3}>
                {choosing && (
                    <Grid item xs={12}>
                        <Typography variant="h3" component="h2">
                            Wähle eine Kategorie:
                        </Typography>
                    </Grid>
                )}
                {!choosing && (
                    <Grid item xs={12}>
                        <Typography variant="h3" component="h2">
                            Dein Gegner wählt eine Kategorie!
                        </Typography>
                    </Grid>
                )}
                {categories.map(category => (
                    <Grid item xs={12}key={category.name} >
                        <Button
                            color={!timeLeft ? "secondary" : "primary"}
                            variant="contained"
                            disabled={!choosing && timeLeft}
                            fullWidth
                        >
                            {category.icon}
                            {category.name}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

Categories.propTypes = {
    choosing: PropTypes.bool
};

export default Categories;
