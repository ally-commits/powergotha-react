import Modal from 'react-bootstrap/Modal'
import styles from './Modal.module.css'
import {X} from 'react-bootstrap-icons'
 


const ModalComp = (props) => {
    return (
        <Modal centered show={props.show} onHide={() => props.onHide()} size="lg">
            <div className={styles.container}>
                <X color="white" size="50" onClick={() => props.onHide()} />
                <img src={props.show} className={styles.imgContent} />
            </div>
        </Modal>
    )
}

export default ModalComp;