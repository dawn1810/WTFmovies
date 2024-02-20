import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import FilmCard from '~/components/FilmCard';
import Button from '~/components/Button';
import style from './TabGridContent.module.scss';

const cx = classNames.bind(style);

function TabGridContent({ films }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-info')}>
                {films.map((film, index) => (
                    <FilmCard
                        key={index}
                        noOverlay
                        imgSrc={film.imgSrc}
                        filmName={film.filmName}
                        views={film.views}
                        rating={film.rating}
                        episodes={film.episodes}
                    />
                ))}
            </div>
            <Button primary={true} rightIcon={<FontAwesomeIcon icon={faAngleRight} />} className={cx('more-btn')}>
                Xem thêm
            </Button>
        </div>
    );
}

TabGridContent.propTypes = {
    films: PropTypes.array.isRequired,
};

export default TabGridContent;
