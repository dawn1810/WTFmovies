import classNames from 'classnames/bind';

import style from './Admin.module.scss';
import AdminDashboard from '~/components/AdminDashboard';

const cx = classNames.bind(style);

export default function Admin() {
    return <AdminDashboard />;
}
