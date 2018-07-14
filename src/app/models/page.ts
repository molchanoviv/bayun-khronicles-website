'use strict';

import { Image } from 'app/models/image';
import { Sound } from 'app/models/sound';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Page {

    @JsonProperty('image', Image)
    public image: Image;

    @JsonProperty('sound', Sound)
    public sound: Sound;
}
