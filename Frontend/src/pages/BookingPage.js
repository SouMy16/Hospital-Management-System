import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, DatePicker, TimePicker } from 'antd'
import moment from 'moment'
const BookingPage = () => {
    const params = useParams()
    const [doctors, setDoctors] = useState([]);
    const[date,setDate]=useState()
    const[timings,setTimings]=useState()
    const [isAvailable,setIsAvailable]=useState()
    const getUserData = async () => {
        try {
            const res = await axios.post('https://hospital-management-veiu.onrender.com/api/v1/doctor/getDoctorById', { doctorId: params.doctorId }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
            });
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserData()
        //eslint-disable-next-line
    }, [])
    return (
        <Layout>
            <h3>Booking Page</h3>
            <div className='container m-2'>
                {doctors && (
                    <div>
                    <h4> Dr.{doctors.firstName} {doctors.lastName}</h4>
                    <h4> Fees: {doctors.feesPerConsultation}</h4>
                    {/* <h4>Timings :{doctors.timings}</h4> */}
                    <div className='d-flex flex-column w-50'>
                        <DatePicker className='m-2' format='DD-MM-YYYY' onChange={(value)=>moment(value).format('DD-MM-YYYY')}/>
                        <TimePicker.RangePicker  format="HH:mm"  onChange={(values)=>setTimings([moment(values[0]).format('HH:mm'),moment(values[1].format('HH:mm'))])}/>
                        <button className='btn btn-n mt-2'>Check Availability</button>
                        <button className='btn btn-n green mt-2'>Book Now</button>
                    </div>
                    </div>
                )}
                {console.log()}
            </div>
        </Layout>
    )
}

export default BookingPage
