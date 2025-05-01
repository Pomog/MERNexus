import React, {useEffect, useMemo, useState} from 'react';
import {validateMail} from '../../shared/utils/validators';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {DialogActions, DialogTitle, Typography} from "@mui/material";
import {debounce} from '@mui/material/utils';
import InputWithLabel from "../../shared/components/InputWithLable";
import {FORM} from '../../config/appConfig';
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import {getActions} from "../../store/actions/friendsActions";
import {connect} from "react-redux";

const AddFriendDialog = ({
                             isDialogOpen,
                             closeDialogHandler,
                             sendFriendInvitation = () => {
                             }
                         }) => {
    const [mail, setMail] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const handleSendInvitation = async () => {
        try {
            await sendFriendInvitation({
                targetMailAddress: mail
            }, handleCloseDialog);
          //  handleCloseDialog();
        } catch (err) {
            // you can choose to handle errors here too
            console.error(err);
        }
    }

        const handleCloseDialog = () => {
            closeDialogHandler();
            setMail('');
            setIsFormValid(false);
        }

        const debouncedValidate = useMemo(
            () =>
                debounce((value) => {
                    console.log('VALIDATE', value);
                    setIsFormValid(
                        validateMail(value),
                    );
                }, FORM.emailDebounceMs),
            [], // no deps
        );

        useEffect(() => {
            debouncedValidate(mail);
            return () => debouncedValidate.clear();
        }, [mail, debouncedValidate]);

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
                            label='Mail'
                            type='text'
                            value={mail}
                            setValue={setMail}
                            placeholder='e-mail'
                            maxLength={FORM.emailMaxLen}
                        />
                    </DialogContent>
                    <DialogActions>
                        <CustomPrimaryButton
                            onClick={handleSendInvitation}
                            disabled={!isFormValid}
                            label='Send'
                            additionalStyles={{
                                marginLeft: '15px',
                                marginRight: '15px',
                                marginBottom: '10px',
                            }}
                        />
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

    const mapActionsToProps = (dispatch) => {
        return {
            ...getActions(dispatch),
        };
    };

    export default connect(null, mapActionsToProps)(AddFriendDialog);