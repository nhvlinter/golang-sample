import {observable, action} from "mobx";
import { aFetch } from "../services/api/fetch";
import moment from "moment";
export class UserItem {
    @observable Id: string = "";
    @observable Name: string = "";
    @observable Email: string = "";
    constructor(data?:any) {
        if (data != null) {
            Object.assign(this, data);
        }
    }
     toJS() {
        const v = {
            Id     : this.Id,
            Name   : this.Name,
            Email  : this.Email
        };
        return v;
    }
    @action set_Id = (v:string) => {this.Id = v}
    static async getAll(){
        const [err, data] = await aFetch<{}[]>("GET" , `/api/list`);
        return [err, (err ? [] : data.map(x => new UserItem(x))!)] as const;
    }
    static async save(u: UserItem){
        const body = u.toJS();
        if(u.Id===""){
            const [err, data] = await aFetch<{}[]>("POST" , `/api/user`, body);
            return [err, (err ? undefined : new UserItem(data))!] as const;
        }
        else{
            const [err, data] = await aFetch<{}>("POST", `api/update`, body);
            return [err, (err ? undefined : new UserItem(data))!] as const;
        }
    }
    static async delete(u: UserItem){
        const body = u.toJS();
        const [err, data] = await aFetch<{}>("POST", `api/delete`, body);
        return [err, data] as const;
    }
}
