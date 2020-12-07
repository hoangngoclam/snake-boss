import React from "react";

export default function GamePage(){
    return(
        <div>
            <div>
                <h1>Simple Snake</h1>
                <button id="play">Play</button>
                <div className="best-score">
                    Best score: <span> 0</span>
                </div>
                <h1 id="score">0</h1>
                <div id="board"></div>
            </div>
        </div>
    );
}