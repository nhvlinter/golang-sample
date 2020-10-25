import { observable, action } from "mobx";
import { BaseStore } from "./BaseStore";
export class ContactsStore {
	constructor(private store: BaseStore) {
    }
}