export type Route = {
    path: string;
    component: React.FC;
    layout: React.FC<{ children: React.ReactNode }>;
};
