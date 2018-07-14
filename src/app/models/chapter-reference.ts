'use strict';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class ChapterReference {

    @JsonProperty('path', String)
    public path: string = '';
}
