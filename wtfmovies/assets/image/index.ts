// Trong file quản lý assets của bạn
import logoImage from '~/assets/image/logo.svg';
import itadoryImage from '~/assets/image/Itadory.jpg';
import starImage from '~/assets/image/rating.png';
import episodesImage from '~/assets/image/episodes.png';

type typeImages = {
    logo: string;
    itadory: string;
    star: string;
    episodes: string;
};

const images: typeImages = {
    logo: logoImage.src,
    itadory: itadoryImage.src,
    star: starImage.src,
    episodes: episodesImage.src,
};

export default images;
