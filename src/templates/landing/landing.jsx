import React, { useCallback } from "react";
import Typography from "@material-ui/core/es/Typography";
import TextField from "@material-ui/core/es/TextField";
import Select from "@material-ui/core/es/Select";
import MenuItem from "@material-ui/core/es/MenuItem";
import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid";
import PropTypes from 'prop-types';

import { useFormField } from "../../hooks/form";
import { locationsList } from "../../assets/locations";

const Landing = ({ setUser, startGame }) => {
    const [name, handleNameChanged] = useFormField("");
    const [location, handleLocationChanged] = useFormField("");
    const handleSubmit = useCallback(() => {
        setUser(name, location);
        startGame();
    }, [name, location, setUser, startGame]);
    return (
        <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
            <Typography variant="h2">Bürgerkrieg</Typography>
            <Grid item xs={12}>
                <TextField fullWidth label="Name" value={name} onChange={handleNameChanged} />
            </Grid>
            <Grid item xs={12}>
                <Select fullWidth label="Deine Stadt" value={location} onChange={handleLocationChanged}>
                    {locationsList.map(location => (
                        <MenuItem key={location.id} value={location.id}>
                            {location.name}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={12}>
                <Button color="primary" variant="contained" type="submit">
                    Weiter
                    </Button>
            </Grid>
        </Grid>
    );
};

Landing.propTypes = {
    setUser: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
}

export default Landing;
