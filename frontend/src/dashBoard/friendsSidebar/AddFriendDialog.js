import React, {useEffect, useState} from 'react';
import { validateMail } from '../../shared/utils/validators';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {DialogTitle, Typography} from "@mui/material";
import InputWithLabel from "../../shared/components/InputWithLable";

const AddFriendDialog = ({
    isDialogOpen,
    closeDialogHandler,
    sendFriendInvitation = () => {}
                         }) => {
    const [mail, setMail] = useState('');
    const[isFormValid, setIsFormValid] = useState(false);

    const handleSendInvitation = () => {
        // send friend request to server
    };

    const handleCloseDialog = () => {
        closeDialogHandler();
        setMail('');
    }

    useEffect(() => {
        setIsFormValid(validateMail(mail));
    }, [mail]);

    return (
        <div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>
                    <Typography>
                        Invite a Friend
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Enter e-mail address
                        </Typography>
                    </DialogContentText>
                        <InputWithLabel
                            lable='Mail'
                            type='text'
                            value={mail}
                            setValue={setMail}
                            placeholder='e-mail'
                        />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddFriendDialog;