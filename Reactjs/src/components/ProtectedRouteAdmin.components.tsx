import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRouteAdmin({component:Component, ...rest}: any){
    return(
        <Route {...rest} render={(props)=>{
            if(localStorage.getItem('admin') != null){
                return <Component {...rest}/>
            }
            else{
                return <Redirect to="/admin/login"/>
            }
        }}/>
    );
}