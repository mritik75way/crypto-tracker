import {
  Outlet,
  useNavigate,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  LineChartOutlined,
  WalletOutlined,
  BellOutlined,
} from "@ant-design/icons";
import ErrorBoundary from "../components/ErrorBoundary";
import Loader from "../components/Loader";
import AlertWatcher from "../components/AlertWatcher";
import { UserButton, useUser } from "@clerk/clerk-react";

const { Sider, Content } = Layout;

const menuItems = [
  { key: "/", icon: <AppstoreOutlined />, label: "Dashboard" },
  { key: "/market", icon: <LineChartOutlined />, label: "Market" },
  { key: "/portfolio", icon: <WalletOutlined />, label: "Portfolio" },
  { key: "/alerts", icon: <BellOutlined />, label: "Alerts" },
];

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = useNavigation();
  const { user } = useUser();

  const isLoading = navigation.state === "loading";

  return (
    <Layout className="h-screen overflow-hidden">
      <AlertWatcher />
      
      <Sider 
        theme="light" 
        breakpoint="lg" 
        collapsedWidth="0"
        className="border-r border-gray-200" 
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-center border-b border-gray-100 shrink-0">
            <span className="text-xl font-bold text-blue-600">CryptoTrack</span>
          </div>

          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            className="flex-1 border-r-0 mt-2 overflow-y-auto"
          />

          <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0">
            <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate text-gray-700">
                  {user?.fullName}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Sider>

      <Layout>
        <Content className="p-6 bg-gray-50 overflow-y-auto h-full">
          <div className="max-w-7xl mx-auto min-h-full">
            <ErrorBoundary>
              {isLoading ? <Loader /> : <Outlet />}
            </ErrorBoundary>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;