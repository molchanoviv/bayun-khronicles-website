'use strict';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Sound {

    @JsonProperty('file', String)
    public file: string | null = null;

    @JsonProperty('volume', Number)
    public volume: number = 100;

    @JsonProperty('delay', Number)
    public delay: number = 0;

    @JsonProperty('useFadeIn', Boolean)
    public useFadeIn: boolean = false;

    @JsonProperty('useFadeOut', Boolean)
    public useFadeOut: boolean = false;
}
