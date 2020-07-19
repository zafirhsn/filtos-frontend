// import Index from './views/Index.vue';
// import Home from './views/Home.vue';
import queryString from 'query-string';

export const routes = [
  { path: '/', name: 'index', component: () => import('./views/Index.vue'),
    beforeEnter(to, from, next) {
      let cookies = document.cookie.split("; ");
      console.log(cookies);
      let parsedCookie = {};
      for (let i of cookies) {
        let index = i.indexOf('=');
        let name = i.substring(0,index);
        let value = i.substring(index+1, i.length);
        parsedCookie[name] = value;
      }

      console.log(parsedCookie);
      if (parsedCookie["_session"]) {
        next('/home')
      } else {
        next();
      }
    
    }
  },
  { path: '/home', name: 'home', component: () => import('./views/Home.vue'), 
    beforeEnter(to, from, next) {
      const getQueryParams = (url) => {
        let queryParams = {};
      //create an anchor tag to use the property called search
        let anchor = document.createElement('a');
      //assigning url to href of anchor tag
        anchor.href = url;
      //search property returns the query string of url
        let queryStrings = anchor.search.substring(1);
        let params = queryStrings.split('&');
    
        for (var i = 0; i < params.length; i++) {
            var pair = params[i].split('=');
            queryParams[pair[0]] = decodeURIComponent(pair[1]);
        }
        return queryParams;
      };

      let queryParams = getQueryParams(window.location.href);
      console.log(queryParams);

      let cookies = document.cookie.split("; ");
      let parsedCookie = {};
      for (let i of cookies) {
        let index = i.indexOf('=');
        let name = i.substring(0,index);
        let value = i.substring(index+1, i.length);
        parsedCookie[name] = value;
      }
      console.log(parsedCookie);

      if (queryParams.code && queryParams.state) {
        next();
      }
      else if (parsedCookie["_session"]) {
        next();
      }
      else {
        next('/')
      }
    }
  },
  { path: '*', component: () => import('./views/Index.vue'), 
    beforeEnter(to, from, next) {
      let cookies = document.cookie.split("; ");
      console.log(cookies);
      let parsedCookie = {};
      for (let i of cookies) {
        let index = i.indexOf('=');
        let name = i.substring(0,index);
        let value = i.substring(index+1, i.length);
        parsedCookie[name] = value;
      }

      console.log(parsedCookie);
      if (parsedCookie["_session"]) {
        next('/home')
      } else {
        next();
      }
    }
  }
]