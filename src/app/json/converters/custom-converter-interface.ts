'use strict';

import { JsonConvert, JsonCustomConvert } from 'json2typescript';

export interface CustomConverterInterface<T> extends JsonCustomConvert<T> {
    jsonConverter: JsonConvert;
}
