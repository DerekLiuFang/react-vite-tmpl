import { useAppDispatch, useAppSelector } from "@/hooks";
import { decrement, increment } from "@/stores/counter/index.ts";
import { Link } from "react-router-dom";

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <Link to="/">Home Page</Link>
    </div>
  );
}
