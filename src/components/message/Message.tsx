import React from 'react';

import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert, { AlertColor } from '@mui/material/Alert';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

function TransitionRight(props: any) {
    return <Slide {...props} direction="right" />;
}

interface MessagePropInt {
    content: string;
    duration?: number;
    type?: AlertColor;
}

function Message({ content, duration, type }: MessagePropInt) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            TransitionComponent={TransitionRight}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert severity={type} onClose={handleClose} sx={{ width: '100%' }}>
                {content}
            </Alert>
        </Snackbar>
    );
}

const message = {
    success({ content, duration }: MessagePropInt) {
        // 创建一个dom
        const dom = document.createElement('div');
        // 定义组件，
        const JSXdom = (
            <Message
                content={content}
                duration={duration}
                type="success"
            ></Message>
        );
        // 渲染DOM
        createRoot(dom).render(JSXdom);
        // 置入到body节点下
        document.body.appendChild(dom);
    },
    error({ content, duration }: MessagePropInt) {
        const dom = document.createElement('div');
        const JSXdom = (
            <Message
                content={content}
                duration={duration}
                type="error"
            ></Message>
        );
        createRoot(dom).render(JSXdom);
        document.body.appendChild(dom);
    },
    warning({ content, duration }: MessagePropInt) {
        const dom = document.createElement('div');
        const JSXdom = (
            <Message
                content={content}
                duration={duration}
                type="warning"
            ></Message>
        );
        createRoot(dom).render(JSXdom);
        document.body.appendChild(dom);
    },
    info({ content, duration }: MessagePropInt) {
        const dom = document.createElement('div');
        const JSXdom = (
            <Message
                content={content}
                duration={duration}
                type="warning"
            ></Message>
        );
        createRoot(dom).render(JSXdom);
        document.body.appendChild(dom);
    },
};

export default message;
