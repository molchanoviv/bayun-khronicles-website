import { Component, OnInit } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material';
import { Chapter } from 'app/models/chapter';
import { DataStorageService } from 'app/services/data-storage.service';
import { Collection } from 'collect.js';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 500,
    hideDelay: 500,
    touchendHideDelay: 500
};

@Component({
    selector: 'app-comics',
    templateUrl: './comics.component.html',
    styleUrls: ['./comics.component.css'],
    providers: [
        {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
    ]
})
export class ComicsComponent implements OnInit {

    public currentChapter: number;

    constructor(private dataStorage: DataStorageService) {}

    public ngOnInit(): void {}

    public get chapters(): Collection<Chapter> {
        return this.dataStorage.chapters.sortBy('number');
    }

    // public get currentPage(): Page {
    //
    // }
}
