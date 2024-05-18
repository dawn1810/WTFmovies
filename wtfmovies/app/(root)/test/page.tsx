'use client';
import classNames from 'classnames/bind';

import style from './test.module.scss';

const cx = classNames.bind(style);

function Test() {
    const handleSend = async () => {
        const response = await fetch('/api/v1/editor/youtubeUpload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playlistId: 'PLON1ufyN39kVMnxWGuA6ZAkMBwPqDmuut',
                // nameInput: 'Dororo',
                // describe:
                //     'Dororo là bộ anime kể về một đứa trẻ sinh ra với một lời nguyền khủng khiếp và hành trình đánh bại lũ quỷ đã nguyền rủa cậu. Đó là sự kết hợp tuyệt vời giữa chủ nghĩa hiện thực và truyện dân gian cổ xưa của Nhật Bản cũng như sự kết hợp tuyệt vời giữa hành động, kịch tính và bí ẩn.',
                // status: 'Hoàn thành',
                // img: 'https://w0.peakpx.com/wallpaper/833/389/HD-wallpaper-dororo-hyakkimaru-alone-mountain-japan-sad-90s-samurai-anime.jpg',
                // poster: 'https://mrwallpaper.com/images/hd/hyakkimaru-and-miyo-dororo-spnmbgqcljs59oof.jpg',
                // maxEp: 24,
            }),
        });

        if (response.ok) {
            const res = await response.json();
            console.log(res);
        } else if (response.status === 400) {
            console.log('Người dùng không tồn tại 🧐🧐🧐');
        } else if (response.status === 500) {
            console.log('Lỗi 🫤🫤🫤');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default Test;
