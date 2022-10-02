import React, { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import style from './css/history.module.less';
import { eventBus } from '@/untils/eventBus';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function History() {
    const [list, setlist] = useState<Array<string>>([]);
    const [open, setOpen] = useState(false);

    const handleClear = () => {
        window.localStorage.setItem('search', '[]');
        setlist([]);
        setOpen(false);
    };

    const handleSearch = (data: string) => {
        eventBus.emit('search', data);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        setlist(JSON.parse(window.localStorage.getItem('search') || '[]'));
    }, [window.localStorage.getItem('search')]);

    return (
        <div className={style.panel}>
            <p className={[style.panel_text, 'font-14'].join(' ')}>
                搜索历史
                <DeleteIcon
                    className="mleft-5"
                    sx={{
                        fontSize: '18px',
                    }}
                    onClick={handleClickOpen}
                ></DeleteIcon>
            </p>

            <ul className={style.panel_list}>
                {list.length !== 0 ? (
                    list.map((item, index) => (
                        <li key={index} onClick={() => handleSearch(item)}>
                            {item}
                        </li>
                    ))
                ) : (
                    <div>暂无搜索记录</div>
                )}
            </ul>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'提示'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        该操作将会清除历史搜索记录，是否继续？
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Disagree</Button>
                    <Button onClick={handleClear}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default History;
