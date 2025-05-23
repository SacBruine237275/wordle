const AZERTY = [
  ['A','Z','E','R','T','Y','U','I','O','P'],
  ['Q','S','D','F','G','H','J','K','L','M'],
  [String.fromCharCode(8592),'W','X','C','V','B','N',String.fromCharCode(0x232B)]
]

export default function Keyboard({ onKeyPress,
  keyStatuses = {} }
  : { onKeyPress: (key: string) => void,
    keyStatuses?: Record<string, string> 
  }) {

   function getKeyColor(key: string) {
    if (keyStatuses[key] === "correct") return "bg-green-500 border-green-500";
    if (keyStatuses[key] === "present") return "bg-yellow-500 border-yellow-500";
    if (keyStatuses[key] === "absent") return "bg-gray-700 border-gray-700 opacity-60";
    return "bg-gray-700 text-white";
  }

  return (
    <div className="space-y-2">
      {AZERTY.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`text-white font-bold py-2 px-4 rounded ${getKeyColor(key)}`}>
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
