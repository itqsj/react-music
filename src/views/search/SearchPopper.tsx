import React from 'react';

import History from './History';
import HotSearch from './HotSearch';

import style from './css/searchPopper.module.less';

function SearchPopper() {
    return (
        <div className={style.panel}>
            <History></History>
            <HotSearch></HotSearch>
        </div>
    );
}

export default SearchPopper;
