import EditorDashboard from "~/components/EditorDashboard";
import { getNumberStatistical, getTopHotFilm, getTopSixUser } from "~/libs/getData/editor";
export default async function OverView() {

    const hotFilmList = await getTopHotFilm();
    const numStatistical = await getNumberStatistical();
    const topSixUser = await getTopSixUser();

    return (
        <EditorDashboard
            numStatistical={numStatistical}
            hotFilmList={hotFilmList}
            topSixUser={topSixUser}
        />
    );
}