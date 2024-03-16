'use client';
import DefaultLayout from './DefaultLayout';
import GlobalStyles from '~/components/GlobalStyles';
import { Provider } from 'react-redux';
import store from '~/app/redux/store';

function Layout({ layout = 'default', children }) {
    return (
        <GlobalStyles>
            <Provider store={store}>
                <DefaultLayout>{children}</DefaultLayout>;
            </Provider>
        </GlobalStyles>
    );
}

export default Layout;
