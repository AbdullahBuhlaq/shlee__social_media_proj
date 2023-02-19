import { useState } from "react";

function Test() {
  const [array, setArray] = useState(["a", "c", "b", "d"]);
  return (
    <button
      onClick={() => {
        array[2] = "a";
        setArray([...array]);
        console.log(array);
      }}
    >
      aa
    </button>
  );
}

export default Test;
