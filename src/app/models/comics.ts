'use strict';

import { CollectionConverter } from 'app/json/converters/collection-converter';
import { ChapterReference } from 'app/models/chapter-reference';
import { Collection, default as collect } from 'collect.js';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Comics {

    @JsonProperty('chapters', CollectionConverter.forType(ChapterReference))
    public chapters: Collection<ChapterReference> = collect();
}
