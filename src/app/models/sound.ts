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

    @JsonProperty('duration', Number)
    public duration: number = 0;

    @JsonProperty('repeat', Boolean)
    public repeat: boolean = false;

    public audio: HTMLAudioElement;
}
