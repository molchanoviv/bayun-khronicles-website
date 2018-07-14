'use strict';

import { CustomConverterInterface } from 'app/json/converters/custom-converter-interface';
import { Collection, default as collect } from 'collect.js';
import { JsonConvert, JsonConverter, OperationMode, ValueCheckingMode } from 'json2typescript';

@JsonConverter
export class CollectionConverter implements CustomConverterInterface<Collection<any>> {

    // noinspection TypeScriptFieldCanBeMadeReadonly
    private static type;

    public jsonConverter = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

    protected type;

    public constructor() {
        this.type = CollectionConverter.type;
    }

    public serialize(data: Collection<any>): any[] {
        return (data as Collection<any>)
            .map(item => this.jsonConverter.serialize(item))
            .toArray();
    }

    public deserialize(data: any[]): Collection<any> {
        if (this.isTypePrimitive()) {
            return collect(data);
        }
        if (this.isCustomConverter(this.type)) {
            data = data.map(item => (new this.type()).deserialize(item));

            return collect(data);
        }

        return collect(this.jsonConverter.deserializeArray(data, this.type));
    }

    private isCustomConverter(object: any): object is CustomConverterInterface<Collection<any>> {
        object = new object();

        return Reflect.has(object, 'jsonConverter') && Reflect.has(object, 'serialize') && Reflect.has(object, 'deserialize');
    }

    private isTypePrimitive(): boolean {
        return this.type === Boolean || this.type === String || this.type === Number;
    }

    public static forType<T>(type: new(...args: any[]) => T): Function {
        CollectionConverter.type = type;

        return CollectionConverter;
    }
}
