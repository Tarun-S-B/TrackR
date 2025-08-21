import { DollarSign, Settings } from "lucide-react";

const HeaderBar = () => {
    return (
        <div className="flex flex-row p-3 space-x-4 bg-sky-200 items-center justify-between w-[100%] fixed top-0 mb-50">
            <div className="flex flex-row items-center">
                <DollarSign size={50}/>
                <div className="flex flex-col justify-center ml-3">
                    <p className="text-sm">Hello </p>
                    <p className="text-xl font-bold">Target</p>
                </div>
            </div>
            <p className="text-4xl font-bold pr-20">TrackR</p>
            <Settings size={0}/>
        </div>
    )
}

export default HeaderBar;