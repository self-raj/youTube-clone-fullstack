


import MainContent from "./MainContent";
import SideNavbar from "./SideNavbar";


function Home() {
  return (
    // here side bar calling
    <div className="w-full  pt-14 ">
      <SideNavbar />
      <MainContent  />
    </div>
  );
}

export default Home;
