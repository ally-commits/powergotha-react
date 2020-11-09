import React from 'react'
import styles from './Profile.module.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import {X,Person,EnvelopeFill,HouseFill,Shop,ShieldLockFill,LockFill} from 'react-bootstrap-icons'
import profileImg from '../../../assets/img/profile.jpg'
import {connect} from 'react-redux';

const Profile = (props) => {
    const [user,setUser] = React.useState({});

    React.useEffect(() => {
        if(props.auth) { 
            setUser(props.auth)
        }
    },[props.auth]); 
    return (
        <Modal centered show={props.show} onHide={() => props.onHide()} size="md">
            <div className={styles.container}>
                <X color="black" size="40" onClick={() => props.onHide()} className={styles.close} />

                <div className={styles.content}>
                    <h1>Profile</h1>
                    <img src={profileImg} alt="" className={styles.profileImg} />
                    <Button variant="link">Change Photo</Button>


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
                        <p>Bank Details</p>
                        
                        <Form.Label htmlFor="bankName" srOnly>
                            Bank Name
                        </Form.Label>
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <Shop />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="bankName" placeholder="Bank Name" />
                        </InputGroup>

                        <Form.Label htmlFor="accNumber" srOnly>
                            Account Number
                        </Form.Label>
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <ShieldLockFill />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="accNumber" placeholder="Account Number" />
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
                            <FormControl id="password" placeholder="Password" />
                        </InputGroup>
                    </div>

                    {/* <Button>Update Profile</Button> */}
                </div>

            </div>
        </Modal>
    )
}
const mapStateToProps = state => ({
    auth: state.app.auth
})
export default connect(mapStateToProps)(Profile);