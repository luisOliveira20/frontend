import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

const instructors = [
        { id: 1, name: 'Instrutor A' },
        { id: 2, name: 'Instrutor B' },
        { id: 3, name: 'Instrutor C' },
    ];

export const Registo = ({user = {name: ""}}) => {
    const {register, handleSubmit, reset} = useForm();
    
    useEffect(() => {
        reset(user);
    }, [user]);

        const [formData, setFormData] = useState({
          name: '',
          email: '',
          instructor: '',
        });
      
    

    return (
        <Container>
            <Row>
                <Col className={styles.column}>
                    <h3> Registo de Atletas </h3>
                    <div className={styles.form_group}>
                        <form
                            className={styles.form}
                            onSubmit={handleSubmit((data) => {
                                console.log(data);
                            })}
                        >
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
                                <label className={styles.label} for="email">
                                    Email:
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required="required"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="instructor"> Escolha o Instrutor: </label>
                                    <select
                                        id="instructor"
                                        name="instructor"
                                        value={formData.instructor}
                                        required
                                    >
                                        <option value=""> Selecione um instrutor </option>
                                            {instructors.map((instructor) => (
                                                <option key={instructor.id} value={instructor.name}>
                                                    {instructor.name}
                                                </option>
                                            ))}
                                    </select>
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