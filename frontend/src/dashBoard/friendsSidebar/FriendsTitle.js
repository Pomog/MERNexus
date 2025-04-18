import React from 'react';
import { useTheme } from '@mui/material/styles';
import {Typography} from "@mui/material";
import PropTypes from "prop-types";



const FriendsTitle = ({title}) => {
    const theme = useTheme();

    return (
        <Typography
            variant="caption"
            sx={{
                textTransform: 'uppercase',
                color: theme.palette.text.secondary,
                marginTop: theme.spacing(1),
            }}
        >
            {title}
        </Typography>
    );
};

FriendsTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default FriendsTitle;