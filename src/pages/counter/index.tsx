import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement } from './reudcer';
import { api } from 'utils/api';
import { ENV } from 'constants/env';

export default function Counter() {
  const { value } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  const getProductInfo = () => {
    api({
      host: ENV.hosts.pre,
      method: '/v2/tiktok/getProductInfo',
      body: {
        product_id: '1729477036068868473',
      },
      callback: (res) => {
        console.error('getProductInfo--res', res);
      },
      errCallback: (err) => {
        console.error('getProductInfo--err', err);
      },
    });
  }

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={getProductInfo}
        >
          Increment
        </button>
        <span>{value}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}