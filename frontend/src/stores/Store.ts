import { observable, action, computed, reaction, runInAction } from "mobx";

import { uniqBy } from "lodash-es";
import { routes, notFound, homeRoute } from "../routes";
import { RouterStore, HistoryAdapter,  } from "mobx-state-router";
import {history} from "../services/history";
import {BaseStore} from "./BaseStore";
import {EventsStore} from "./EventsStore";
import {DocumentaryStore} from "./DocumentaryStore";
import {MaterialStore} from "./MarterialStore";
import {GoSampleStore} from "./GoSampleStore";
export class Store extends BaseStore {
    routerStore         : RouterStore;
    constructor() {
        super();

        this.routerStore = new RouterStore(this, routes, notFound);
        const historyAdapter = new HistoryAdapter(this.routerStore, history);
        historyAdapter.observeRouterStateChanges();
    }
    sEvents = new EventsStore(this);
    sDocumentary = new DocumentaryStore(this);
    sMaterial = new MaterialStore(this);
    sGoSample = new GoSampleStore(this);
}
