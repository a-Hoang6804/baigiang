import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import axios from 'axios';
import { toast } from 'react-toastify';
const ModalCreateUser = (props) => {
    const { show, setShow } = props;
    // const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("USER");
    const [previewIamge, setPreviewImage] = useState("");

    const handleUpdateImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0]);
        } else {
            // setPreviewImage("");
        }
        console.log("upload file", event.target.files[0]);
    }

    const handSubmitCreateUser = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email');//phuong thuc chay ra loi
            return;
        }

        if (!password) {
            toast.error('Invalid password');
        }
        //call api
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('username', username);
        data.append('role', role);
        data.append('userImage', image);

        let res = await axios.post('http://localhost:8081/api/v1/participant', data);
        console.log(">>check ", res.data);
        //kiem tra co tai khoan ch
        if (res.data && res.data.EC === 0) {
            toast.success(res.data.EM);
            handleClose();
        }

        if (res.data && res.data.EC !== 0) {
            toast.error(res.data.EM);
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-4" size="lg">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                {/* htmlFor: chon file dep */}
                                <FcPlus />
                                Upload File Image
                            </label>
                            <input type='file'
                                id='labelUpload' hidden
                                onChange={(event) => handleUpdateImage(event)}
                            />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {/* <span>Ok bae</span> */}
                            {previewIamge ?
                                <img src={previewIamge}></img>
                                :
                                <span>PreviewIamge</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handSubmitCreateUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreateUser;