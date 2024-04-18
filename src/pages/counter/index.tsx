import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './reudcer';
import axios from 'axios';

export default function Counter() {
  const { value } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  axios.get('https://item.aiyongtech.com/v2/schema/setSessionKey')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
  
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
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