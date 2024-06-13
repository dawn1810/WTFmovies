import SearchPage from '~/components/SearchPage';
import { getAvdSearch, getSearch } from '~/libs/getData/search';
import NotFound from '../not-found';
import { Metadata, ResolvingMetadata } from 'next/types';
import { SearchData } from '~/libs/interfaces';


export async function generateMetadata({ searchParams }: { searchParams: SearchData }, parent: ResolvingMetadata): Promise<Metadata> {
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
        title: `Tìm kiếm ${nameType[type as string] ? nameType[type as string] : ""} ${query ? query : ""}`,
    };
}
async function search({ searchParams }: { searchParams: SearchData }) {
    const { avd, type, query, tab } = searchParams;
    let data: any[] | undefined;
    if (!avd && type !== 'rcm') {
        data = await getSearch(searchParams);
    } else if (avd && type !== 'rcm') {
        data = await getAvdSearch(searchParams);
    } else if (!avd && type == 'rcm') {
        switch (query) {
            case 'hot':
                data = await getAvdSearch({ sortName: '0', sortTime: '0', sortView: '-1', sortReview: '0', typefilm: '', year: '', genres: '', avd: '0' });
                break;
            case 'new':
                data = await getAvdSearch({ sortName: '0', sortTime: '-1', sortView: '0', sortReview: '0', typefilm: (tab == 'phimLe' ? 'le' : (tab == 'phimBo') ? 'full' : ''), year: (tab == 'summer' ? (new Date).getFullYear().toString() : ''), genres: '', avd: '1' });
                break;
            default:
                data = await getSearch(searchParams);
                break;
        }
    } else {
        data = await getSearch(searchParams);
    }

    if (data) return <SearchPage query={searchParams} data={data} />;
    else return NotFound();
}

export default search;
