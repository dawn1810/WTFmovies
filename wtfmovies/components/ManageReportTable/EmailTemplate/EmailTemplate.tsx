import { memo } from 'react';
import mail from '~/mailTemplate/remailTemplate';

function FilmPage({ userName, adminName, content }: { userName: string; adminName: string; content: string }) {
    return (
        <div style={{ width: '800px' }}>
            <div dangerouslySetInnerHTML={{ __html: mail({ userName, adminName, content }) }} />
        </div>
    );
}

export default memo(FilmPage);
