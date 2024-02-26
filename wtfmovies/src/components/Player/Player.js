import React from 'react';
import ReactPlayer from 'react-player';
import images from '~/assets/image';

const Player = ({ url }) => {
    return (
        <div className="player-wrapper">
            <ReactPlayer
                url={url}
                width="1250px"
                height="690px"
                controls
                playing
                light={images.preload}
                // config={{
                //     file: {
                //         hlsOptions: {
                //             xhrSetup: function (xhr, url) {
                //                 // Đây là cấu hình cho các request HTTP khi tải file M3U8,
                //                 // bạn có thể sử dụng nó để cấu hình các header, ví dụ như để qua CORS
                //                 // xhr.withCredentials = true; // Đặt nếu server yêu cầu credentials
                //             },
                //         },
                //     },
                // }}
            />
        </div>
    );
};

export default Player;
