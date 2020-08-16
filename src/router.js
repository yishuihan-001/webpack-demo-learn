// import React from 'react';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// import Home from './components/Home';
// import ArtistMain from './components/artists/ArtistMain';
// import ArtistDetail from './components/artists/ArtistDetail';
// import ArtistCreate from './components/artists/ArtistCreate';
// import ArtistEdit from './components/artists/ArtistEdit';

// const Routes = () => {
//   return (
//     <Router history={hashHistory}>
//       <Route path="/" component={Home}>
//         <IndexRoute component={ArtistMain} />
//         <Route path="artists/new" component={ArtistCreate} />
//         <Route path="artists/:id" component={ArtistDetail} />
//         <Route path="artists/:id/edit" component={ArtistEdit} />
//       </Route>
//     </Router>
//   );
// };

// export default Routes;

// 改为

// 注意在最新版的 V4路由版本中，更改了按需加载的方式，如果安装了 V4版，可以自行前往官网学习
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

const rootRoute = {
  component: Home,
  path: '/',
  indexRoute: { component: ArtistMain },
  childRoutes: [
    {
      path: 'artists/new',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistCreate')
          .then(module => cb(null, module.default))
      }
    },
    {
      path: 'artists/:id/edit',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistEdit')
          .then(module => cb(null, module.default))
      }
    },
    {
      path: 'artists/:id',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistDetail')
          .then(module => cb(null, module.default))
      }
    }
  ]
}

const Routes = () => {
  return (
    <Router history={hashHistory} routes={rootRoute} />
  );
};

export default Routes;

