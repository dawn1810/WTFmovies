'use client';
import classNames from 'classnames/bind';

import style from './CommentContent.module.scss';
import CommentInputForm from './CommentInputForm';
import Comment from './Comment';

const cx = classNames.bind(style);

const comments = [
    {
        name: '@suy_tu_mot_doi_vi_KT',
        content: 'Phim này đỉnh vãi!<br/><br/><br/><br/><br/><br/><br/><br/>ニース!!!',
    },
    {
        name: '@dang_huy_diet_the_gioi_thi_mac_iajkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjk',
        content:
            'Ra xã hội làm ăn bươn trải liều thì ăn nhiều không liều thì ăn ít muốn thành công thì phải chấp nhận trải qua đắng cay ngọt bùi làm ăn muốn kiếm được tiền phải chấp nhận mạo hiểm 1 ít nhưng phải trong tầm kiểm soát xã hội này, chỉ có làm, chịu khó, cần cù thì bù siêng năng chỉ có làm thì mới có ăn nhưng cái loại không làm mà đòi có ăn thì ăn đầu b*** ăn *** nói thế cho nó nhanh .Muốn người ta quý mình thì mình phải quý người ta trước .Những người cho mình vay tiền lúc khó khăn lúc mình khổ lúc mình vỡ nợ không phải là người ta ngu , mà vì chính người đó mình nên tôn trọng,bởi những người đó coi mình là anh em bạn bè thì những lúc mình khó khăn khổ người ta mới đưa tiền cho mình vay',
    },
    {
        name: '@giaosudietquy',
        content:
            'MỘT TƯ DUY HẾT SỨC LỆCH LẠC VÀ VÔ NHÂN<br/><br/>Người làm ra meme này, hoặc là trẻ tuổi kém trí, hoặc là tàn ác vô nhân. Mình không ưa những người dân chủ cuội, những người té nước theo mưa, hoặc chính trị cơ hội. Đây không phải là một điều đáng cười, nó đáng buồn. Hãy thử nghĩ về công an của bạn, nếu giả sử bạn đang bị hành hung, nhưng công an không đến giúp bạn chỉ vì sự khác biệt trong tư duy, tôn giáo, quan điểm chính trị của bạn, điều đó có đúng không? Các bạn sẽ bảo rằng, anh Sang chỉ nói lý thuyết, xã hội thực sự nó như vậy. Mình biết chớ. Nhưng xã hội vận hành như vậy, có đúng không? Xưa kia, xã hội cũng tin rằng, phù thủy phải bị thiêu sống, điều đó có đúng không? Tạo hoá cho mình cái não, hãy suy nghĩ. Nếu không, bạn sẽ chỉ đơn thuần là con sâu, cái kiến cho người khác lợi dụng.',
    },
    {
        avatar: '',
        name: '@suy_tu_mot_doi_vi_KT',
        content: 'Phim này đỉnh vãi!<br/>ニース!!!',
    },
    {
        avatar: '',
        name: '@dang_huy_diet_the_gioi_thi_mac_ia',
        content:
            'Ra xã hội làm ăn bươn trải liều thì ăn nhiều không liều thì ăn ít muốn thành công thì phải chấp nhận trải qua đắng cay ngọt bùi làm ăn muốn kiếm được tiền phải chấp nhận mạo hiểm 1 ít nhưng phải trong tầm kiểm soát xã hội này, chỉ có làm, chịu khó, cần cù thì bù siêng năng chỉ có làm thì mới có ăn nhưng cái loại không làm mà đòi có ăn thì ăn đầu b*** ăn *** nói thế cho nó nhanh .Muốn người ta quý mình thì mình phải quý người ta trước .Những người cho mình vay tiền lúc khó khăn lúc mình khổ lúc mình vỡ nợ không phải là người ta ngu , mà vì chính người đó mình nên tôn trọng,bởi những người đó coi mình là anh em bạn bè thì những lúc mình khó khăn khổ người ta mới đưa tiền cho mình vay',
    },
    {
        avatar: '',
        name: '@giaosudietquy',
        content:
            'MỘT TƯ DUY HẾT SỨC LỆCH LẠC VÀ VÔ NHÂN<br/><br/>Người làm ra meme này, hoặc là trẻ tuổi kém trí, hoặc là tàn ác vô nhân. Mình không ưa những người dân chủ cuội, những người té nước theo mưa, hoặc chính trị cơ hội. Đây không phải là một điều đáng cười, nó đáng buồn. Hãy thử nghĩ về công an của bạn, nếu giả sử bạn đang bị hành hung, nhưng công an không đến giúp bạn chỉ vì sự khác biệt trong tư duy, tôn giáo, quan điểm chính trị của bạn, điều đó có đúng không? Các bạn sẽ bảo rằng, anh Sang chỉ nói lý thuyết, xã hội thực sự nó như vậy. Mình biết chớ. Nhưng xã hội vận hành như vậy, có đúng không? Xưa kia, xã hội cũng tin rằng, phù thủy phải bị thiêu sống, điều đó có đúng không? Tạo hoá cho mình cái não, hãy suy nghĩ. Nếu không, bạn sẽ chỉ đơn thuần là con sâu, cái kiến cho người khác lợi dụng.',
    },
    {
        avatar: '',
        name: '@suy_tu_mot_doi_vi_KT',
        content: 'Phim này đỉnh vãi!<br/>ニース!!!',
    },
    {
        avatar: '',
        name: '@dang_huy_diet_the_gioi_thi_mac_ia',
        content:
            'Ra xã hội làm ăn bươn trải liều thì ăn nhiều không liều thì ăn ít muốn thành công thì phải chấp nhận trải qua đắng cay ngọt bùi làm ăn muốn kiếm được tiền phải chấp nhận mạo hiểm 1 ít nhưng phải trong tầm kiểm soát xã hội này, chỉ có làm, chịu khó, cần cù thì bù siêng năng chỉ có làm thì mới có ăn nhưng cái loại không làm mà đòi có ăn thì ăn đầu b*** ăn *** nói thế cho nó nhanh .Muốn người ta quý mình thì mình phải quý người ta trước .Những người cho mình vay tiền lúc khó khăn lúc mình khổ lúc mình vỡ nợ không phải là người ta ngu , mà vì chính người đó mình nên tôn trọng,bởi những người đó coi mình là anh em bạn bè thì những lúc mình khó khăn khổ người ta mới đưa tiền cho mình vay',
    },
    {
        avatar: '',
        name: '@giaosudietquy',
        content:
            'MỘT TƯ DUY HẾT SỨC LỆCH LẠC VÀ VÔ NHÂN<br/><br/>Người làm ra meme này, hoặc là trẻ tuổi kém trí, hoặc là tàn ác vô nhân. Mình không ưa những người dân chủ cuội, những người té nước theo mưa, hoặc chính trị cơ hội. Đây không phải là một điều đáng cười, nó đáng buồn. Hãy thử nghĩ về công an của bạn, nếu giả sử bạn đang bị hành hung, nhưng công an không đến giúp bạn chỉ vì sự khác biệt trong tư duy, tôn giáo, quan điểm chính trị của bạn, điều đó có đúng không? Các bạn sẽ bảo rằng, anh Sang chỉ nói lý thuyết, xã hội thực sự nó như vậy. Mình biết chớ. Nhưng xã hội vận hành như vậy, có đúng không? Xưa kia, xã hội cũng tin rằng, phù thủy phải bị thiêu sống, điều đó có đúng không? Tạo hoá cho mình cái não, hãy suy nghĩ. Nếu không, bạn sẽ chỉ đơn thuần là con sâu, cái kiến cho người khác lợi dụng.',
    },
];

function CommentContent() {
    return (
        <div className={cx('wrapper')}>
            <CommentInputForm />
            <div className={cx('comment-list')}>
                {comments.map((comment, index) => (
                    <Comment
                        key={index}
                        avatar={comment.avatar}
                        commentOwner={comment.name}
                        commentContent={comment.content}
                    />
                ))}
            </div>
        </div>
    );
}

export default CommentContent;
