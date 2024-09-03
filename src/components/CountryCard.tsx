import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface CountryName {
    common: string,
    official: string,
    nativeName: object
  }

interface FlagProps {
    png: string, 
    svg: string
}

interface CountryCardProps {
    name: CountryName;
    flags: FlagProps;
    capital: string;
    population: number;
    region: string;
    onClick: () => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ name, flags, capital, population, region, onClick }) => {
    return (
        <Card className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl cursor-pointer h-96" onClick={onClick}>
            <img className="w-full h-48 object-cover" src={flags.png} alt={`Flag of ${name}`} />
            <CardContent>
                <Typography variant="h6" component="div">{name.official}</Typography>
                <Typography variant="body2" color="text.secondary">Capital: {capital}</Typography>
                <Typography variant="body2" color="text.secondary">Population: {population.toLocaleString()}</Typography>
                <Typography variant="body2" color="text.secondary">Region: {region}</Typography>
            </CardContent>
        </Card>
    );
};

export default CountryCard;
