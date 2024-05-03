import AdminDashboard from '~/components/AdminDashboard';

function getPage(params?: any) {
    switch (params.page[0]) {
        case 'overview':
            return <AdminDashboard />;
        default:
            return <AdminDashboard />;
    }
}

export default function Admin({ params }: { params?: { page: string[] } }) {
    return <>{getPage(params)}</>;
}
