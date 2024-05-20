import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import qs from 'qs';
import { store } from './store';
import Routers from './routes';
import { userInfoInit } from 'utils/userInfo';
import './index.scss';

declare global {
  interface Window {
    userInfo: Record<string, any>;
    parseParams: Record<string, any>;
  }
}

const parsedParams: Record<string, any> = qs.parse(location.search.slice(1));
window.parseParams = parsedParams;
console.log('路由参数', location, parsedParams);
userInfoInit({ shop_region: parsedParams?.shop_region });

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement!).render(
  <BrowserRouter basename={location.pathname}>
    <Provider store={store}>
      <Routers />
    </Provider>
  </BrowserRouter>
);