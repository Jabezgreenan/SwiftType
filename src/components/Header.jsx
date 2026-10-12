import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="flex text-[#FFFF] [text-shadow:0_0_8px_rgba(26,213,255,0.6)] bg-[#020C12] justify-between  py-4 px-8"> 
            <Link className="text-2xl " to={"."}>
                SwiftType
            </Link>
        </header>
    )
}