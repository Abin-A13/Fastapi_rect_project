import { useState } from "react";

const ReverseString: React.FC = () => {
  const [inputStr, setInputStr] = useState<string>("");
  const [reversedStr, setReversedStr] = useState<string>("");

  const reverseString = () => {
    let letters = inputStr.replace(/[^a-zA-Z]/g, "").split("").reverse();
    let result = inputStr.split("").map(char => /[a-zA-Z]/.test(char) ? letters.shift() : char);
    setReversedStr(result.join(""));
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Reverse String (Keep Special Characters)</h2>
      <input className="border p-2 w-96 mb-2" value={inputStr} onChange={(e) => setInputStr(e.target.value)} placeholder="Enter a string" />
      <button className="bg-blue-500 text-white p-2 w-96 rounded" onClick={reverseString}>Reverse</button>
      <p className="text-xl font-semibold mt-4">Result: {reversedStr}</p>
    </div>
  );
};

export default ReverseString;
