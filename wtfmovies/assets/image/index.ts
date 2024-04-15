// Trong file quản lý assets của bạn
import logoImage from '~/public/images/svg/logo.svg';
import itadoryImage from '~/public/images/Itadory.jpg';
import starImage from '~/public/images/rating.png';
import episodesImage from '~/public/images/episodes.png';
import gerneImage from '~/public/images/gerne.jpg';
import languageImage from '~/public/images/language.png';
import directorImage from '~/public/images/director.png';
import actorImage from '~/public/images/actor.png';

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
