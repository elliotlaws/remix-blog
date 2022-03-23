import { useState } from "react";
export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button
      className="px-4 py-2 hover:cursor-pointer ring-2 hover:ring-4 rounded-lg transition ease-out hover:ease-in"
      onClick={() => setCount(count + 1)}
      style={{
        width: "45px",
        display: "flex",
        justifyContent: "center",
        borderRadius: "5px",
        background: "lightgrey",
        color: "black",
      }}
    >
      {count}
    </button>
  );
}
