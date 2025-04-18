import React from 'react';
import Button from '@mui/material/Button';

const CustomPrimaryButton = ({
                                 label,
                                 additionalStyles,
                                 disabled,
                                 onClick,
                             }) => {
    return <Button
        variant='contained'
        sx={{
            backgroundColor: '#5865F2',
            color: 'white',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 500,
            width: '100%',
            height: '40px',
            borderRadius: theme => theme.shape.borderRadius,
        }}
        style={additionalStyles ? additionalStyles : {}}
        disabled={disabled}
        onClick={onClick}
    >
        {label}
    </Button>;
};

export default CustomPrimaryButton;