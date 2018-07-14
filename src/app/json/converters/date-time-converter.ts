'use strict';

import { CustomConverterInterface } from 'app/json/converters/custom-converter-interface';
import { JsonConvert, JsonConverter, OperationMode, ValueCheckingMode } from 'json2typescript';

@JsonConverter
export class DateTimeConverter implements CustomConverterInterface<Date> {

    public jsonConverter = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

    public serialize(data: Date): any {
        return data.toISOString();
    }

    public deserialize(data: string): Date {
        return new Date(data);
    }
}
