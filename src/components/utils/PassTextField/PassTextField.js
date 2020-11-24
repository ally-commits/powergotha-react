import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const PassTextField = (props) => {
    const [type,setType] = React.useState("password")
    return (
        <TextField
            {...props}
            type={type}
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <IconButton
                        onClick={() => setType(type == "text" ? "password" : "text")}
                        >
                        {type == "text" ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
            }}
        />
    )
}

export default PassTextField;