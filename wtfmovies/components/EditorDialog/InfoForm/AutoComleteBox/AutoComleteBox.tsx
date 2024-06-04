import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import React, { useState, FormEvent, Fragment } from 'react';
import Chip from '@mui/material/Chip';

const filter = createFilterOptions<DataType>();

export default function CreateOptionDialog({ setValueData, listData, valueData }: { setValueData: any, listData: DataType[], valueData: any }) {
    const [open, toggleOpen] = useState(false);

    const handleClose = () => {

        toggleOpen(false);
    };


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        handleClose();
    };

    return (
        <Fragment>
            <Autocomplete
                limitTags={1}
                multiple
                id="movie-tacgia"
                onChange={(event: any, newValue: any) => {
                    console.log(newValue);

                    if (typeof newValue.inputValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            console.log('eyy');

                            toggleOpen(true);

                        });
                    } else if (newValue && newValue.inputValue) {
                        console.log('eyy');

                        toggleOpen(true);

                    } else {
                        setValueData(newValue);
                    }
                }
                }
                options={listData.sort((a: any, b: any) => -b?.firstLetter.localeCompare(a?.firstLetter))}
                getOptionLabel={(option) => option.title}
                groupBy={(option) => option.firstLetter}
                value={valueData}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
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
                        <Chip
                            {...getTagProps({ index })}
                            key={option.title}
                            label={option.title}
                        />
                    ))
                }
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        required
                        {...params}
                        label="Tác giả"
                        placeholder="Chọn tác giả"
                    />
                )}
                selectOnFocus
                clearOnBlur
                freeSolo
                handleHomeEndKeys
            />
            {/* <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                title: newValue,
                                year: '',
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            title: newValue.inputValue,
                            year: '',
                        });
                    } else {
                        setValue(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            title: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demo"
                options={top100Films}
                getOptionLabel={(option) => {
                    // for example value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.title;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.title}</li>}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Free solo dialog" />}
            /> */}
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add a new film</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn vừa thêm một tuỳ chọn? Hãy xác nhận.
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button type="submit">Thêm</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
}

interface DataType {
    inputValue?: string,
    title: string,
    id?: string,
    firstLetter?: string
}
