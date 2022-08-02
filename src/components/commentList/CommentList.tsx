import { CommentInt } from '@/types/comment';
import React, { FC } from 'react';

import style from './commentList.module.less';

interface PropInt {
    comment: CommentInt[];
}

const CommentList: FC<PropInt> = ({ comment }) => {
    return (
        <div className={style.page}>
            {comment.map((item) => (
                <div key={item.commentId} className={style.page_item}>
                    <img
                        className={style.page_item_avatar}
                        src={item.user.avatarUrl}
                        alt=""
                    />
                    <div className={style.info}>
                        <div className={style.info_top}>
                            <span className={style.info_top_name}>
                                {item.user.nickname}
                            </span>
                            <span className={style.info_top_content}>
                                {item.content}
                            </span>
                        </div>
                        {item.beReplied?.map((reply) => (
                            <div
                                key={reply.beRepliedCommentId}
                                className={style.info_reply}
                            >
                                <span className={style.info_top_name}>
                                    {reply.user.nickname}
                                </span>
                                <span className={style.info_top_content}>
                                    {reply.content}
                                </span>
                            </div>
                        ))}
                        <div className={style.info_creat}>{item.time}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
