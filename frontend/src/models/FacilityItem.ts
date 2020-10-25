export class FacilityItem {
	constructor(data?:any) {
        if (data != null) {
            Object.assign(this, data);
        }
    }
}