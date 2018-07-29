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

    public stop(sound: Sound): void {
        if (sound.useFadeOut) {
            this.fadeOut(sound);
        } else {
            this.doStop(sound.audio);
        }
    }

    public stopAll(): void {
        this.timers.each(clearTimeout);
        this.playingAudios.each(it => this.doStop(it));
    }

    private fadeIn(sound: Sound): void {
        let actualVolume = 0;
        const fadeInInterval = setInterval(
            () => {
                actualVolume = actualVolume + 0.1;
                if (actualVolume <= sound.volume / 100) {
                    sound.audio.volume = actualVolume;
                } else {
                    clearInterval(fadeInInterval);
                }
            },
            100
        );
    }

    private fadeOut(sound: Sound): void {
        let actualVolume = sound.audio.volume;
        const fadeOutInterval = setInterval(
            () => {
                actualVolume = actualVolume - 0.1;
                if (actualVolume >= 0) {
                    sound.audio.volume = actualVolume;
                } else {
                    this.doStop(sound.audio);
                    clearInterval(fadeOutInterval);
                }
            },
            100
        );
    }

    private doPlay(sound: Sound): void {
        if (sound.useFadeIn) {
            this.fadeIn(sound);
        }
        sound.audio.play();
        this.playingAudios = this.playingAudios.filter(it => it !== sound.audio).push(sound.audio);
        if (sound.duration > 0) {
            setTimeout(() => {this.stop(sound); }, sound.duration * 1000);
        }
    }

    private doStop(audio: HTMLAudioElement): void {
        console.log(audio);
        audio.pause();
        this.playingAudios = this.playingAudios.filter(it => it !== audio);
    }
}
