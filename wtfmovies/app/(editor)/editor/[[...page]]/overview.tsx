import EditorDashboard from "~/components/EditorDashboard";
import { getNumberStatistical } from "~/libs/getData/admin";
import { getTopHotFilm, getTopSixUser } from "~/libs/getData/editor";
import { ExtendedUser } from '~/libs/interfaces';
import { auth } from '~/app/api/auth/[...nextauth]/auth';
import { ObjectId } from "~/libs/func";
import NotFound from "~/app/(root)/not-found";
export default async function OverView() {
    const session = await auth();

    const extendedUser: ExtendedUser | undefined = session?.user;
    if (!extendedUser || !extendedUser?.email) return NotFound();
    const hotFilmList = [
        { id: 0, value: 100, label: 'Naruto' },
        { id: 1, value: 75, label: 'Sasuke' },
        { id: 2, value: 70, label: '寂しい 犬' },
        { id: 3, value: 50, label: 'Lon Dai dE' },
        { id: 4, value: 18, label: 'Đẹp gái nhất thế giới' },
    ];
    const numStatistical = await getNumberStatistical(extendedUser?.email);
    const topSixUser = await getTopSixUser();

    return (
        <EditorDashboard
            numStatistical={numStatistical}
            hotFilmList={hotFilmList}
            topSixUser={topSixUser}
        />
    );
}