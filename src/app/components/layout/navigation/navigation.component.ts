import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AutoUnsubscribe } from 'app/annotations/auto-unsubscribe.annotation';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    @ViewChild('outlet', {read: ElementRef}) public outlet;

    private subscriptions: Subscription[] = [];

    constructor(private router: Router, @Inject(DOCUMENT) private document) {}

    public ngOnInit(): void {

        this.subscriptions.push(this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(_ => {
                const outletPosition = this.outlet.nativeElement.getBoundingClientRect();
                if (outletPosition.y < 0) {
                    this.outlet.nativeElement.scrollIntoView({behavior: 'smooth'});
                }
            })
        );
    }
}
