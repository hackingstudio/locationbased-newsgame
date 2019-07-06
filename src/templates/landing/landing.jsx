import React from 'react';
import { useFormField } from '../../hooks/form';

import Typography from '@material-ui/core/es/Typography';
import TextField from '@material-ui/core/es/TextField';
import Select from '@material-ui/core/es/Select';
import MenuItem from '@material-ui/core/es/MenuItem';
import Button from '@material-ui/core/es/Button';
import FormControl from '@material-ui/core/es/FormControl';
import FormHelperText from '@material-ui/core/es/FormHelperText';
import Grid from '@material-ui/core/es/Grid';
import locations from '../../assets/locations.json';

const sortedLocations = locations.sort((a, b) => a.name > b.name ? 1 : -1);
const Landing = () => {
    const [location, handleLocationChanged]=useFormField('');
    return (
        <>
            <Grid container spacing={3}>
                <Typography variant='h2'>Bürgerkrieg</Typography>
                <Grid item xs={12}>
                    <TextField fullWidth
                        label="Name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Select fullWidth
                        label="Deine Stadt"
                        value={location}
                        onChange={handleLocationChanged}
                    >{sortedLocations.map((location) => <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Button color='primary' variant='contained'>Weiter</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Landing;