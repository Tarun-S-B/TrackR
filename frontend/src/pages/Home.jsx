import LifetimeBox from "../components/LifetimeBox";
import LifetimeBoxSmall from "../components/LifetimeBoxSmall";
import Navbar from "../components/Navbar";
import Graph from "../components/graph/Graph";

import MonthPicker from "../components/MonthPicker";
import TransactionEntry from "../components/TransactionEntry";

const Home = () => {
    return (
        <div className="home-page">
            {/* <Navbar /> */}
            
            <div className="lifetime-box-container flex flex-row justify-evenly">
                {/* <LifetimeBox className="net-worth" name="Net Worth" amount="100000" />
                <div className="flex flex-col gap-5">

                <LifetimeBoxSmall className="earnings" name="Earnings" amount="8000" />
                <LifetimeBoxSmall className="spend" name="Spend" amount="3000" />
                </div> */}
            </div>
            <div className="graph-container flex flex-row justify-evenly mt-8">
                {/* <Graph />
                <Graph /> */}
            {/* <MonthPicker /> */}
            <TransactionEntry />
            </div>



        </div>
    );
}

export default Home;