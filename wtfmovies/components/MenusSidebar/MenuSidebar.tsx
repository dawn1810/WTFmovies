'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './MenuSidebar.module.scss'; // Point this to your style sheet
import { useState } from 'react';
import { useViewport } from '~/hooks';

const cx = classNames.bind(styles);

const MenuSidebar = ({ menuItems, handleClick }: any) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const viewPort = useViewport();
  const handleButtonClick = (item: any) => {
    setActiveMenu(item.scene); // Set the active menu item based on scene
    handleClick(item.scene); // Call the passed handleClick function
  };
  const isMobile = viewPort.width <= 1024;

  return (
    <>
      {isMobile ? (

        menuItems.map((item: any, index: any) => (
          <Button
            key={index}
            primary
            to={item.scene}
            className={cx('navBtn', { active: activeMenu === item.scene })}
            onClick={() => handleButtonClick(item)}
          >
            <FontAwesomeIcon icon={item.icon} />
          </Button>

        ))

      ) : (

        menuItems.map((item: any, index: any) => (
          <Button
            key={index}
            primary
            to={item.scene}
            className={cx('navBtn', { active: activeMenu === item.scene })}
            onClick={() => handleButtonClick(item)}
            leftIcon={<FontAwesomeIcon icon={item.icon} />}
          >
            {item.title}
          </Button>

        ))

      )}

    </>
  );
};

export default MenuSidebar;