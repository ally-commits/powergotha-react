import React from 'react'
import styles from './Login.module.css'
import logo from '../../assets/img/logo.png' 
import axios from 'axios' 
import {connect} from 'react-redux'
import {showAlert,setAuth} from '../../containers/app/actions'
import TextField from '@material-ui/core/TextField'
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

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
            props.history.push("/admin/home")
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
                if(res.data.user.userType != "ADMIN") {
                    props.showAlert("401: You don't have enough access")
                } else {
                    props.setAuth({...res.data.user,token: res.data.token})
                    localStorage.setItem("token",res.data.token)
                    props.showAlert("Logged In Successfully")
                }
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
                    <img src={logo} alt="" className={logo} />
                    <h1 className={styles.head}>YoPaan</h1>
                </div>

                <div className={styles.loginContainer}>
                    <div className={styles.loginContent}>
                        <h1 className={styles.loginHead}>Sign In</h1>

                        <TextField
                            variant="standard"
                            fullWidth
                            label="PhoneNumber"
                            className={styles.textField}
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({...formData,phoneNumber: e.target.value})}
                            error={formError.phoneNumber}
                            helperText={formError.phoneNumber}
                        /> 

                        <TextField
                            variant="standard"
                            fullWidth
                            label="Password"
                            className={styles.textField}
                            value={formData.password}
                            onChange={(e) => setFormData({...formData,password: e.target.value})}
                            error={formError.password}
                            helperText={formError.password}
                        />

                        {loading
                            ?
                        <button className={styles.signIn}>
                            Loading...
                            <ArrowForwardRoundedIcon />
                        </button>
                            :
                        <button className={styles.signIn} onClick={onSubmit}>
                            Sign In
                            <ArrowForwardRoundedIcon />
                        </button>}
                    </div>
                </div>

                <div className={styles.loginFooter}>&nbsp;</div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.app.auth
});
export default connect(mapStateToProps,{showAlert,setAuth})(Login);