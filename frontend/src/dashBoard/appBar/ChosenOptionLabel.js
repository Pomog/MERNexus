import React from 'react';
import {Typography} from "@mui/material";
import { connect } from "react-redux";

const ChosenOptionLabel = ({ name }) => {
    return (
        <div>
            <Typography
                sx={{
                    fontSize: "16px",
                    color: "white",
                    fontWeight: "bold"
                }}
                >
                {`${name? `Chosen conversation: ${name}` : ""}`}
            </Typography>
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        name: state.chat.chosenChatDetails?.name,
    }
}
export default connect(mapStoreStateToProps)(ChosenOptionLabel);