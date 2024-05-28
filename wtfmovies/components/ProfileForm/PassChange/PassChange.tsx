import classNames from 'classnames/bind';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { AlertColor, Divider } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';

import style from '~/components/ProfileForm/ProfileInfo/UserInfo.module.scss';
import { validatePassword } from '~/libs/clientFunc';
import PassInput from '~/components/PassInput';
import { useDispatch } from 'react-redux';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';

const cx = classNames.bind(style);

// const PassInput = ({
//     label,
//     placeholder,
//     value,
//     helpText,
//     inputName,
//     onChange,
// }: {
//     label: string;
//     placeholder: string;
//     value?: string;
//     helpText?: string;
//     inputName?: string;
//     onChange?: (event: any) => void;
// }) => {
//     const [showPassword, setShowPassword] = useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//     };

//     return (
//         <div className={cx('user-info')}>
//             <div className={cx('user-info-tags')}>
//                 <span>{label}</span>
//             </div>
//             <TextField
//                 className={cx('user-info-txt-input')}
//                 value={value}
//                 placeholder={placeholder}
//                 type={showPassword ? 'text' : 'password'}
//                 helperText={helpText}
//                 error={!!helpText}
//                 name={inputName}
//                 InputProps={{
//                     endAdornment: (
//                         <InputAdornment position="end">
//                             <IconButton
//                                 aria-label="toggle password visibility"
//                                 onClick={handleClickShowPassword}
//                                 onMouseDown={handleMouseDownPassword}
//                                 edge="end"
//                             >
//                                 {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
//                             </IconButton>
//                         </InputAdornment>
//                     ),
//                 }}
//                 onChange={onChange}
//             />
//         </div>
//     );
// };

function PassChange() {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    const [validated, setValidated] = useState({
        oldPass: '',
        newPass: '',
        rnewPass: '',
    });
    const [info, setInfo] = useState({ oldPass: '', newPass: '', rnewPass: '' });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: any) => {
        setInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }));
        setValidated((prev) => ({ ...prev, [event.target.name]: '' }));
    };
    const handleSubmit = async () => {
        if (info.oldPass.length === 0) {
            setValidated({ oldPass: 'Nhập mật khẩu cũ của bạn', newPass: '', rnewPass: '' });
        } else if (validatePassword(info.newPass) !== 0) {
            switch (validatePassword(info.newPass)) {
                case 1:
                    setValidated({ rnewPass: '', oldPass: '', newPass: 'Mật khẩu phải dài hơn 8 kí tự!' });
                    break;
                case 2:
                    setValidated({ rnewPass: '', oldPass: '', newPass: 'Mật khẩu phải nhỏ hơn 50 kí tự!' });
                    break;
                case 3:
                    setValidated({ rnewPass: '', oldPass: '', newPass: 'Mật khẩu không hợp lệ!' });
                    break;
                case 4:
                    setValidated({
                        rnewPass: '',
                        oldPass: '',
                        newPass: 'Mật khẩu phải bao gồm kí tự đặc biệt, chữ cái in thường, in hoa và chữ số!',
                    });
                    break;
                default:
                    setValidated({ oldPass: '', newPass: 'Mật khẩu không hợp lệ', rnewPass: '' });
                    break;
            }
        } else if (info.rnewPass !== info.newPass) {
            setValidated((prev) => ({
                oldPass: '',
                newPass: '',
                rnewPass: 'Mật khẩu nhập lại không trùng khớp',
            }));
        } else {
            setLoading(true);
            const response = await fetch('/api/v1/profile/changePass', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldPass: info.oldPass, newPass: info.rnewPass }),
            });

            if (response.ok) {
                setInfo({ oldPass: '', newPass: '', rnewPass: '' });
                showAlert('Thay đổi mật khẩu thành công', 'success');
            } else if (response.status === 400) {
                setValidated({ oldPass: '何？', newPass: '', rnewPass: '' });
            } else if (response.status === 401) {
                setInfo((prev) => ({ ...prev, oldPass: '' }));
                setValidated({ oldPass: 'Mật khẩu không chính xác', newPass: '', rnewPass: '' });
            } else if (response.status === 422) {
                showAlert('Thông tin thay đổi mật khẩu không hợp lệ', 'error');
            } else if (response.status === 500) {
                showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
            setLoading(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Divider textAlign="left" className={cx('divider')}>
                THAY ĐỔI MẬT KHẨU
            </Divider>
            <PassInput
                label="Mật khẩu cũ"
                value={info.oldPass}
                placeholder="Enter old password"
                helpText={validated.oldPass}
                inputName="oldPass"
                onChange={handleInputChange}
            />

            <PassInput
                label="Mật khẩu mới"
                value={info.newPass}
                placeholder="Enter new password"
                helpText={validated.newPass}
                inputName="newPass"
                onChange={handleInputChange}
            />
            <PassInput
                label="Nhập lại mật khẩu mới"
                value={info.rnewPass}
                placeholder="Enter new password again"
                helpText={validated.rnewPass}
                inputName="rnewPass"
                onChange={handleInputChange}
            />
            <LoadingButton
                loading={loading}
                variant="contained"
                startIcon={<SaveOutlined />}
                className={cx('bottom-button')}
                onClick={handleSubmit}
            >
                CHANGE
            </LoadingButton>
        </div>
    );
}

export default PassChange;
