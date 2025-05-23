import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cookies=request.cookies;
    const lastPlayed=cookies.get('alreadyPlayed')?.value;

    const today=new Date().toISOString().split('T')[0];
    if(lastPlayed===today){
        return NextResponse.json(
            { error: "Déjà joué aujourd’hui. Reviens demain !" },
            { status: 403 }
        )
    }
    const word=getWord(today);
    const response = NextResponse.json({ word });
    response.cookies.set('alreadyPlayed', today, {
        httpOnly: true,
    });
    return response;
}

function getWord(today:string){
    const filePath = "src/data/words.txt";
    const content=readFileSync(filePath, "utf-8");
    const words = content.split("\n").map((word) => word.trim());
    const hash = [...today].reduce((acc, c) => acc + c.charCodeAt(0), 0)
    const word = words[hash % words.length]
    return word;
}