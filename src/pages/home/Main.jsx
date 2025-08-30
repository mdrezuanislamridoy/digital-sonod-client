import React from "react";
import HeroSection from "../../components/pageComponents/HeroSection";
import authUser from "../../state/userState";
import SebasomuhoSection from "../../components/pageComponents/AmaderSebaSomuho";

export default function Main() {
  const { user } = authUser();
  return (
    <div>
      <HeroSection user={user} />
      <SebasomuhoSection />
    </div>
  );
}
