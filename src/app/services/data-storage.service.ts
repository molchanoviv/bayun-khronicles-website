import { Injectable } from '@angular/core';
import { Chapter } from 'app/models/chapter';
import { Comics } from 'app/models/comics';
import { Collection, default as collect } from 'collect.js';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    public comics: Comics;

    public chapters: Collection<Chapter> = collect();
}
