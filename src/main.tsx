import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import qs from 'qs';
import { store } from './store';
import Routers from './routes';
import './index.less';

declare global {
  interface Window {
      userInfo: { userId: number, nick: string };
      parseParams: { [key: string]: any };
  }
}

const parsedParams = qs.parse(location.search.slice(1));
window.parseParams = parsedParams;
console.log('路由参数', location);

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement!).render(
  <BrowserRouter basename={location.pathname}>
    <Provider store={store}>
      <Routers />
    </Provider>
  </BrowserRouter>
);