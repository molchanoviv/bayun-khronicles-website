import { RouterModule, Routes } from '@angular/router';
import { ComicsComponent } from 'app/components/pages/comics/comics.component';
import { DashboardComponent } from 'app/components/pages/dashboard/dashboard.component';
import { GameComponent } from 'app/components/pages/game/game.component';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent, data: { title: 'Выбор раздела' }  },

    { path: 'comics/:chapter/page/:page', component: ComicsComponent, data: { title: 'Комикс' } },
    { path: 'game', component: GameComponent, data: { title: 'Игра' } },

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
