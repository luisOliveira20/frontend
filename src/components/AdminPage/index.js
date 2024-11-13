import React, { useState, useContext } from "react";
import styles from "./styles.module.scss";
import {
  Row,
  Container,
  Nav,
  NavItem,
  TabContent,
  NavLink,
  TabPane,
} from "reactstrap";
import Users from "./components/Users";
import { TabContext } from './contexts/TabProvider/TabContext';

const AdminPage = () => {
  const [activePage, setActivePage] = useState("1");
  const { countGames } = useContext(TabContext);

  const navItems = [
    {
      id: "1",
      title: "Users",
    },
  ];
  
  const items = [
    {
      id: "1",
      children: <Users />,
    },
  ];

  return (
    <Container className={styles.container}>
      <h1>Admin</h1>
      <Row className={styles.row}>
        <Nav tabs>
            {navItems.map((item) => {
              return (
                <NavItem key={item.id}>
                  <NavLink
                    className={item.id === activePage ? 'active' : ''}
                    onClick={() => setActivePage(item.id)}
                  >
                    {item.title} {item.count && (<span className={styles.count}>{item.count}</span>)}
                  </NavLink>
                </NavItem>
              );
            })}
        </Nav>
        <TabContent activeTab={activePage}>
          {items.map((item) => {
            return (
              <TabPane tabId={item.id} key={item.id}>
                { item.children }
              </TabPane>
            );
          })}
        </TabContent>
      </Row>
    </Container>
  );
};

export default AdminPage;
