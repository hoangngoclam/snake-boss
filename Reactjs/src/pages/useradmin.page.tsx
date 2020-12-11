import React,{useEffect, useState} from "react";
import { HeaderAdminComponent } from "../components";
import { API } from "../helper";

export default function UserAdminPage(){
    const[players,setPlayers]:[IUserModel[],Function] = useState([]);
    useEffect(()=>{
        API.Get("http://localhost:5000/user-rate")
        .then((result: any)=>{
            let dataResult = result.data.users as IUserModel[];
            setPlayers(dataResult);
        })
    },[])

    return(
        <div className=" w-full">
        <HeaderAdminComponent />
        <div className=" content w-full flex flex-row">
            <div className="container mx-auto">
                <table id="custom" className="mt-10">
                    <thead >
                        <tr className="text-left "> 
                          <th className="w-1/12 py-3">STT</th>
                          <th className="w-4/12">Display name</th>
                          <th className="w-4/12">Email</th>
                          <th className="w-1/12">Status</th>
                          <th className="w-2/12">###</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            players.map((item,index)=>{
                                return (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.displayName}</td>
                                        <td>{item.email}</td>
                                        <td></td>
                                        <td>
                                            <div className="flex flex-row items-center">
                                                <div className="mr-3 cursor-pointer text-green-600 opacity-80 hover:opacity-100">
                                                    <i className="fas fa-sync-alt"></i>
                                                </div>
                                                <div className="mr-3 cursor-pointer text-green-600 opacity-80 hover:opacity-100">
                                                    <i className="fas fa-sync-alt"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}