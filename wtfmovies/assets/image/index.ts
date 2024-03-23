// Trong file quản lý assets của bạn
import logoImage from '~/assets/image/logo.svg';
import itadoryImage from '~/assets/image/Itadory.jpg';
import starImage from '~/assets/image/rating.png';
import episodesImage from '~/assets/image/episodes.png';
import gerneImage from '~/assets/image/gerne.jpg';
import languageImage from '~/assets/image/language.png';
import directorImage from '~/assets/image/director.png';
import actorImage from '~/assets/image/actor.png';

type typeImages = {
    logo: string;
    itadory: string;
    star: string;
    episodes: string;
    gerne: string;
    language: string;
    director: string;
    actor: string;
};

const images: typeImages = {
    logo: logoImage.src,
    itadory: itadoryImage.src,
    star: starImage.src,
    episodes: episodesImage.src,
    gerne: gerneImage.src,
    language: languageImage.src,
    director: directorImage.src,
    actor: actorImage.src,
};

export default images;
