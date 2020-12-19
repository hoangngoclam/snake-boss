import React from "react";

export default function SnakeComponent({dots}:ISnakeDotes){
    return(
        <>
            {
                dots.map((position)=>{
                    let styleObject={top:`${position.y}%`,left:`${position.x}%`}
                    return <div className="snake-dot" style={styleObject}></div>
                })
            }
        </>
    );
}
interface ISnakeDotes{
    dots:IPosition[]
}