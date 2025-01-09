import Dashboard from "./dashboard";
import Sales from "./sales";
import TopTables from "./top-tables";
import Visitors from "./visitors";
import PageTraffic from "./page-traffic";

const Admin = () => {
  return (
    <div className="text-[#262626]">
      <Dashboard />
      <Sales />
      <TopTables />
      <Visitors />
      <PageTraffic />
    </div>
  );
};

export default Admin;
