import config from '~/config';

// Layouts

// Pages
import Home from '~/pages/Home';
import Watch from '~/pages/Watch';
import Review from '~/pages/Review';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.watch, component: Watch },
    { path: config.routes.review, component: Review },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
