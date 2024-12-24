import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import React, { useState, Fragment, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { SxProps } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const filter = createFilterOptions<DataType>();

export default function CreateOptionDialog({
    sx,
    id,
    label,
    placeholder,
    setValueData,
    onChange,
    valueData,
}: {
    id: string;
    label: string;
    sx?: SxProps;
    placeholder: string;
    setValueData: any;
    valueData: any;
    onChange: any;
}) {
    const [listData, setListData] = React.useState<DataType[]>([]);
    const [openAutoBox, setOpenAutoBox] = React.useState(false);

    const loading = openAutoBox && listData.length === 0;
    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const data = await fetch('/api/v1/admin/fetchFilm', {
                method: 'GET',
            });
            const decodeData: {
                content: {
                    _id: string,
                    name: string,
                    film_id: string,
                    poster: string
                }[],
                statusCode: number

            } = await data.json();
            console.log(decodeData);

            if (decodeData?.content?.length > 0 && active) {
                setListData(
                    decodeData.content.map(item => ({
                        _id: item._id,
                        film_name: item.name,
                        poster: item.poster,
                        film_id: item.film_id,
                        firstLetter: item.name?.[0]?.toUpperCase() || '',
                    }))
                );
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    return (
        <>
            <Autocomplete
                sx={sx}
                id={id}
                onOpen={() => {
                    setOpenAutoBox(true);
                }}
                onClose={() => {
                    setOpenAutoBox(false);
                }}
                onChange={(event: any, newValue: any) => {
                    setValueData(newValue);
                    onChange(newValue);
                }}
                options={listData.sort((a: any, b: any) => -b?.firstLetter.localeCompare(a?.firstLetter))}
                getOptionLabel={(option) => option.film_name}
                groupBy={(option) => option.firstLetter}
                value={valueData}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    return filtered;
                }}
                isOptionEqualToValue={(option, value) => {
                    return option.film_name === value.film_name && option._id === value._id;
                }}
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
        </>
    );
}

interface DataType {
    inputValue?: string;
    film_name: string;
    _id?: string;
    poster?: string;
    firstLetter?: string;
    film_id?: string;
}
