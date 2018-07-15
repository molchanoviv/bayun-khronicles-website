import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'app/annotations/auto-unsubscribe.annotation';
import { Chapter } from 'app/models/chapter';
import { Page } from 'app/models/page';
import { DataStorageService } from 'app/services/data-storage.service';
import { Collection, default as collect } from 'collect.js';
import { Subscription } from 'rxjs';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 500,
    hideDelay: 500,
    touchendHideDelay: 500
};

@AutoUnsubscribe()
@Component({
    selector: 'app-comics',
    templateUrl: './comics.component.html',
    styleUrls: ['./comics.component.css'],
    providers: [
        {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
    ]
})
export class ComicsComponent implements OnInit {

    public currentChapterNumber: number;

    public currentPageNumber: number;

    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        private location: Location,
        private dataStorage: DataStorageService
    ) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.route.params.subscribe(params => {
                this.currentChapterNumber = parseInt(params['chapter'], 10);
                this.currentPageNumber = parseInt(params['page'], 10);
            })
        );
    }

    public get chapters(): Collection<Chapter> {
        return this.dataStorage.chapters.sortBy('number');
    }

    public get currentChapter(): Chapter | null {
        return this.chapters.first(chapter => chapter.number === this.currentChapterNumber) || null;
    }

    public get previousChapter(): Chapter | null {
        return this.chapters.last(chapter => chapter.number < this.currentChapterNumber) || null;
    }

    public get nextChapter(): Chapter | null {
        return this.chapters.first(chapter => chapter.number > this.currentChapterNumber) || null;
    }

    public onChapterChange(chapterNumber): void {
        this.navigateToPage(chapterNumber, this.pages.first().number);
    }

    public get pages(): Collection<Page> {
        if (this.currentChapter === null) {
            return collect();
        }

        return this.currentChapter.pages.sortBy('number');
    }

    public get currentPage(): Page | null {
        return this.pages.first(page => page.number === this.currentPageNumber) || null;
    }

    public get previousPage(): Page | null {
        return this.pages.last(page => page.number < this.currentPageNumber) || null;
    }

    public get nextPage(): Page | null {
        return this.pages.first(page => page.number > this.currentPageNumber) || null;
    }

    public hasPreviousPage(): boolean {
        return this.chapters.first().number !== this.currentChapterNumber || this.pages.first().number !== this.currentPageNumber;
    }

    public hasNextPage(): boolean {
        return this.chapters.last().number !== this.currentChapterNumber || this.pages.last().number !== this.currentPageNumber;
    }

    public onPageChange(pageNumber): void {
        this.navigateToPage(this.currentChapterNumber, pageNumber);
    }

    public goBackward(): void {
        if (this.previousPage !== null) {
            this.navigateToPage(this.currentChapterNumber, this.previousPage.number);

            return;
        }
        const previousChapter = this.previousChapter;
        if (previousChapter === null) {
            return;
        }
        this.navigateToPage(previousChapter.number, previousChapter.pages.last().number);

        return;
    }

    public goForward(): void {
        if (this.nextPage !== null) {
            this.navigateToPage(this.currentChapterNumber, this.nextPage.number);

            return;
        }
        const nextChapter = this.nextChapter;
        if (nextChapter === null) {
            return;
        }
        this.navigateToPage(nextChapter.number, nextChapter.pages.last().number);

        return;
    }

    @HostListener('document:keydown', ['$event'])
    public handleKeyboardEvent(event: KeyboardEvent): void {
        if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
            this.goBackward();
        }
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowRight') {
            this.goForward();
        }
        event.preventDefault();
    }

    private navigateToPage(chapterNumber: number, pageNumber: number): void {
        this.router.navigate(['comics', chapterNumber, 'page', pageNumber]).then().catch();
    }
}
