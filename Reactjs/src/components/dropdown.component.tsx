import React,{useState,FC} from "react";

export default function DropdownComponent({dropdownItems: DropdownItems}:IPropDropdown){
    const [isShow,setIsShow] = useState(false);
    const onToggleClick = ()=>{
        setIsShow((prev)=>{
            return !prev;
        })
    }
    return(
        <div className="ml-3 dropdown relative cursor-pointer" onClick={onToggleClick}>
            {
                isShow?
                <i className="fas fa-angle-up "></i>:
                <i className="fas fa-angle-down "></i>
            }
            
            {
                isShow?
                    <DropdownItems/>:
                <div></div>
            }
            
        </div>
    );
}
interface IPropDropdown{
    dropdownItems:FC
}