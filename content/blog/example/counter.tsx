import { useState } from "react";
export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button
      className="px-4 py-2 hover:cursor-pointer ring-2 hover:ring-4 rounded-md transition ease-out hover:ease-in"
      onClick={() => setCount(count + 1)}
      style={{
        width: "50px",
        display: "flex",
        justifyContent: "center",
        borderRadius: "5px",
        background: "lightgrey",
      }}
    >
      {count}
    </button>
  );
}
