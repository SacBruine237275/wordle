type Grid = string[][];
type Statuses = string[][];

export default function Grid({
  grid,
  statuses,
  activeRow,
  activeCol,
}: { grid: Grid; statuses: Statuses; activeRow: number; activeCol: number }) {
  return (
    <div className="grid grid-rows-6 gap-2 mb-8">
      {grid.map((rowArr, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {rowArr.map((letter, colIndex) => {
            let color = "border-gray-700";
            if (statuses[rowIndex] && statuses[rowIndex][colIndex]) {
              if (statuses[rowIndex][colIndex] === "correct") color = "bg-green-500 border-green-500";
              else if (statuses[rowIndex][colIndex] === "present") color = "bg-yellow-500 border-yellow-500";
              else if (statuses[rowIndex][colIndex] === "absent") color = "bg-gray-700 border-gray-700 opacity-60";
            } else if (rowIndex === activeRow && colIndex === activeCol) {
              color = "border-yellow-400 animate-pulse";
            }
            return (
              <div
                key={colIndex}
                className={`w-14 h-14 border-2 text-white flex items-center justify-center text-xl font-bold ${color}`}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}