import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Animation from '@/components/animation/Animation';

import style from './css/collector.module.less';
import { subscribers } from '@/api/api_user';
import { SubsResInt, SubscribersInt } from '@/types/collector';
import CollectorItem from './CollectorItem';

interface PropInt {
    isPhone?: boolean;
}

const Collector: FC<PropInt> = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [subscriberList, setSubscriberList] = useState<SubscribersInt[]>([]);
    const id: string = searchParams.get('id') as string;
    const getSubscribers = async () => {
        const params = {
            id,
            limit: 40,
        };
        const res: SubsResInt = (await subscribers(params)) as SubsResInt;
        if (res.code === 200) {
            setSubscriberList(res.subscribers);
        }

        console.log(res);
    };
    useEffect(() => {
        getSubscribers();
    }, []);
    return (
        <Animation>
            <div className={style.page}>
                {subscriberList.map((data) => (
                    <CollectorItem
                        key={data.userId}
                        data={data}
                    ></CollectorItem>
                ))}
            </div>
        </Animation>
    );
};
const mapStateToProps = function (store: any) {
    return {
        isPhone: store.UserReducer.isPhone,
    };
};
export default connect(mapStateToProps)(Collector);
