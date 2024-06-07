import SearchPage from '~/components/SearchPage';
import { getSearch } from '~/libs/getData/search';
import NotFound from '../not-found';

async function search({ searchParams }: { searchParams: { query: string; type: string } }) {
    const data: any[] | undefined = await getSearch(searchParams);
    if (data) return <SearchPage data={data} />;
    else return NotFound();
}

export default search;
