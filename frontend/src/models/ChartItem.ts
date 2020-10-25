import {observable, action} from "mobx";
import { aFetch } from "../services/api/fetch";
import moment from "moment";
export class ChartItem {
    @observable stock: string = "";
    @observable data: number[] = [];
    @observable timeseries: number[] = [];
    constructor(data?:any) {
        if (data != null) {
            Object.assign(this, data);
        }
    }
    static async getRelativeData(stock:string, beginDate: number): Promise<[Error|undefined, ChartItem]> {
        const [err, data] = await aFetch<{}>("GET" , `/api/Stock/GetRelativeChart/${stock}/From/${moment(beginDate).format('YYYYMMDD')}`);
        return [err, (err ? undefined : new ChartItem(data))!];
    }
    static async getPriceData(stock:string, beginDate: number): Promise<[Error|undefined, ChartItem]> {
        const [err, data] = await aFetch<{}>("GET" , `/api/Stock/GetPriceChart/${stock}/From/${moment(beginDate).format('YYYYMMDD')}`);
        return [err, (err ? undefined : new ChartItem(data))!];
    }
    static async getFundamentalData(stock:string,fundamental: string, beginDate: number): Promise<[Error|undefined, ChartItem]> {
        const [err, data] = await aFetch<{}>("GET" , `/api/Stock/GetFundamentalChart/${stock}/Factor/${fundamental}/From/${moment(beginDate).format('YYYYMMDD')}`);
        return [err, (err ? undefined : new ChartItem(data))!];
    }
}
