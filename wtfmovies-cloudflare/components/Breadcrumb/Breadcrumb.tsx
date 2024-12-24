'use client';
import classNames from 'classnames/bind';
import Link from 'next/link';

import styles from './Breadcrumb.module.scss';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

const cx = classNames.bind(styles);

function BreadcrumbCom({ paths, locations }: { paths: { name: string; href: string }[]; locations: string[] }) {
    return (
        <div className={cx('wrapper')}>
            <Breadcrumbs>
                {paths.map((path: { name: string; href: string }, index: number) => (
                    <Link className={cx('link')} key={index} href={path.href}>
                        {path.name}
                    </Link>
                ))}
                {locations.map((location: string, index: number) => (
                    <Typography className={cx('location')} key={index}>
                        {location}
                    </Typography>
                ))}
            </Breadcrumbs>
        </div>
    );
}

export default BreadcrumbCom;
