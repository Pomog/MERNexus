import React from 'react';
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";

const additionalStyles = {
    marginTop: '10px',
    marginLeft: '5px',
    widths: '80%',
    height: '30px',
    backgroundColor: '#3ba55d',
}

const AddFriendButton = () => {
    const handleOpenAddFriendDialog = () => {

    };

    return (
        <>
            <CustomPrimaryButton
                additionalStyles={additionalStyles}
                label='Add Friend'
                onClick={handleOpenAddFriendDialog}
            />

        </>
    );
};


export default AddFriendButton;