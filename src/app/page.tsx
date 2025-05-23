'use client';
import Grid from "@/components/Grid";
import Keyboard from "@/components/Keyboard";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {
  const [solution, setSolution] = useState<string>('');
  const [grid, setGrid] = useState(Array(6).fill([]).map(() => Array(5).fill('')))
  const [row, setRow] = useState<number>(0)
  const [col, setCol] = useState<number>(0)
  const [hasWon, setHasWon] = useState(false)
  const [hasFail, setHasFail] = useState(false)
  const [alreadyPlayed, setAlreadyPlayed] = useState(false)

  const [statuses, setStatuses] = useState<string[][]>(Array(6).fill(null).map(() => Array(5).fill('')));

  useEffect(() => {
    const getWord = async () => {
      const res = await fetch('/api/word');
      if (res.status == 403) {
        setAlreadyPlayed(true);
        return;
      }
      const data = await res.json();
      setSolution(data.word);
    }
    getWord();
  }, []);

  function getGuess(row: number): string {
    return grid[row].join('').toLowerCase();
  }

  function checkWord(row: number): boolean {  
    return getGuess(row) === solution.toLowerCase();
  }

  function getStatuses(row:number): string[] {
    const result = Array(5).fill('absent');
    const solutionArr = solution.toLowerCase().split('');
    const guessArr = getGuess(row).split('');
    const used = Array(5).fill(false);

    for (let i = 0; i < 5; i++) {
      if (guessArr[i] === solutionArr[i]) {
        result[i] = 'correct';
        used[i] = true;
      }
    }
    for (let i = 0; i < 5; i++) {
      if (result[i] !== 'correct') {
        const idx = solutionArr.findIndex((c, j) => c === guessArr[i] && !used[j]);
        if (idx !== -1) {
          result[i] = 'present';
          used[idx] = true;
        }
      }
    }
    return result;
  }

  function getKeyboardStatuses(statuses: string[][], grid: string[][]): Record<string, string> {
    const letterStatus: Record<string, string> = {};
    for (let i = 0; i < statuses.length; i++) {
      for (let j = 0; j < statuses[i].length; j++) {
        const letter = grid[i][j]?.toUpperCase();
        const status = statuses[i][j];
        if (!letter || !status) continue;

        if (status === "correct") letterStatus[letter] = "correct";
        else if (status === "present" && letterStatus[letter] !== "correct") letterStatus[letter] = "present";
        else if (status === "absent" && !letterStatus[letter]) letterStatus[letter] = "absent";
      }
    }
    return letterStatus;
  }


  const handleKeyPress = (key: string) => {
    if (key === String.fromCharCode(0x232B)) { // backspace
      if (col > 0) {
        const newGrid = [...grid]
        newGrid[row][col - 1] = ''
        setGrid(newGrid)
        setCol(col - 1)
      }
    } else if (key.length === 1 && col < 5 && key !== String.fromCharCode(8592) && key != String.fromCharCode(0x232B)) {
      const newGrid = [...grid]
      newGrid[row][col] = key.toUpperCase()
      setGrid(newGrid)
      setCol(col + 1)
    }

    if (key === String.fromCharCode(8592) && col == 5) { // new line
      const newStatuses = [...statuses];
      newStatuses[row] = getStatuses(row);
      setStatuses(newStatuses);
      if (checkWord(row)) {
        setHasWon(true);
      } else {
        if (row == 5) {
          setHasFail(true);
          return;
        }
        setRow(row + 1);
        setCol(0);
      }
    }
  }

  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (hasWon || hasFail || alreadyPlayed) return; // désactive si partie finie
    if (e.key === "Backspace") {
      handleKeyPress(String.fromCharCode(0x232B));
    } else if (e.key === "Enter") {
      handleKeyPress(String.fromCharCode(8592));
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      handleKeyPress(e.key.toUpperCase());
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [handleKeyPress, hasWon, hasFail, alreadyPlayed]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 select-none cursor-default">
      <Grid grid={grid} statuses={statuses} activeRow={row} activeCol={col} />
<Keyboard onKeyPress={handleKeyPress} keyStatuses={getKeyboardStatuses(statuses, grid)} />      {hasWon && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg text-center space-y-4">
            <h2 className="text-2xl font-bold"> Vous avez gagné ! </h2>
            <p className="text-lg">Le mot du jour était bien :</p>
            <p className="text-2xl font-mono font-semibold">{solution}</p>
          </div>
        </div>
      )}

      {hasFail && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg text-center space-y-4">
            <h2 className="text-2xl font-bold"> Vous avez perdus ! </h2>
            <p className="text-lg">Le mot du jour était :</p>
            <p className="text-2xl font-mono font-semibold">{solution}</p>
          </div>
        </div>
      )}

      {alreadyPlayed && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg text-center space-y-4 max-w-sm w-full">
            <h2 className="text-2xl font-bold">Déjà joué !</h2>
            <p>Vous avez déjà joué aujourd’hui à trouver le mot.</p>
            <p className="text-sm text-gray-600">Revenez demain pour un nouveau mot.</p>
          </div>
        </div>
      )}

      <Link
        href="/info"
        className="fixed bottom-4 right-4 px-3 py-1.5 bg-blue-600 text-white rounded-md shadow-md
                   hover:bg-blue-700 transition-colors duration-200"
        aria-label="Informations sur le projet"
        title="Informations sur le projet"
      >
        Info
      </Link>
    </main>
  )
}
