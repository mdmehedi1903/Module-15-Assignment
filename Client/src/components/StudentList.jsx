import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import { DeleteRequest, ListStudent } from '../apiRequest/apiRequest';
import Loader from './Loader';
import {Toaster, toast} from 'react-hot-toast'
import { DeleteAlert } from './Alerts/DeleteAlert';
import { Link } from 'react-router-dom';
const StudentList = () => { 
    const [data, setData] = useState([]);
    const [change, setChange] = useState();

    useEffect(()=>{
        (async ()=>{
            let res = await ListStudent();
            setData(res);
        })()
    },[change])

        // const alertDelete = async(id) => {

        //     DeleteAlert(id)
        // }

        

    const onDelete = async(id) => {
        let res = await DeleteRequest(id);
        if(res){
            toast.success("Student Deleted!")
            setChange(new Date().getTime())
        }else{
            toast.error("Delete Failed!")
        }
    }

    if(data.length===0){
        return(
            <Loader/>
        );
    }
    else{     
        return (
            <Container><br/>
                <Table striped bordered hover responsive>
                    <thead className='table-head'>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Nationality</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Admission Date</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index)=>{
                                return(
                                    <tr>
                                        <td>{item['firstName']} {item['lastName']}</td>
                                        <td>{item['gender']}</td>
                                        <td>{item['dateOfBirth']}</td>
                                        <td>{item['nationality']}</td>
                                        <td>{item['address']}</td>
                                        <td>{item['email']}</td>
                                        <td>{item['phone']}</td>
                                        <td>{item['admissionDate']}</td>
                                        <td>{item['courses']}</td>
                                        <td>
                                            <Link to={"/update?id="+item['_id']} className='btn btn-warning me-2'>
                                                <i className="bi bi-pencil"></i> 
                                            </Link>
                                            <button onClick={()=>{onDelete(item['_id'])}} className='btn btn-danger'>
                                                <i className="bi bi-trash"></i> 
                                            </button>
                                        </td>

                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
                <Toaster position="bottom-center"/>
                </Container>
        );
    }
};

export default StudentList;