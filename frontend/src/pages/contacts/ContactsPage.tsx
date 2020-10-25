import React, { FC, ReactNode, ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import { BasicLayout } from '../../layouts/BasicLayout';

import styles from "./ContactsPage.module.scss";

export const ContactsPage: FC<{}> = observer(({}) => {
    //const {currentUser} = useStore();
    return (<BasicLayout>
        <div className="header">
            <h3>{`Contacts page`}</h3>
        </div>
    </BasicLayout>);
});