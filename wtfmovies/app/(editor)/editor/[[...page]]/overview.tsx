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
    if (!extendedUser || !extendedUser?.id) return NotFound();
    const hotFilmList = await getTopHotFilm();
    const numStatistical = await getNumberStatistical(ObjectId(extendedUser?.id));
    const topSixUser = await getTopSixUser();

    return (
        <EditorDashboard
            numStatistical={numStatistical}
            hotFilmList={hotFilmList}
            topSixUser={topSixUser}
        />
    );
}