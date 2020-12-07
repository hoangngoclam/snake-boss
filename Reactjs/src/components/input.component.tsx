import React,{ FC } from "react";

export default function Input({id, name, type, placeholder, label, icon: Icon,value, onChangeEvent}:IInputComponent){
    return(
        <div className="flex flex-col mb-6">
            <label htmlFor={id} className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">{label} :</label>
            <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <Icon />
            </div>
            <input id={id} type={type} name={name} placeholder={placeholder} value={value} onChange={(e)=>{onChangeEvent(e)}}
            className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" />
            </div>
        </div>
    );
}

interface IInputComponent{
    id:string,
    name:string,
    type:string,
    placeholder: string,
    label: string,
    value:string,
    icon: FC,
    onChangeEvent: Function,
}