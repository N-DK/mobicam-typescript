import { DefaultLayout } from '../components/layouts/DefaultLayout';
import { Route } from '../types';
import { Home } from '../views/Home';

export const publicRoutes: Route[] = [
    { path: '/online', component: Home, layout: DefaultLayout },
];
