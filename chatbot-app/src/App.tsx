import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello Vite + React!</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is: {count}
      </button>
      <p>
        Edit <code>App.tsx</code> and save to test HMR updates.
      </p>
    </div>
  );
};

export default App;
