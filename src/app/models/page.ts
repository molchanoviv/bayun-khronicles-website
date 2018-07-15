'use strict';

import { CollectionConverter } from 'app/json/converters/collection-converter';
import { Image } from 'app/models/image';
import { Sound } from 'app/models/sound';
import { Collection, default as collect } from 'collect.js';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Page {

    @JsonProperty('number', Number)
    public number: number = 0;

    @JsonProperty('image', Image)
    public image: Image|null = null;

    @JsonProperty('sounds', CollectionConverter.forType(Sound))
    public sounds: Collection<Sound> = collect();
}
