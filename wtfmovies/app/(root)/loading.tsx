// import DefaultLayout from '~/layouts/DefaultLayout';

import images from '~/assets/image';

export const runtime = 'edge';

export default function Loading() {
    return (
        <div>
            <img src={images.logo} alt="wtfmovies" style={styles.img} />
        </div>
    );
}

const styles = {
    img: {
        width: '100px',
        height: '100px',
        position: 'absolute',
        top: 'calc(50% - 50px)',
        left: 'calc(50% - 50px)',
        animation: 'rotate 0.5s ease-in-out infinite',
    },
} as const;
