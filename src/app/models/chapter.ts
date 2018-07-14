'use strict';

import { CollectionConverter } from 'app/json/converters/collection-converter';
import { Page } from 'app/models/page';
import { Collection, default as collect } from 'collect.js';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Chapter {

    @JsonProperty('number', Number)
    public number: number = 0;

    @JsonProperty('title', String)
    public title: string = '';

    @JsonProperty('pages', CollectionConverter.forType(Page))
    public pages: Collection<Page> = collect();
}
