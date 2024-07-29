import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import React, { useState, FormEvent, Fragment, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import LoadingButton from '@mui/lab/LoadingButton';
import { changeContent, changeOpen, changeType } from '~/components/Notify/notifySlide';
import { AlertColor, SxProps } from '@mui/material';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const filter = createFilterOptions<DataType>();

export default function CreateOptionDialog({
    sx,
    id,
    label,
    placeholder,
    setValueData,
    valueData,
    notEditor = false,
}: {
    id: string;
    label: string;
    sx?: SxProps;
    placeholder: string;
    setValueData: any;
    valueData: any;
    notEditor?: boolean;
}) {
    const dispatch = useDispatch();
    const [open, toggleOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [listData, setListData] = React.useState<DataType[]>([]);
    const [openAutoBox, setOpenAutoBox] = React.useState(false);

    const loading = openAutoBox && listData.length === 0;
    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const data = await fetch('/api/v1/editor/fetchData', {
                method: 'POST',
                body: JSON.stringify({ collection: id }),
            });
            const decodeData: DataType[] = await data.json();
            if (decodeData.length > 0 && active) {
                setListData(decodeData);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);
    const handleClose = () => {
        setLoadingDelete(false);

        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = useState<DataType>({
        inputValue: '',
        title: '',
        id: '',
        firstLetter: '',
    });
    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeContent(content));
        dispatch(changeType(type));
        dispatch(changeOpen(true));
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingDelete(true);

        const data = await fetch('/api/v1/editor/addNewInfo', {
            method: 'POST',
            body: JSON.stringify({ name: dialogValue.title, typeInfo: id }),
        });
        const iId: { statusCode: number; content: string } = await data.json();

        if (iId.statusCode === 200) {
            const temp = { ...dialogValue };
            delete temp.inputValue;
            listData.push({ ...temp, id: iId.content });
            setValueData([...valueData, { ...temp, id: iId.content }]);
            showAlert('Thêm dữ liệu thành công', 'success');
            setDialogValue({
                inputValue: '',
                title: '',
                id: '',
                firstLetter: '',
            });
            return handleClose();
        }
        return showAlert('Có lỗi xảy ra khi thêm dữ liệu', 'error');
    };

    return (
        <Fragment>
            <Autocomplete
                limitTags={1}
                multiple
                sx={sx}
                id={id}
                onOpen={() => {
                    setOpenAutoBox(true);
                }}
                onClose={() => {
                    setOpenAutoBox(false);
                }}
                onChange={(event: any, newValue: any) => {
                    if (newValue.length && newValue.length > valueData.length)
                        if (newValue[newValue.length - 1].inputValue) {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                                const ndata = {
                                    ...newValue[newValue.length - 1],
                                    title: newValue[newValue.length - 1].inputValue,
                                    firstLetter: newValue[newValue.length - 1].inputValue[0].toUpperCase(),
                                };
                                setDialogValue(ndata);

                                toggleOpen(true);
                            });
                        } else {
                            setValueData(newValue);
                        }
                    else setValueData(newValue);
                }}
                options={listData.sort((a: any, b: any) => -b?.firstLetter.localeCompare(a?.firstLetter))}
                getOptionLabel={(option) => option.title}
                groupBy={(option) => option.firstLetter}
                value={valueData}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '' && !notEditor) {
                        filtered.push({
                            inputValue: params.inputValue,
                            title: `Thêm "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                isOptionEqualToValue={(option, value) => {
                    return option.title === value.title && option.id === value.id;
                }}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option.title} label={option.title} />
                    ))
                }
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        required
                        {...params}
                        label={label}
                        placeholder={placeholder}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </Fragment>
                            ),
                        }}
                    />
                )}
                selectOnFocus
                clearOnBlur
                freeSolo
                handleHomeEndKeys
            />

            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Thêm dữ liệu còn thiếu</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Bạn vừa thêm một dữ liệu? Hãy điền thông tin chi tiết.</DialogContentText>
                        <TextField
                            sx={{ width: '100%' }}
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.title.trim()}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    title: event.target.value.trim(),
                                    firstLetter: event.target.value.trim()[0].toUpperCase(),
                                })
                            }
                            label="Tên"
                            type="text"
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <LoadingButton loading={loadingDelete} type="submit">
                            Thêm
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
}

interface DataType {
    inputValue?: string;
    title: string;
    id?: string;
    firstLetter?: string;
}
