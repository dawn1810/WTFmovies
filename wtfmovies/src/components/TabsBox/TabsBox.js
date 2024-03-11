import PropTypes from 'prop-types';
import { Tabs, Tab, Row, Col, Nav } from 'react-bootstrap';
import classNames from 'classnames/bind';

import TabGridContent from './TabGridContent';
import style from './TabsBox.module.scss';
import TabFlexContent from './TabFlexContent';
import FilmProposeList from '../FilmProposeList';

const cx = classNames.bind(style);

function TabBox({
    commentContent = false,
    listContent = false,
    flexContent = false,
    textContent = false,
    gridContent = false,
    tabs,
    defaultActiveKey,
    className,
}) {
    return (
        <div className={cx('wrapper', className)}>
            <Tabs
                transition={false}
                className={cx('tabs', { 'cmt-tabs': commentContent })}
                defaultActiveKey={defaultActiveKey}
            >
                {tabs.map((tab, index) => (
                    <Tab
                        className={cx('tab-content', {
                            'grid-content': gridContent,
                            'text-content': textContent,
                            'list-content': listContent,
                            'cmt-content': commentContent,
                        })}
                        key={index}
                        eventKey={tab.eventKey}
                        title={tab.title}
                    >
                        {gridContent ? (
                            <TabGridContent films={tab.content} />
                        ) : flexContent ? (
                            <TabFlexContent episodes={tab.content} />
                        ) : listContent ? (
                            <FilmProposeList films={tab.content} className={cx('films-list')} />
                        ) : (
                            tab.content
                        )}
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
}

TabBox.propTypes = {
    tabs: PropTypes.array.isRequired,
    defaultActiveKey: PropTypes.string,
    gridContent: PropTypes.bool,
    textContent: PropTypes.bool,
};

export default TabBox;
