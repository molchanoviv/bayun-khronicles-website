import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from 'app/app.component';
import { routing } from 'app/app.routing';
import { NavigationComponent } from 'app/components/layout/navigation/navigation.component';
import { ComicsComponent } from 'app/components/pages/comics/comics.component';
import { DashboardComponent } from 'app/components/pages/dashboard/dashboard.component';
import { GameComponent } from 'app/components/pages/game/game.component';
import 'jquery';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        GameComponent,
        ComicsComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        routing
    ],
    providers: [
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
