'use strict';

import { Injectable } from '@angular/core';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';

@Injectable({ providedIn: 'root' })
export class SerializerService {

    private jsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

    constructor() {}

    public deserialize(json: any, classReference: { new(): any }): any {
        return this.jsonConvert.deserialize(json, classReference);
    }

    public deserializeArray(jsonArray: any[], classReference: { new(): any }): any[] {
        return this.jsonConvert.deserializeArray(jsonArray, classReference);
    }

    public deserializeObject(jsonObject: any, classReference: { new(): any }): any {
        return this.jsonConvert.deserializeObject(jsonObject, classReference);
    }

    public serialize(data: any): any {
        return this.jsonConvert.serialize(data);
    }

    public serializeArray(instanceArray: any[]): any[] {
        return this.jsonConvert.serializeArray(instanceArray);
    }

    public serializeObject(instance: any): any {
        return this.jsonConvert.serializeObject(instance);
    }
}
