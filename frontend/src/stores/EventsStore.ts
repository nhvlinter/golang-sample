import { observable, action } from "mobx";
import { BaseStore } from "./BaseStore";
import { aFetch } from "../services/api/fetch";
import { FacilityItem } from "../models/FacilityItem";

export class EventsStore {
	constructor(private store: BaseStore) {
    }
    static async fetchFacilities() {
        const [err, x] = await aFetch<{}[]>("GET", `/facilties`);
        return [err, (err ? undefined : new FacilityItem(x))!] as const;
    }
}