import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';

import style from './css/history.module.less';

function History() {
    return (
        <div className={style.panel}>
            <p className={[style.panel_text, 'font-14'].join(' ')}>
                搜索历史
                <DeleteIcon
                    className="mleft-5"
                    sx={{
                        fontSize: '18px',
                    }}
                ></DeleteIcon>
            </p>
            <ul className={style.panel_list}>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
            </ul>
        </div>
    );
}

export default History;
