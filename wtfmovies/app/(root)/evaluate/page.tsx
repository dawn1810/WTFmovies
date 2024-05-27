import UserEvaluate from '~/components/UserEvaluate';
import { getCurrentScore, getEvaluateList } from '~/libs/getData/evaluate';

async function UserEvaluateTable() {
    const evaluateList = await getEvaluateList();
    const score = await getCurrentScore();

    return <UserEvaluate rows={evaluateList?.table} score={score} version={evaluateList?.version} />;
}

export default UserEvaluateTable;
