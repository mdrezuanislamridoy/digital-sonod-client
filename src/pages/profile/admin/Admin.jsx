import AdminState from "../../../state/AdminState";
import AdminProfile from "./section/AdminProfile";

export default function Admin() {
  const { selectedPortion, setSelectedPortion } = AdminState();

  const renderSection = () => {
    switch (selectedPortion) {
      case "profile":
        return <AdminProfile />;
      default:
        return <AdminProfile />;
    }
  };

  return (
    <div className="block md:flex min-h-screen bg-gray-50">
      <aside className="w-full md:w-60 bg-white shadow-lg p-4 ">
        <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>
        <div className="flex md:block">
          <button
            onClick={() => {
              setSelectedPortion("profile");
            }}
            className={`block w-full  py-1 cursor-pointer ${
              selectedPortion === "profile" ? "bg-gray-300" : "bg-gray-100"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => {
              setSelectedPortion("requests");
            }}
            className={`block w-full  py-1 cursor-pointer ${
              selectedPortion === "requests" ? "bg-gray-300" : "bg-gray-100"
            }`}
          >
            Agency Requests
          </button>

          <button
            onClick={() => {
              setSelectedPortion("allagencies");
            }}
            className={`block w-full  py-1 cursor-pointer ${
              selectedPortion === "allagencies" ? "bg-gray-300" : "bg-gray-100"
            }`}
          >
            All Agencies
          </button>
          <button
            onClick={() => {
              setSelectedPortion("blockedAgencies");
            }}
            className={`block w-full  py-1 cursor-pointer ${
              selectedPortion === "blockedAgencies"
                ? "bg-gray-300"
                : "bg-gray-100"
            }`}
          >
            Blocked Agencies
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:h-[90vh] md:overflow-scroll">
        {renderSection()}
      </main>
    </div>
  );
}
