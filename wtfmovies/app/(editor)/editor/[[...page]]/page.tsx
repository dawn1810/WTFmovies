import { auth } from '~/app/api/auth/[...nextauth]/auth';
import FilmPage from './film';
import { ExtendedUser } from '~/libs/interfaces';
import OverViewPage from './overview';
import { redirect } from 'next/navigation';
async function getPage(params?: any) {
    const session = await auth();
    const extendedUser: ExtendedUser | undefined = session?.user;

    if (!session || extendedUser?.role !== 'editor') {
        redirect('/');
    } else {
        switch (params.page[0]) {
            case 'film':
                return <FilmPage />;
            default:
                return <OverViewPage />;
        }
    }
}
export const fetchCache = 'force-no-store';

export default async function Editer({ params }: { params?: { page: string[] } }) {
    const page = await getPage(params);
    return page;
}
