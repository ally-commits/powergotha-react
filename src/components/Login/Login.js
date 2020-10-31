import React from 'react'
import styles from './Login.module.css'
import logo from '../../assets/img/logo.png'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.containerLeft}>
                &nbsp;
            </div>

            <div className={styles.containerRight}>
                <div className={styles.rightContainer}>

                    <img src={logo} alt="hobbyIt" className={styles.logo} />

                    <h1 className={styles.head}>Login</h1>

                    <Form>
                        <Form.Group controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" size="lg" />
                        </Form.Group>

                        <Form.Group controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" size="lg" />
                        </Form.Group>
                    </Form>

                    <Button variant="primary" size="lg" block onClick={() => props.history.push("/admin/home")}>LOGIN</Button>
                    
                    <div className={styles.alignRight}>
                        <a href="#">Forgot Password ?</a>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Login;