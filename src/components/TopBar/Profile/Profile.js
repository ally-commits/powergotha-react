import React from 'react'
import styles from './Profile.module.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import {X,Person,EnvelopeFill,HouseFill,ShieldLockFill,LockFill} from 'react-bootstrap-icons'
import profileImg from '../../../assets/img/profile.png'
import {connect} from 'react-redux';
import axios from 'axios'
import {showAlert} from '../../../containers/app/actions'

const Profile = (props) => {
    const [user,setUser] = React.useState({});
    const [password,setPassword] = React.useState("");
    const [error,setError] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    React.useEffect(() => {
        if(props.auth) { 
            setUser(props.auth)
        }
    },[props.auth]); 

    const onSubmit = () => {
        setError(false)
        if(password.length < 8) {
            setError("Password Length Should atleast 8 charactor")
        } else {
            setLoading(true);

            axios({
                method: "post",
                url: "/updatePassword",
                data: {
                    contactNum: user.contactNum,
                    password
                }
            }).then(res => {
                setLoading(false)
                if(res.data.success) {
                    props.showAlert("Password Updated")
                    setPassword("")
                } else {
                    props.showAlert("Something went wrong,Try Again")
                }
            }).catch(err => {
                setLoading(false)
                props.showAlert("Something went wrong,Try Again")
            })
        }
    }
    return (
        <Modal centered show={props.show} onHide={() => props.onHide()} size="md">
            <div className={styles.container}>
                <X color="black" size="40" onClick={() => props.onHide()} className={styles.close} />

                <div className={styles.content}>
                    <h1>Profile</h1>
                    <img src={profileImg} alt="" className={styles.profileImg} />

                    <div className={styles.formContent}>
                        <p>Personal Details</p>
                        
                        <Form.Label htmlFor="username" srOnly>
                            UserName
                        </Form.Label>
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <Person />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="username" placeholder="UserName" value={user.fullName}/>
                        </InputGroup>

                        <Form.Label htmlFor="email" srOnly>
                            Email
                        </Form.Label>
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <EnvelopeFill />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="email" placeholder="Email" value={user.emailId} />
                        </InputGroup>                    
                    </div>

                    <div className={styles.formContent}>
                        <p>Address</p>
                        
                        <Form.Label htmlFor="address" srOnly>
                            Address
                        </Form.Label>
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <HouseFill />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="address" placeholder="Address" value={user.address} />
                        </InputGroup>                  
                    </div>

                    <div className={styles.formContent}>
                        <p>Contact Details</p> 

                        <Form.Label htmlFor="cNumber" srOnly>
                            Contact Number
                        </Form.Label>
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <ShieldLockFill />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="cNumber" placeholder="Contact Number" value={user.contactNum} />
                        </InputGroup>                    
                    </div>

                    <div className={styles.formContent}>
                        <p>Change Password</p>
                        
                        <Form.Label htmlFor="password" srOnly>
                            Password
                        </Form.Label>
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <LockFill />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </InputGroup>
                        {error && 
                            <Form.Text className={styles.error}>
                                {error}
                            </Form.Text>}
                    </div>

                    {loading
                        ?
                    <Button>Updating....</Button>
                        :
                    <Button onClick={onSubmit}>Update Password</Button>}
                </div>
            </div>
        </Modal>
    )
}
const mapStateToProps = state => ({
    auth: state.app.auth
})
export default connect(mapStateToProps,{showAlert})(Profile);