import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import FilmCard from '../FilmCard';
import Genres from '../Genres';
import style from './FilmProposeList.module.scss';

const cx = classNames.bind(style);

function FilmProposeList({ films, className }) {
    return (
        <div className={cx('wrapper', className)}>
            <Genres>
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
            </Genres>
        </div>
    );
}

FilmProposeList.propTypes = {
    films: PropTypes.array.isRequired,
    classNames: PropTypes.string,
};

export default FilmProposeList;
