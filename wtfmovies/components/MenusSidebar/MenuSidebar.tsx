'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './MenuSidebar.module.scss'; // Point this to your style sheet
import { useState } from 'react';

const cx = classNames.bind(styles);

const MenuSidebar = ({ menuItems, handleClick }: any) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleButtonClick = (item: any) => {
    setActiveMenu(item.scene); // Set the active menu item based on scene
    handleClick(item.scene); // Call the passed handleClick function
  };
  return (
    <>
      {menuItems.map((item: any, index: any) => (
        <Button
          key={index}
          primary
          className={cx('navBtn', { active: activeMenu === item.scene })}
          onClick={() => handleButtonClick(item)}
        >
          <FontAwesomeIcon icon={item.icon} className='icon' /> {item.title}
        </Button>
      ))}
    </>
  );
};

export default MenuSidebar;