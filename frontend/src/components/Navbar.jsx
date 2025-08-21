import { NavLink } from "react-router-dom";
import { Vault, ArrowUp, Home, Wallet, Settings, Repeat, LogOut } from "lucide-react";



const Navbar = () => {
    return (
        <>
        
        
        
        <div className="
        fixed flex flex-col justify-evenly p-3 gap-10
        bg-sky-200
        ml-15 py-10 pl-10 pr-20
        rounded-3xl
        ">
                
            
            <div className="flex flex-row">
                <Home className=""/>
                <NavLink to="/" className="nav-link pl-3">Home</NavLink>
            </div>

            <div className="flex flex-row">
                <Vault className=""/>
                <NavLink to="/savings" className="nav-link pl-3">Savings</NavLink>
            </div>

            <div className="flex flex-row">
                <ArrowUp className=""/>
                <NavLink to="/earnings" className="nav-link pl-3">Earnings</NavLink>
            </div>

            <div className="flex flex-row">
                <Wallet />
                <NavLink to="/expenses" className="nav-link pl-3">Expenses</NavLink>
            </div>

            <div className="flex flex-row">
                <Repeat />
                <NavLink to="/recurring" className="nav-link pl-3">Recurring</NavLink>
            </div>

            <div className="flex flex-row">
                <Settings />
                <NavLink to="/settings" className="nav-link pl-3">Settings</NavLink>
            </div>

            <div className="bg-gray-500 h-[2px] mt-30 w-[140%] relative left-[-5%]">

            </div>

            <div className="flex flex-row ">
                <LogOut />
                <NavLink to="/signout" className="nav-link pl-3">SignOut</NavLink>
            </div>

        </div>
        
        


        
        </>
    )
}

export default Navbar;