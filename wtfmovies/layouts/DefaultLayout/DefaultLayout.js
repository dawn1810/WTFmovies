import classNames from 'classnames/bind';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReduxProvider from "~/redux/redux-provider";


import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <ReduxProvider>
            <div className={cx('wrapper')}>
                <Header />

                <div className={cx('main')}>{children}</div>

                <Footer />
            </div>
        </ReduxProvider>
    );
}

export default DefaultLayout;
