import {observable, action} from "mobx";

import { ChartItem } from "./ChartItem";
export class RelativeChart {
    @observable stock: string = "";
    @observable color: string = "";
    @observable chartItem: ChartItem = new ChartItem();
    @observable optionsList: string[] = [];
    constructor(data?:any) {
        if (data != null) {
            Object.assign(this, data);
        }
    }
    @action set_stock  = (v: string) => { this.stock   = v; }
    @action set_color  = (v: string) => { this.color   = v; }
    @action set_optionsList  = (v: string[]) => { this.optionsList = v.slice(); }
    @action set_chartItem  = (v: ChartItem) => { this.chartItem   = new ChartItem(v); }
}
