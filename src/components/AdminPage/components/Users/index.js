/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { UsersContext } from "../../../../contexts/UsersProvider";
import { useGetData } from "../../hooks/useGetData";
import { usePostData } from '../../hooks/usePostData';

const Users = () => {

  const {register, handleSubmit} = useForm();
  const {setUsers} = useContext(UsersContext);
  const {isError, isLoading, data} = useGetData('users', 0, 0, setUsers);
  const {isLoading: isLoadingPost, addData} = usePostData('users'); 

  useEffect(() => {
    fetchApiUsers(0, 0);

    return () =>
      setUsers({
        data: [],
        pagination: {
          current: 1,
          pageSize: 10,
        },
      });
  }, []);

  const fetchApiUsers = (pageSize, current) => {
    const url =
      "/users?" +
      new URLSearchParams({
        limit: pageSize,
        skip: current - 1,
      });

    fetch(url, {
      headers: { Accept: "application/json" }, 
    })
      .then((response) => response.json())
      .then((response) => {

        const { users = [], pagination } = response;

        const auth = response.auth;

        if (auth) {
          setUsers({
            data: response.data,
            pagination: {
              current: current || 1,
              pageSize: pagination.pageSize || 10,
              total: pagination.total || 5,
            },
          });
        }
       
      });
  };

  const addUsers = (data) => {
    
    let jsonData = {
        ...data,
        role: { name: 'user', scope: "notMember" },
      };

    fetch("/users", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("User duplicate");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Create User</h3>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(addUsers)}>
              <div className={styles.field}>
                <label className={styles.label} for="name">
                  Name:
                </label>
                <input
                  id="name"
                  type="name"
                  name="name"
                  required="required"
                  {...register("name")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="password">
                  Password:
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required="required"
                  {...register("password")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="email">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required="required"
                  {...register("email")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="age">
                  Age :
                </label>
                <input id="age" name="age" type="number" {...register("age")} />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="address">
                  Address :
                </label>
                <input
                  id="address"
                  name="address"
                  required="required"
                  {...register("address")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="country">
                  Country :
                </label>
                <input
                  id="country"
                  name="country"
                  required="required"
                  {...register("country")}
                />
              </div>
              <Row>
                <input className="submit" type="submit" />
              </Row>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
