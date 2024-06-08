import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';
import OverViewPage from './overview';
import { getSideMovieFormInfo, getFilm } from '~/libs/getData/editor';

import { redirect } from 'next/navigation';
import FilmPage from '~/components/FilmManager';
import ManageCommentTable from '~/components/ManageCommentTable';
import { getAllComment } from '~/libs/getData/admin';
async function getPage(params?: any) {
    const session = await auth();
    const extendedUser: ExtendedUser | undefined = session?.user;

    if (!session || extendedUser?.role !== 'editor') {
        redirect('/');
    } else {
        switch (params.page[0]) {
            case 'film':
                const data = await getFilm();
                const sideMovieFormInfo = await getSideMovieFormInfo();
                return <FilmPage data={data} sideMovieFormInfo={sideMovieFormInfo} />;
            case 'comment':
                const comments: any[] = await getAllComment();

                if (!comments) break;
                else return <ManageCommentTable dataset={comments} />;
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
