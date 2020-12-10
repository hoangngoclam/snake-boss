import React, {useEffect, useState} from "react";
import API from "../helper";
import { DropdownComponent, HeaderComponent, PlayerItemComponent } from "../components";

export default function IndexPage(){
    const [users, setUsers]:[IUserModel[],Function] = useState([]);
    useEffect(()=>{
        API.Get("http://localhost:5000/user-rate")
        .then((result: any)=>{
            let dataResult = result.data.users as IUserModel[];
            setUsers(dataResult);
        })
    },[])
    return(
        
        <div className=" w-full">
        <HeaderComponent />
        <div className="content w-full flex flex-row">
            <div className="w-1/4 bg-pink-400 text-center ">
                <h1 className="text-2xl ">Snake's Boss</h1>
                <div className="rate flex flex-col p-3">
                    {
                        users.map((item: IUserModel,index)=>(
                            <PlayerItemComponent score={item.score} displayName={item.displayName} index={index} avatarUrl={item.avatarUrl}/>
                        ))
                    }
                </div>
            </div>
            <div className="w-3/4 bg-white">
                <div className="w-full h-12 flex flex-row items-center p-3">
                    <p>Your hight score: </p> <span className="pl-2 text-2xl">300</span>
                </div>
                <div className="w-full h-full bg-gray-200">
                    
                </div>
            </div>
        </div>
    </div>
    );
}