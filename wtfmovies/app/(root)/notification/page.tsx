import NotificationList from '~/components/NotificationList';
import { getNotificationList } from '~/libs/getData/notification';
import NotFound from '../not-found';
import BreadcrumbCom from '~/components/Breadcrumb/Breadcrumb';

async function Notification() {
    let notifications: any = await getNotificationList();

    if (!notifications || !notifications[0] || !notifications[0].list) {
        notifications = [
            {
                list: [],
            },
        ];
    }

    return (
        <>
            <BreadcrumbCom
                paths={[
                    {
                        name: 'Trang chủ',
                        href: '/',
                    },
                ]}
                locations={['Thông báo']}
            />
            <NotificationList notify={notifications[0].list} />
        </>
    );
}

export default Notification;
