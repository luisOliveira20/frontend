/* eslint-disable no-unused-vars */
import { 
  Row, 
  Container, 
  Nav, 
  NavItem,
  NavLink, 
  TabContent, 
  TabPane,
} from "reactstrap";
import React, {useState, useEffect, useRef} from "react";
import { Tickets } from "./components/Tickets";
import { Registo } from "./components/Registo";
import { Member } from "./components/Member";
import styles from "./styles.module.scss";
import { useGetPerfil } from "../../hooks/useGetPerfil";
import {
  socketAddListener,
  socketRemoveListener,
  initSocket,
} from '../../socket/socket';
import addNotification from 'react-push-notification';

const UserPage = () => {

  const [activePage, setActivePage] = useState("1");
  const {isError, isLoading, user} = useGetPerfil("users");

  const listenerConfiguredRef = useRef(false);

  const newNotification = (data) => {
    if(data.key === 'Game') {
      addNotification({
        title: 'Warning',
        subtitle: 'Games',
        message: data.message,
        theme: 'darkblue',
        native: false,
      });
    } else {
      addNotification({
        title: "New Notification",
        subtitle: 'User',
        message: data.message,
        theme: 'red',
        native: false,
      });
    }
  };
  useEffect(() => {
    initSocket();
    if(!listenerConfiguredRef.current) {
      console.log('Configurando ouvinte pela primeira vez');
      const handleNotification = (data) => {
        newNotification(data);
      };
      socketAddListener('admin_notifications', handleNotification);
      listenerConfiguredRef.current = true;
    } else {
      console.log('Ouvinte já configurando. Ignorando....');
    }
    return (handleNotification) => {
      socketRemoveListener('admin_notifications', handleNotification);
    };
  }, []);

  const navItems = [
    {
      id: "1",
      title: "Registo",
    },
    {
      id: "2",
      title: "Tickets",
    },
    {
      id: "3",
      title: "Member",
    }
  ];
  const items = [
    {
      id: "1",
      children: <Registo user={user.data} />,
    },
    {
      id:"2",
      children: <Tickets />,
    },
    {
      id: "3",
      children: <Member user={user.data} />,
    },
  ];


  return (
    <Container className={styles.container}>
      <h1>User { user.data.name }</h1>
      <Row className={styles.row}>
        <Nav tabs>
          {navItems.map((item) => {
            return (
              <NavItem>
                <NavLink
                  className={item.id === activePage}
                  onClick={() => setActivePage(item.id)}
                >
                  {item.title} {" "}
                  {item.count && (<span className={styles.count}>{item.count}</span>)}
                </NavLink>
              </NavItem>
            );
          })}
      </Nav>
      <TabContent activeTab={activePage}>
        {items.map((item) => {
          return <TabPane tabId={item.id}> { item.children } </TabPane>;
        })}
      </TabContent>
    </Row>
  </Container>
  );
};

export default UserPage;
