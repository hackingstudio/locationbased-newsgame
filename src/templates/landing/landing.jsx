import React from "react";
import Typography from "@material-ui/core/es/Typography";
import TextField from "@material-ui/core/es/TextField";
import Select from "@material-ui/core/es/Select";
import MenuItem from "@material-ui/core/es/MenuItem";
import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid";

import { useFormField } from "../../hooks/form";
import { locationsList } from "../../assets/locations";

const Landing = () => {
    const [location, handleLocationChanged] = useFormField("");
    return (
        <>
            <Grid container spacing={3}>
                <Typography variant="h2">Bürgerkrieg</Typography>
                <Grid item xs={12}>
                    <TextField fullWidth label="Name" />
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
                    <Button color="primary" variant="contained">
                        Weiter
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Landing;
