import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chapter } from 'app/models/chapter';
import { ChapterReference } from 'app/models/chapter-reference';
import { Comics } from 'app/models/comics';
import { DataStorageService } from 'app/services/data-storage.service';
import { SerializerService } from 'app/services/serializer-service';
import collect, { Collection } from 'collect.js';
import { merge, Observable, Subscription } from 'rxjs';
import { concatAll, map, take, toArray } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ComicsLoaderService {

    constructor(private http: HttpClient, private dataStorage: DataStorageService, private serializer: SerializerService) {}

    public loadComics(): Observable<Observable<Chapter>[]> {
        return this.http
            .get<any>('/assets/comics/index.json')
            .pipe(
                map(response => this.serializer.deserialize(response, Comics)),
                map(comics => this.dataStorage.comics = comics),
                take(1),
                map(comics => comics.chapters),
                concatAll(),
                map((comics: any) => this.loadChapter(comics)),
                toArray()
            );
    }

    private loadChapter(chapterReference: ChapterReference): Observable<Chapter> {
        return this.http
            .get<any>(chapterReference.path)
            .pipe(
                map(response => this.serializer.deserialize(response, Chapter)),
                map(chapters => this.dataStorage.chapters.push(chapters)),
                take(1)
            );
    }
}

export function loadComics(comicsLoader: ComicsLoaderService): () => Promise<any> {
    return async (): Promise<any> => {
        const result = await comicsLoader.loadComics().toPromise();

        return merge(
            ...result
        ).toPromise();
    };
}
