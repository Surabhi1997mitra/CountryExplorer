import { Typography } from "@mui/material";
import React from "react";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const Empty = () => {
    return (
        <div className="flex flex-col justify-center items-center content-center h-full">
            <SentimentVeryDissatisfiedIcon />
            <div>
                <Typography variant="h5"> 
                No elements present!! 
                Please search some other country.
            </Typography>
            </div>
        </div>
    )
}

export default Empty;