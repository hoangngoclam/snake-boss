/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState, useRef } from 'react';
import { API } from '../helper';
import { DropdownComponent, HeaderComponent, PlayerItemComponent } from '../components';
import GamePage from './game.page';
export default function IndexPage() {
    const [users, setUsers]: [IUserModel[], Function] = useState([]);
    const [contentHeigh, setContentHeight]: [any, Function] = useState(null);
    const box: any = useRef(null);
    useEffect(() => {
        API.Get('http://localhost:5000/user-rate').then((result: any) => {
            const dataResult = result.data.users as IUserModel[];
            setUsers(dataResult);
        });
        setTimeout(() => {
            const header: any = document.getElementById('header');
            const headerHeight = header.offsetHeight;
            setContentHeight(box.current.offsetHeight - headerHeight);
        }, 300);
    }, []);

    return (
        <div className="box" ref={box}>
            <HeaderComponent />
            <div
                className="content w-full flex flex-row overflow-hidden"
                style={contentHeigh ? { height: contentHeigh } : {}}
            >
                <div className="w-1/4 bg-pink-400 text-center h-full overflow-hidden ">
                    <h1 className="text-2xl ">Snake's Boss</h1>
                    <div className="rate flex flex-col m-3 overflow-y-scroll" style={{ height: '93%' }}>
                        {users.map((item: IUserModel, index) => (
                            <PlayerItemComponent
                                isPlayer={JSON.parse(localStorage.getItem('user') || 'null').id === item.id}
                                score={item.score}
                                displayName={item.displayName}
                                index={index}
                                avatarUrl={item.avatarUrl}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-3/4 bg-white p-3">
                    {/* <div className="w-full h-12 flex flex-row items-center p-3">
                    <p>Your hight score: </p> <span className="pl-2 text-2xl">300</span>
                </div> */}
                    <div className="w-full h-full bg-gray-200 text-center">
                        <h1 className="text-5xl font-bold">Snake's boss</h1>
                        {/* <button id="play" className="btn btn-primary my-2">
                            Play
                        </button>
                        <h1 id="score" className="font-bold text-3xl">
                            0
                        </h1>
                        <div id="board"></div> */}
                        <GamePage />
                    </div>
                </div>
            </div>
        </div>
    );
}
