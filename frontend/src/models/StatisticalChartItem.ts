import {observable, action} from "mobx";
import { aFetch } from "../services/api/fetch";
import moment from "moment";
export class StatisticalChartItem {
    @observable stock: string = "";
    @observable past3MData: number[] = [];
    @observable next3MData: number[] = [];
    constructor(data?:any) {
        if (data != null) {
            Object.assign(this, data);
        }
    }
    static async getStatisticalData(stock:string): Promise<[Error|undefined, StatisticalChartItem]> {
        const [err, data] = await aFetch<{}>("GET" , `/api/Stock/GetStatisticalChart/${stock}`);
        return [err, (err ? undefined : new StatisticalChartItem(data))!];
    }
}
