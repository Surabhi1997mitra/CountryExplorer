import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries } from '../redux/countriesSlice';
import { RootState, AppDispatch } from '../redux/store';
import CountryCard from '../components/CountryCard';
import { Grid, CircularProgress, Typography } from '@mui/material';
import Navbar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Empty from '../components/Empty';

interface CountryName {
    common: string,
    official: string,
    nativeName: object
  }
  
  interface FlagProps {
    png: string, 
    svg: string
  }
  
  interface Country {
      name: CountryName;
      capital: string;
      population: number;
      flags: FlagProps;
      region: string;
  }
const Homepage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { countries, loading, error } = useSelector((state: RootState) => state.countries);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
    const [searchedKey, setSearchedKey] = useState<string>('')

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    useEffect(() => {
        setFilteredCountries(countries)
    }, [countries])

    const handleCardClick = (countryName: string) => {
        navigate(`/country/${countryName}`);
        console.log(`Navigating to ${countryName}`);
    };


    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }
 
    const handleSearch = (e: any) => {
        console.log(e)
        e.preventDefault();
        const filtered = countries.filter((country) => {
            if(country.name.official.toLowerCase().includes(searchedKey.toLowerCase()) 
                || country.name.common.toLowerCase().includes(searchedKey.toLowerCase())) return true;
            return false;
        })
        setFilteredCountries(filtered)
    }

    const SearchBar = () => {
        return (
            <form onSubmit={handleSearch} style={{ height: 60 }}>
                <input  
                    style={{width: 500, border: "1px solid grey", borderRadius: 10, margin: 10, padding: 10}}
                    value={searchedKey}
                    onChange={(e) => setSearchedKey(e.target.value)}
                    placeholder={"Search country..."}
                />
                <button type="submit" style={{ background: "#b1b1b1", padding: "0.5em", borderRadius: 10, fontWeight: 500}}>
                    <SearchIcon /> Search
                </button>
            </form>
        )
    }

    return (
        <>
            <Navbar />
            {SearchBar()}
            <div style={{height: "calc(100vh - 64px - 60px"}}>
            {filteredCountries.length ? 
                <Grid container spacing={6} style={{ padding: 20 }}>
                    {filteredCountries.map((country) => (
                        <Grid item xs={12} sm={3} md={3} key={country.name.official}>
                            <CountryCard
                                name={country.name}
                                flags={country.flags}
                                capital={country.capital}
                                population={country.population}
                                region={country.region}
                                onClick={() => handleCardClick(country.name.official)}
                            />
                        </Grid>
                    )
                    )}
                </Grid>
            : 
            <Empty />
            }
            </div>
        </>
    );
};

export default Homepage;