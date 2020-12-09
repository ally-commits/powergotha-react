import React from 'react'
import styles from './Login.module.css'
import logo from '../../assets/img/logo.png' 
import axios from 'axios' 
import {connect} from 'react-redux'
import {showAlert,setAuth} from '../../containers/app/actions'
import TextField from '@material-ui/core/TextField'
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import PassTextField from '../utils/PassTextField/PassTextField'
import LANG from '../../translator'

const Login = (props) => {
    const [formData,setFormData] = React.useState({
        phoneNumber: '',
        password: "",
    });
    const [formError,setFormError] = React.useState({
        phoneNumber: false,
        password: false,
    });
    const [loading,setLoading] = React.useState(false);

    React.useEffect(() => {
        if(props.auth) {
            props.history.push("/user/home")
        }
    },[props.auth]);
    
    const validate = () => {
        let value = true;
        let err = {phoneNumber: false,password: false}
        setFormError({...err});
        if(formData.phoneNumber == "") {
            value = false;
            err.phoneNumber = "Enter valid Phone Number"
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

            axios({
                method: "post",
                url: "/auth/login",
                data: {
                    ...formData,
                    phoneNumberId: formData.phoneNumber
                }
            }).then(res => {  
                props.setAuth({...res.data.user,token: res.data.token})
                localStorage.setItem("token",res.data.token)
                props.showAlert("Logged In Successfully") 
                setLoading(false);
            }).catch(err => {
                if(err && err.response) 
                    props.showAlert(err.response.data.error)
                else 
                    props.showAlert("Something went wrong Try Again")

                setLoading(false);
            });
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}> 
                    <img src={logo} alt=""/>
                    <h1 className={styles.head}>Agrowon Animal Care</h1>
                </div> 
            
                <div className={styles.loginContent}>
                    <h1 className={styles.loginHead}>Login</h1>

                    <TextField
                        variant="standard"
                        fullWidth
                        label={"Phone Number"}
                        className={styles.textField}
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData,phoneNumber: e.target.value})}
                        error={formError.phoneNumber}
                        helperText={formError.phoneNumber}
                    /> 

                    <PassTextField
                        variant="standard"
                        fullWidth
                        label={"Password"}
                        className={styles.textField}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData,password: e.target.value})}
                        error={formError.password}
                        helperText={formError.password}
                    />

                    {loading
                        ?
                    <button className={styles.signIn}>
                        Loading ... 
                    </button>
                        :
                    <button className={styles.signIn} onClick={onSubmit}>
                        Login 
                    </button>}

                    <p>2019 © Agrowon Agrotech Industries Pvt. Ltd</p>
                </div>

                <div className={styles.loginFooter}>
                    &nbsp;
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.app.auth
});
export default connect(mapStateToProps,{showAlert,setAuth})(Login);