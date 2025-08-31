import React from "react";
import AdminState from "../../../state/AdminState";
import Profile from "./section/Profile";
import AbedonList from "./section/AbedonList";

export default function Chairman() {
  const { setSelectedPortion, selectedPortion } = AdminState();

  const Section = () => {
    switch (selectedPortion) {
      case "profile":
        return <Profile />;
      case "abedonList":
        return <AbedonList />;
      default:
        return <Profile />;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setSelectedPortion("profile")}>Profile</button>
        <button onClick={() => setSelectedPortion("abedonList")}>
          Abedon List
        </button>
      </div>
      <div>
        <Section></Section>
      </div>
    </div>
  );
}
