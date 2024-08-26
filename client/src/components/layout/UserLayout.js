import React, { useState } from "react";
import SupportNavbar from "./SupportNavbar";
import UserSidebar from "./UserSidebar";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Layout, Drawer, Affix } from "antd";
const { Header: AntHeader, Content, Sider } = Layout;

const UserLayout = ({ children }) => {
  // useEffect(() => {
  //   setUserData(location.state);
  //   setTicketData(location.state);
  // }, [location.state]);
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const [isClosing, setIsClosing] = React.useState(false);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Layout
        className={`layout-dashboard ${
          pathname === "profile" ? "layout-profile" : ""
        } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
      >
        <Drawer
          title={false}
          placement={placement === "right" ? "left" : "right"}
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
          key={placement === "right" ? "left" : "right"}
          width={250}
          className={`drawer-sidebar ${
            pathname === "rtl" ? "drawer-sidebar-rtl" : ""
          } `}
        >
          <Layout
            className={`layout-dashboard ${
              pathname === "rtl" ? "layout-dashboard-rtl" : ""
            }`}
          >
            <Sider
              trigger={null}
              width={250}
              theme="light"
              className={`sider-primary ant-layout-sider-primary ${
                sidenavType === "#fff" ? "active-route" : ""
              }`}
              style={{ background: sidenavType }}
            >
              <UserSidebar
              
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                isClosing={isClosing}
                setIsClosing={setIsClosing}
              />
            </Sider>
          </Layout>
        </Drawer>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          trigger={null}
          width={250}
          theme="light"
          className={`sider-primary ant-layout-sider-primary ${
            sidenavType === "#fff" ? "active-route" : ""
          }`}
          style={{ background: sidenavType }}
        >
          <UserSidebar
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            isClosing={isClosing}
            setIsClosing={setIsClosing}
          />
        </Sider>
        <Layout>
          {fixed ? (
            <Affix>
              <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
                <SupportNavbar
                  onPress={openDrawer}
                  name={pathname}
                  subName={pathname}
                  handleSidenavColor={handleSidenavColor}
                  handleSidenavType={handleSidenavType}
                  handleFixedNavbar={handleFixedNavbar}
                />
              </AntHeader>
            </Affix>
          ) : (
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <SupportNavbar
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          )}
          <Content className="content-ant">
            <div className="content">
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  paddingTop: "50px",
                  paddingRight: "50px",
                }}
              >
                <img
                  src="https://support.saumiccraft.com/wp-content/uploads/2023/05/logo-saumic-new.png"
                  alt=""
                />
              </div> */}
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
      {/* <div className="main">
        <div className="menu"> */}
      {/* <UserLayoutMenu /> */}

      {/* </div> */}

      {/* </div> */}
    </Box>
  );
};

export default UserLayout;
