import config from '~/config';

// Layouts

// Pages
import Home from '~/pages/Home';
import Watch from '~/pages/Watch';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.watch, component: Watch },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
