import { Injectable } from '@angular/core';
import { Sound } from 'app/models/sound';
import { Collection, default as collect } from 'collect.js';

@Injectable({
    providedIn: 'root'
})
export class AudioPlayerService {

    private playingSounds: Collection<Sound> = collect();

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
            setTimeout(() => {this.doPlay(sound); }, sound.delay * 1000);
        }
    }

    public stop(sound: Sound): void {
        const playingSound = this.playingSounds.first(s => s.file === sound.file);
        if (playingSound === undefined) {
            return;
        }
        this.doStop(playingSound);
    }

    public stopAll(): void {
        const sounds = this.playingSounds;
        sounds.each(sound => this.stop(sound));
    }

    private fadeOut(sound: Sound): void {
        let actualVolume = sound.audio.volume;
        const fadeOutInterval = setInterval(
            () => {
                actualVolume = actualVolume - 0.1;
                if (actualVolume >= 0) {
                    sound.audio.volume = actualVolume;
                } else {
                    sound.audio.pause();
                    this.removeSound(sound);
                    clearInterval(fadeOutInterval);
                }
            },
            100
        );
    }

    private fadeIn(sound: Sound): void {
        let actualVolume = 0;
        sound.audio.play();
        this.addSound(sound);
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

    private addSound(sound: Sound): void {
        this.playingSounds = this.playingSounds.filter(s => s.file !== sound.file).push(sound);
    }

    private removeSound(sound: Sound): void {
        this.playingSounds = this.playingSounds.filter(s => s.file !== sound.file);
    }

    private doPlay(sound: Sound): void {
        if (sound.useFadeIn) {
            this.fadeIn(sound);
        } else {
            sound.audio.play();
            this.addSound(sound);
        }
        if (sound.duration > 0) {
            setTimeout(() => {this.doStop(sound); }, sound.duration * 1000);
        }
    }

    private doStop(sound: Sound): void {
        if (sound.useFadeOut) {
            this.fadeOut(sound);
        } else {
            sound.audio.pause();
            this.removeSound(sound);
        }
    }
}
