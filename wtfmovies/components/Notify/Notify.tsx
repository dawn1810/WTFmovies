'use client';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { notifySelector } from '~/redux/selectors';
import { changeNotifyOpen } from '~/redux/actions';

function Notify() {
    const dispatch = useDispatch();
    const state = useSelector(notifySelector);

    const handleClose = () => {
        dispatch(changeNotifyOpen(!state.open));
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={state.open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={state.type} variant="filled" sx={{ width: '100%' }}>
                {state.content}
            </Alert>
        </Snackbar>
    );
}

export default Notify;
