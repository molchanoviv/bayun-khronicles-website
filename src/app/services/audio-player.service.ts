import { Injectable } from '@angular/core';
import { Sound } from 'app/models/sound';
import { Collection, default as collect } from 'collect.js';

@Injectable({
    providedIn: 'root'
})
export class AudioPlayerService {

    private playingAudios: Collection<HTMLAudioElement> = collect();

    private timers = collect();

    constructor() {}

    public play(sound: Sound): void {
        if (sound.file === null) {
            return;
        }
        const audio: HTMLAudioElement = new Audio(sound.file);
        audio.volume = sound.volume / 100;
        audio.loop = sound.repeat;
        sound.audio = audio;
        if (sound.delay === 0) {
            this.doPlay(sound);
        } else {
            this.timers.push(setTimeout(() => {this.doPlay(sound); }, sound.delay * 1000));
        }
    }

    public stop(audio: HTMLAudioElement): void {
        audio.pause();
        this.playingAudios = this.playingAudios.filter(it => it !== audio);
    }

    public stopAll(): void {
        this.timers.each(clearTimeout);
        this.playingAudios.each(it => this.stop(it));
    }

    private doPlay(sound: Sound): void {
        sound.audio.play();
        this.playingAudios = this.playingAudios.filter(it => it !== sound.audio).push(sound.audio);
        if (sound.duration > 0) {
            setTimeout(() => {this.stop(sound.audio); }, sound.duration * 1000);
        }
    }
}
