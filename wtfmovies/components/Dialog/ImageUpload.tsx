import { useState } from "react";
import { Button, Box, Input, IconButton, Modal } from "@mui/material";
import { Crop } from "@mui/icons-material";
import FilmCard from "../FilmCard";
import style from './ImageUpload.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);


export default function ImageUpload() {

    const [selectedImage, setSelectedImage] = useState<string>('');

    const handleImageChange = (event: any) => {
        if (event.target && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: 'column',
                gap: '20px',
                height: '100%',
                padding: '1rem',
                width: '100%',
                alignItems: "center",
                justifyContent: "center",
            }
            }
        // onClick = {handleImageChange}
        >

            <FilmCard key={selectedImage} imgSrc={selectedImage}
                filmName={'Demo Image'}
                views={1309}
                rating={4.9}
                episodes={24}
                searchName='#'
            >

            </FilmCard>
            <Button autoFocus variant="contained" onClick={handleImageChange}>
                Chọn ảnh
                <Input
                    className={cx('inputImage')}
                    type="file"
                    onChange={handleImageChange}
                    inputProps={{ accept: "image/*" }}
                    sx={{
                    }}
                />
            </Button>


        </Box>
    );
}

