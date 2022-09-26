import React, { ReactNode, FC, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import style from './css/focusPopper.module.less';

interface PropsInt {
    element: HTMLElement | null;
    children: ReactNode;
    isPhone: boolean;
}

const FocusPopper: FC<PropsInt> = React.memo((props) => {
    const { children, element, isPhone } = props;
    const panel = useRef<HTMLDivElement | null>(null);
    const [top, settop] = useState<number | undefined>(0);
    const [left, setleft] = useState<number | undefined>(0);
    const [styleObj, setStyleObj] = useState<object>({});

    const showPopper = () => {
        if (element) {
            const top = element.offsetTop + element.offsetHeight + 5;
            const left = isPhone ? '0' : element.offsetLeft;
            settop(top);
            setleft(left);

            setStyleObj({
                zIndex: '999',
                opacity: '1',
            });
        } else {
            setStyleObj({
                zIndex: '-1',
                opacity: '0',
            });
        }
    };
    useEffect(() => {
        showPopper();
    }, [element]);
    return (
        <div
            ref={panel}
            className={style.panel}
            style={{
                top,
                left,
                ...styleObj,
            }}
        >
            {children}
        </div>
    );
});

const mapStateToProps = function (store: any) {
    return { isPhone: store.UserReducer.isPhone };
};
export default connect(mapStateToProps)(FocusPopper);
