'use client';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './MenuSidebar.module.scss'; // Point this to your style sheet
import { useState } from 'react';
import { useViewport } from '~/hooks';

const cx = classNames.bind(styles);

const MenuSidebar = ({ menuItems, scene }: any) => {
    const [activeMenu, setActiveMenu] = useState(scene);

    const viewPort = useViewport();
    const handleButtonClick = (item: any) => {
        setActiveMenu(item.scene); // Set the active menu item based on scene
    };
    const isMobile = viewPort.width <= 650;
    return (
        <>
            {isMobile
                ? menuItems.map((item: any, index: any) => (
                      <Button
                          key={index}
                          primary
                          to={item.scene}
                          className={cx('navBtn', { active: activeMenu === item.scene })}
                          onClick={() => handleButtonClick(item)}
                      >
                          {item.icon}
                      </Button>
                  ))
                : menuItems.map((item: any, index: any) => (
                      <Button
                          key={index}
                          primary
                          to={item.scene}
                          className={cx('navBtn', { active: activeMenu === item.scene })}
                          onClick={() => handleButtonClick(item)}
                          leftIcon={item.icon}
                      >
                          {item.title}
                      </Button>
                  ))}
        </>
    );
};

export default MenuSidebar;
