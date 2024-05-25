import NotificationList from '~/components/NotificationList';
import { getNotificationList } from '~/libs/getData/notification';
import NotFound from '../not-found';

async function Notification() {
    const notifications: any = await getNotificationList();

    if (!notifications || !notifications[0] || !notifications[0].list) return NotFound();

    return <NotificationList notify={notifications[0].list} />;
}

export default Notification;
