'use client';
import classNames from 'classnames/bind';
import style from './Editor.module.scss';
import DataGridCom from '~/components/DataGridCom';
import FullPageDialog from '~/components/AlertDialog/FullPageDialog';

const cx = classNames.bind(style);
export default function OverViewPage() {
    return <FullPageDialog></FullPageDialog>;
}
