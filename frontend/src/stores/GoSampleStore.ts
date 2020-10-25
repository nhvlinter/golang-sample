import { observable, action } from "mobx";
import { BaseStore } from "./BaseStore";
import { aFetch } from "../services/api/fetch";
import { UserItem } from "../models/UserItem";

export class GoSampleStore {
    @observable userList: UserItem[] = [];
    constructor(private store: BaseStore) {
    }
    @action async init(){
        const [err, alldata] = await UserItem.getAll();
        if(!err && alldata){
            this.userList = alldata.map(x=>new UserItem(x));
        }
    }
    @action async addData(user:UserItem){
        var userItem = new UserItem(user);
        userItem.set_Id("");
        if(userItem.Name===""||userItem.Email==="") return;
        const [err, data] = await UserItem.save(userItem);
        await this.init();
    }
    @action async updateData(user:UserItem){
        var userItem = new UserItem(user);
        if(userItem.Name===""||userItem.Email==="") return;
        const [err, data] = await UserItem.save(userItem);
        await this.init();
    }
    @action async deleteData(user:UserItem){
        var userItem = new UserItem(user);
        if(userItem.Name===""||userItem.Email==="") return;
        const [err, data] = await UserItem.delete(userItem);
        await this.init();
    }
}