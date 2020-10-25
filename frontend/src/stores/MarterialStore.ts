import { observable, action } from "mobx";
import { BaseStore } from "./BaseStore";
export class MaterialStore {
	constructor(private store: BaseStore) {
    }
}