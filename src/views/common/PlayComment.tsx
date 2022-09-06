import React, { FC, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { playlistComment } from '@/api/api_comment';

import { CommentInt, commentResInt } from '@/types/comment';
import Animation from '@/components/animation/Animation';
import Comment from '@/components/comment/Comment';
import style from './css/playComment.module.less';

const Common: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [wonderComment, setWonderComment] = useState<CommentInt[]>([]);
    const [newComment, setNewComment] = useState<CommentInt[]>([]);

    const getPlaylistComment = async () => {
        const id: string = searchParams.get('id') as string;
        const res: commentResInt = (await playlistComment(id)) as commentResInt;
        if (res.code === 200) {
            setWonderComment(res.hotComments);
            setNewComment(res.comments);
        }
    };

    useEffect(() => {
        getPlaylistComment();
    }, []);

    return (
        <Animation>
            <div className={style.page}>
                <Comment
                    newComment={newComment}
                    wonderComment={wonderComment}
                ></Comment>
            </div>
        </Animation>
    );
};

export default Common;
