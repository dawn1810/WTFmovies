import { useState } from 'react';

// mui component
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
// icon
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import { useDispatch } from 'react-redux';
import { changeFbDialog, changeFbDialogType, changeRpContent } from '~/layouts/components/Header/headerSlice';

const ButtonMenu = ({ userCmt, commentId }: { userCmt: boolean; commentId: string }) => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenReport = () => {
        dispatch(changeFbDialog(true));
        dispatch(changeFbDialogType('report'));
        dispatch(changeRpContent('bình luận: ' + commentId));
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {userCmt && (
                    <>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Chỉnh sửa</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <RestoreIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Thu hồi</ListItemText>
                        </MenuItem>
                    </>
                )}
                <MenuItem onClick={handleOpenReport}>
                    <ListItemIcon>
                        <FlagOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Báo cáo</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ButtonMenu;
