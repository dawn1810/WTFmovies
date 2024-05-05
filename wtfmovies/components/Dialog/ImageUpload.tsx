import { ChangeEvent, Fragment, useState } from "react";
import { Button, Box, Input, IconButton, Modal, Tooltip, tooltipClasses, styled, TooltipProps, Typography } from "@mui/material";
import { Crop } from "@mui/icons-material";
import FilmCard from "../FilmCard";
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip  {...props} classes={{ popper: className }} />
))(({ theme }: { theme: any }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'var(--card-blur-color)',
        color: 'var(--card-blur-color)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
    },
}));
function ImageUpload() {

    const [selectedImage, setSelectedImage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageChange = (event: any) => {
        if (event.target && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
        }
        // setIsModalOpen(true);
    };

    const handleCropImage = () => {
        // Handle crop logic here
        setIsModalOpen(false);
    };


    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: 'column',
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
                searchName='x'
            >

            </FilmCard>
            <Button autoFocus variant="contained" onClick={handleImageChange}>
                Huỷ
            </Button>
            {/* <Input
                type="file"
                onChange={handleImageChange}
                inputProps={{ accept: "image/*" }}
                sx={{
                }}
            /> */}

            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    {/* Add your image cropping component here */}
                    <IconButton onClick={handleCropImage}>
                        <Crop />
                    </IconButton>
                </Box>
            </Modal>
        </Box>
    );
}

export default ImageUpload;