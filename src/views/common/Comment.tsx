import React, { FC, useEffect, useState } from 'react';

import { Button, TextField } from '@mui/material';

import style from './css/comment.module.less';
import { connect } from 'react-redux/es/exports';
import { useSearchParams } from 'react-router-dom';
import { playlistComment } from '@/api/api_comment';
import CommentList from '@/components/commentList/CommentList';
import { CommentInt } from '@/types/comment';
import Animation from '@/components/animation/Animation';

interface PropsInt {
    isPhone: boolean;
}

interface commentResInt {
    comments: CommentInt[];
}

const Common: FC<PropsInt> = ({ isPhone }) => {
    const [commonVal, setCommonVal] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [wonderComment, setWonderComment] = useState<CommentInt[]>([]);
    const [newComment, setNewComment] = useState<CommentInt[]>([]);
    useEffect(() => {
        const id: string = searchParams.get('id') as string;
        playlistComment(id).then((res: any) => {
            console.log(res);
            if (res.code === 200) {
                setWonderComment(res.hotComments);
                setNewComment(res.comments);
            }
        });
    }, []);
    const handleCommonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommonVal(event.target.value);
    };
    return (
        <Animation>
            <div className={style.page}>
                <TextField
                    label="请输入评论"
                    multiline
                    rows={isPhone ? 2 : 3}
                    value={commonVal}
                    className={style.page_input}
                    onChange={handleCommonChange}
                />
                <div className={style.page_operation}>
                    <div className={style.page_operation_left}>
                        <Button
                            className={style.page_operation_left_btn}
                            variant="text"
                        >
                            @
                        </Button>
                        <Button
                            className={style.page_operation_left_btn}
                            variant="text"
                        >
                            #
                        </Button>
                    </div>
                    <Button
                        className={style.page_operation_confirm}
                        variant="text"
                    >
                        评论
                    </Button>
                </div>
                <h3 className={style.page_title}>精彩评论</h3>
                <div className={style.page_comment}>
                    <CommentList comment={wonderComment}></CommentList>
                </div>
                <h3 className={style.page_title}>最新评论</h3>
                <div className={style.page_comment}>
                    <CommentList comment={newComment}></CommentList>
                </div>
            </div>
        </Animation>
    );
};

const mapStateToProps = function (store: any) {
    return {
        isPhone: store.UserReducer.isPhone,
    };
};

export default connect(mapStateToProps)(Common);
