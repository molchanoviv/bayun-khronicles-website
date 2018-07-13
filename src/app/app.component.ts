import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private baseTitle = 'Хроники Баюна - ';

    constructor(
        private titleService: Title,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(_ => this.activatedRoute),
                map(route => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }

                    return route;
                }),
                filter(route => route.outlet === 'primary'),
                mergeMap(route => route.data),
                filter(event => event['title'] !== '')
            )
            .subscribe((event) => {
                this.titleService.setTitle(this.baseTitle + event['title']);
            });
    }
}
