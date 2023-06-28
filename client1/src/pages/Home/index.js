import { Space } from "antd";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import PageContent from "../../components/PageContent";

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
