import { observable, action } from "mobx";
import { BaseStore } from "./BaseStore";
export class DocumentaryStore {
	@observable activeTab:number = 0;
	constructor(private store: BaseStore) {
    }
    @action changeTab = (v: number)=>{
    	this.activeTab = v;
    }
}