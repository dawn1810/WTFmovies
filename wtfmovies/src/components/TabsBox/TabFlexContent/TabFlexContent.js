import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './TabFlexContent.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(style);

function TabFlexContent({ episodes }) {
    return (
        <div className={cx('wrapper')}>
            {episodes.map((episode, index) => (
                <Button key={index} className={cx('expisode')} primary>
                    {episode}
                </Button>
            ))}
        </div>
    );
}

TabFlexContent.propTypes = {
    episodes: PropTypes.array.isRequired,
};

export default TabFlexContent;
