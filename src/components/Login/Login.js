import React from 'react'
import styles from './Login.module.css'
import logo from '../../assets/img/logo.png'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import {connect} from 'react-redux'
import {showAlert} from '../../containers/app/actions'


const Login = (props) => {
    const [formData,setFormData] = React.useState({
        username: '',
        password: "",
    });
    const [formError,setFormError] = React.useState({
        username: false,
        password: false,
    });
    const [loading,setLoading] = React.useState(false);

    const validate = () => {
        let value = true;
        let err = {username: false,password: false}
        setFormError({...err});
        if(formData.username == "") {
            value = false;
            err.username = "Enter valid Email"
        }
        if(formData.password == "") {
            value = false;
            err.password = "Enter valid Password"
        }
        setFormError({...err});
        return value;
    }

    const onSubmit = () => {
        if(validate()) {
            setLoading(true);

            // axios({
            //     method: "pddost",
            //     url: "/login",
            //     data: {
            //         ...formData
            //     }
            // }).then(res => {
            //     setLoading(false);
            // }).catch(err => {
                setTimeout(() => {
                    setLoading(false);
                    props.history.push("/admin/home");
                    
                    props.showAlert("Error: Something went wrong Try Again")
                },3000)
                // props.history.push
            // });
        }
    }
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
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" size="lg" value={formData.username} onChange={(e) => setFormData({...formData,username: e.target.value})} />
                            
                            {formError.username &&
                                <Form.Text className={styles.error}>
                                    Enter valid Username
                                </Form.Text>}

                        </Form.Group>

                        <Form.Group controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" size="lg" value={formData.password} onChange={(e) => setFormData({...formData,password: e.target.value})}/>

                            {formError.password && 
                                <Form.Text className={styles.error}>
                                    Enter valid Password 
                                </Form.Text>}

                        </Form.Group>
                    </Form>
                    
                    {loading 
                        ?
                    <Button variant="primary" size="lg" block className={styles.btnLoading} >
                        <Spinner animation="grow" />
                        LOADING...</Button>
                        :
                    <Button variant="primary" size="lg" block onClick={onSubmit}>LOGIN</Button>
                    }
                    
                    <div className={styles.alignRight}>
                        <a href="#">Forgot Password ?</a>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default connect(null,{showAlert})(Login);