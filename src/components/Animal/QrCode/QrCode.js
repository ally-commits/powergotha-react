import React from 'react'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import LANG from '../../../translator';
import Dialog from '@material-ui/core/Dialog';
import QRCode from "react-qr-code";


const QrCode = () => {
    const [open,setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Tooltip title={LANG.VIEW + " " +  LANG.QR_CODE}>
                <IconButton onClick={() => setOpen(true)}>
                    <VisibilityRoundedIcon />
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <div className="modal-padding">
                    <QRCode value="hey" />
                </div>
            </Dialog>
        </React.Fragment>
    )
}

export default QrCode;