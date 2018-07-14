'use strict';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Image {

    @JsonProperty('file', String)
    public file: string = '';
}
