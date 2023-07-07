import { Space } from "antd";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import PageContent from "../../Components/PageContent";

function Home() {
  return (
    <div className="App">
      <AppHeader />
      <Space className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
      </Space>
    </div>
  );
}

export default Home;
