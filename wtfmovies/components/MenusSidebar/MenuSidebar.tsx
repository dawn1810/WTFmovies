'use client';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './MenuSidebar.module.scss'; // Point this to your style sheet
import { useState } from 'react';
import { useViewport } from '~/hooks';
import { useRouter } from 'next/navigation';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const cx = classNames.bind(styles);

const MenuSidebar = ({ menuItems, scene }: any) => {
    const router = useRouter();

    const [activeMenu, setActiveMenu] = useState(scene);
    const [open, setOpen] = useState(false);

    const viewPort = useViewport();

    const handleButtonClick = (item: any) => {
        if (item.scene) {
            setActiveMenu(item.scene);
            router.push(item.scene);
        }
        item.children && setOpen(!open);
    };

    const handleSubButtonClick = (item: any) => {
        console.log(activeMenu === item.scene);

        if (item.scene) {
            setActiveMenu(item.scene);
            // router.push(item.scene);
        }
    };

    const isMobile = viewPort.width <= 650;

    return (
        // <>
        //     {!isMobile
        //         ? menuItems.map((item: any, index: any) => (
        //               <Button
        //                   key={index}
        //                   primary
        //                   to={item.scene}
        //                   className={cx('navBtn', { active: activeMenu === item.scene })}
        //                   onClick={() => handleButtonClick(item)}
        //                   leftIcon={item.icon}
        //               >
        //                   {item.title}
        //               </Button>
        //           ))
        //         : menuItems.map((item: any, index: any) => (
        //               <Button
        //                   key={index}
        //                   primary
        //                   to={item.scene}
        //                   className={cx('navBtn', { active: activeMenu === item.scene })}
        //                   onClick={() => handleButtonClick(item)}
        //               >
        //                   {item.icon}
        //               </Button>
        //           ))}
        // </>
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {menuItems.map((item: any, index: any) => (
                <>
                    <ListItemButton
                        key={index}
                        className={cx('navBtn', { active: activeMenu === item.scene })}
                        onClick={() => handleButtonClick(item)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                        {!!item.children && (open ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                    {item.children &&
                        item.children.map((child: any, index: number) => (
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton
                                        key={index}
                                        className={cx('navBtn', { active: activeMenu === item.scene })}
                                        sx={{ pl: 4 }}
                                        onClick={() => handleSubButtonClick(child)}
                                    >
                                        <ListItemIcon>{child.icon}</ListItemIcon>
                                        <ListItemText primary={child.title} />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        ))}
                </>
            ))}
        </List>
    );
};

export default MenuSidebar;
