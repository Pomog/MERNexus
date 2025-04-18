import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {main: '#3ba55d'},
        background: {
            default: '#40434a',
            paper:   '#2F3136',
        },
        text: {secondary: '#8e9297'},
    },
    shape: {
        borderRadius: '4px',
    },
    typography: {
        caption: {fontSize: '14px'},
    },
    spacing: 8,
});

export default theme;