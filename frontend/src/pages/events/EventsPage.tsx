import React, { FC, ReactNode, ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import { BasicLayout } from '../../layouts/BasicLayout';

import styles from "./EventsPage.module.scss";

export const EventsPage: FC<{}> = observer(({}) => {
    //const {currentUser} = useStore();
    return (<BasicLayout>
        <div className="header">
            <h3>{`Events page`}</h3>
        </div>
    </BasicLayout>);
});