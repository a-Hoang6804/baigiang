import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUSer from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPagine";

const ManageUser = (props) => {
    const [showModalCreateUser, setshowModalCreateUser] = useState(false);
    const [listUsers, setlistUsers] = useState([])
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const LIMIT_USER = 4;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage]=useState(1);
    //componentDidMount
    useEffect(() => {
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setlistUsers(res.DT)
        }
    }
    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setlistUsers(res.DT.users);
            console.log('asda', res.DT);
            setPageCount(res.DT.totalPages)
        }
    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const resetUpdateData = () => {
        setDataUpdate({});
    }
    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary"
                        onClick={() => setshowModalCreateUser(true)}>
                        <FcPlus />
                        Add new users
                    </button>
                </div>
                <div className="table-users-container">
                    {/* <TableUser listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}

                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setshowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUSer
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    fetchListUsers={fetchListUsers}
                    dataDelete={dataDelete}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

        </div>
    )
}

export default ManageUser;