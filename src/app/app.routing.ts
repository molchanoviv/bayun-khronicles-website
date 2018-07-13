import { RouterModule, Routes } from '@angular/router';
import { ComicsComponent } from 'app/components/pages/comics/comics.component';
import { DashboardComponent } from 'app/components/pages/dashboard/dashboard.component';
import { GameComponent } from 'app/components/pages/game/game.component';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent, data: { title: '' }  },

    { path: 'comics', component: ComicsComponent, data: { title: 'Comics' } },
    { path: 'game', component: GameComponent, data: { title: 'Game' } },

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
