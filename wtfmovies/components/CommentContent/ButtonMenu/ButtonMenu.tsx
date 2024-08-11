import { useState } from 'react';

// mui component
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useSession } from 'next-auth/react';

//type
import { ExtendedUser } from '~/libs/interfaces';
// icon
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import { useDispatch } from 'react-redux';
import {
    changeFbDialog,
    changeFbDialogType,
    changeModalShow,
    changeRpContent,
} from '~/layouts/components/Header/headerSlice';
import { removeCommentsById, removeReplyById } from '../commentSlice';
import { showNotify } from '~/components/Notify/notifySlide';
import EditDialog from './EditDialog';

const ButtonMenu = ({
    commentInfo,
}: {
    commentInfo: { senderEmail: string; commentId: string; parentId?: string; content: string };
}) => {
    const { senderEmail, commentId, parentId } = commentInfo;
    const dispatch = useDispatch();

    const { data: session } = useSession();
    const extendedUser: ExtendedUser | undefined = session?.user;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const open = Boolean(anchorEl);

    const handleOpenEdit = () => {
        setOpenEditDialog(true);
        setAnchorEl(null);
    };

    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    };

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: false }));
    };

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
        setAnchorEl(null);
    };

    const handleRecallComment = async () => {
        const response = await fetch(`/api/v1/comment/recallComment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                commentId,
                senderEmail,
                parentId,
            }),
        });

        if (response.ok) {
            if (parentId) dispatch(removeReplyById({ parentId, commentId }));
            else dispatch(removeCommentsById(commentId));
            setAnchorEl(null);
        } else if (response.status === 400) {
            showAlert('Thu hồi bình luận thất bại!', 'error');
        } else if (response.status === 401) {
            showAlert('Thu hồi bình luận không hợp lệ', 'error');
        } else if (response.status === 403) {
            dispatch(changeModalShow(true));
            showAlert('Xác thực thất bại, đăng nhập để thu hồi bình luận này', 'info');
        } else if (response.status === 500) {
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
    };

    return (
        <>
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
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {senderEmail === extendedUser?.email && (
                        <div>
                            <MenuItem onClick={handleOpenEdit}>
                                <ListItemIcon>
                                    <EditIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Chỉnh sửa</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleRecallComment}>
                                <ListItemIcon>
                                    <RestoreIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Thu hồi</ListItemText>
                            </MenuItem>
                        </div>
                    )}
                    <MenuItem onClick={handleOpenReport}>
                        <ListItemIcon>
                            <FlagOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Báo cáo</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
            <EditDialog open={openEditDialog} handleClose={handleCloseEdit} commentInfo={commentInfo} />
        </>
    );
};

export default ButtonMenu;
