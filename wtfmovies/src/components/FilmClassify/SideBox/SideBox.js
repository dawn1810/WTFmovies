import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import FilmCard from '~/components/FilmCard';
import Button from '~/components/Button';
import style from './SideBox.module.scss';

const cx = classNames.bind(style);

const firstOne = {
    imgSrc: 'https://www.hindustantimes.com/ht-img/img/2023/09/05/1600x900/jjk_shibuya_incident_arc_1693914044447_1693914064181.jpg',
    filmName: 'asdfasd',
    views: '1.000.000',
    rating: '4.8',
    episodes: '10199',
};

const films = [
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
];

function SideBox({ to, title, icon }) {
    return (
        <div className={cx('wrapper')}>
            <Button primary large to={to} leftIcon={icon} className={cx('title')}>
                {title}
            </Button>
            <div className={cx('side-films')}>
                <div className={cx('side-films-top')}>
                    <FilmCard
                        large
                        imgSrc={firstOne.imgSrc}
                        filmName={firstOne.filmName}
                        views={firstOne.views}
                        rating={firstOne.rating}
                        episodes={firstOne.episodes}
                    />
                </div>
                {films.map((film, index) => (
                    <FilmCard
                        key={index}
                        imgSrc={film.imgSrc}
                        filmName={film.filmName}
                        views={film.views}
                        rating={film.rating}
                        episodes={film.episodes}
                    />
                ))}
            </div>
        </div>
    );
}

SideBox.propTypes = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};

export default SideBox;
