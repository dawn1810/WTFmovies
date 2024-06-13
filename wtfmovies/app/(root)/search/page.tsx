import SearchPage from '~/components/SearchPage';
import { getSearch } from '~/libs/getData/search';
import NotFound from '../not-found';
import { Metadata, ResolvingMetadata } from 'next/types';

type Props =
    { query: string; type: string };

export async function generateMetadata({ searchParams }: { searchParams: Props }, parent: ResolvingMetadata): Promise<Metadata> {
    //get Param
    const { query, type } = searchParams;

    const nameType: { [key: string]: string } = {
        'director': 'đạo diễn',
        'genre': 'thể loại',
        'author': 'tác giả',
        'actor': 'diễn viên',
        'name': 'phim',
        'rcm': 'danh sách'

    }

    return {
        title: `Tìm kiếm ${nameType[type] ? nameType[type] : ""} ${query ? query : ""}`,
    };
}
async function search({ searchParams }: { searchParams: Props }) {
    const data: any[] | undefined = await getSearch(searchParams);
    if (data) return <SearchPage query={searchParams.query} data={data} />;
    else return NotFound();
}

export default search;
