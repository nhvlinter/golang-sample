import React, { FC, ReactNode, ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import { BasicLayout } from '../../layouts/BasicLayout';
import MaterialTable from "material-table";

import styles from "./HomePage.module.scss";

export const HomePage: FC<{}> = observer(({}) => {
    //const {currentUser} = useStore();
    const { routerStore, sGoSample } = useStore();
    useEffect(() => {
        sGoSample.init();
    }, []);
    return (<BasicLayout>
        <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
              { title: "ID", field: "Id" },
              { title: "Name", field: "Name" },
              { title: "Email", field: "Email" }
              ]}
          data={sGoSample.userList}
          title="User List"
          options={{search:false, paging:false}}
          editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              //setData([...data, newData]);
              sGoSample.addData(newData);
              
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {/*const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);*/}
              sGoSample.updateData(newData);
              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {/*const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);*/}
              sGoSample.deleteData(oldData);
              resolve()
            }, 1000)
          }),
      }}
          />
        </div>
    </BasicLayout>);
});




