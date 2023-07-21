import { Space } from "antd";
import AppHeader from "../../Components/AppHeaderAnonymous";
import SideMenu from "../../Components/SideMenuAnonymous";
import PageContent from "../../Components/PageContent";

function Anonymous() {
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

export default Anonymous;
