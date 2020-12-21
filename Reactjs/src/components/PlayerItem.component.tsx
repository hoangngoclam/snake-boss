import React, { useState } from 'react';

export default function PlayerItem({ index, avatarUrl, displayName, score, isPlayer = false }: IPlayerItem) {
    const rateComponent = () => {
        if (index <= 2) {
            return <img src={`/imgs/${index + 1}.png`} alt="kdkd" className="w-2/12" />;
        } else {
            return <span className="rank w-2/12 text-xl">{index + 1}</span>;
        }
    };
    return (
        <div
            className={`p-1 rate__item border border-gray-400 flex flex-row items-center justify-center ${
                isPlayer ? 'bg-green-600 text-white' : 'bg-white'
            }`}
        >
            {rateComponent()}
            <div className="w-2/12">
                <div className=" w-12 h-12 rounded-full overflow-hidden relative">
                    <img
                        src={`http://localhost:5000/imgs/` + avatarUrl}
                        className="w-full h-full object-cover object-center absolute z-0"
                        alt="avatar"
                    />
                </div>
            </div>
            <span className="name w-7/12 text-left pl-3">{displayName}</span>
            <span className="score w-1/12 text-2xl font-bold">{score}</span>
        </div>
    );
}
interface IPlayerItem {
    index: number;
    displayName: string;
    score: number;
    avatarUrl: string;
    isPlayer: boolean;
}
