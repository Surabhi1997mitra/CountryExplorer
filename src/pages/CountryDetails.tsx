import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import Navbar from '../components/NavBar';

const CountryDetails: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const country = useSelector((state: RootState) =>
        state.countries.countries.find(c => c.name.official === name)
    );

    if (!country) {
        return <Typography variant="h4">Country not found</Typography>;
    }

    return (
        <>
        <Navbar />
        <Grid container spacing={2} style={{ margin: 10 }}>
            <Grid item xs={12}>
                <Typography mb={2} fontFamily={"Gill Sans Extrabold"} variant="h3">{country.name.official}</Typography>
                <img src={country.flags.png} alt={`Flag of ${country.name}`} />
                <Typography fontFamily={"Gill Sans Extrabold"} variant="body1">Capital:<strong> {country.capital}</strong></Typography>
                <Typography fontFamily={"Gill Sans Extrabold"} variant="body1">Population: <strong>{country.population.toLocaleString()}</strong></Typography>
                <Typography fontFamily={"Gill Sans Extrabold"} variant="body1">Region:<strong> {country.region}</strong></Typography>
                {/* <Typography variant="body1">Subregion: {country.subregion}</Typography> */}
                <Card>
                    <CardContent>
                        <Typography variant="h6">Tourism Information</Typography>
                        <Typography variant="body2">
                            {/* Add mock or real data about tourism */}
                            Explore the rich culture and beautiful landscapes of {country.name.official}. 
                            From stunning architecture to delicious cuisine, {country.name.official} offers a diverse array of experiences for travelers.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </>
    );
};

export default CountryDetails;

