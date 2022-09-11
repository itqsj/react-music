import React, { FC, useState } from 'react';

import CommentList from '@/components/comment/CommentList';
import { Button, TextField } from '@mui/material';

import style from './css/comment.module.less';
import { connect } from 'react-redux/es/exports';
import { CommentInt } from '@/types/comment';

interface PropsInt {
    isPhone: boolean;
    newComment: CommentInt[];
    wonderComment: CommentInt[];
}

const Comment: FC<PropsInt> = React.memo(
    ({ isPhone, newComment, wonderComment }) => {
        const [commonVal, setCommonVal] = useState<string>('');

        const handleCommonChange = (
            event: React.ChangeEvent<HTMLInputElement>,
        ) => {
            setCommonVal(event.target.value);
        };

        return (
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
        );
    },
);

const mapStateToProps = function (store: any) {
    return {
        isPhone: store.UserReducer.isPhone,
    };
};

export default connect(mapStateToProps)(Comment);
