import React from "react";

export default function SnakeComponent({y,x}:IPosition){
    return(
        <>
           <div className="target-dot" style={{top:`${y}%`,left:`${x}%`}}></div>
        </>
    );
}