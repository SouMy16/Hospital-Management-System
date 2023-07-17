
import React from 'react'
import Layout from '../components/Layout'
import { Col,Form,Input,Row,TimePicker,message } from 'antd'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'
import moment from 'moment'

function ApplyDoctor() {
  const {user}=useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate=useNavigate()

  const handleFinish=async(values)=>{
    try{
      dispatch(showLoading())
      const res = await axios.post('https://hospital-management-veiu.onrender.com/api/v1/user/apply-doctor',{...values, userId:user._id,timings:[
        moment(values.timings[0]).format("HH:mm"),
        moment(values.timings[1]).format("HH:mm")
    ],},{

          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
        navigate('/')
      }
        else{
         message.error(res.data.success)
        }
    }catch(error){
      dispatch(hideLoading())
      console.log(error)
      message.error('Something went wrong')
    }
  }
  return (
    <Layout>
      <h1 className='text-center'>Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className='m-3'>
      <h4 className=''> Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
                <Form.Item label="First Name" name="firstName" required rules={[{required:true}]} className="label-black">
                  <Input type="text" placeholder="your First name"/>
                </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
               <Form.Item label="Last Name" name="lastName" required rules={[{required:true}]} className="label-black">
                  <Input type="text" placeholder="your Last name"/>
                </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
               <Form.Item label="Phone" name="phone" required rules={[{required:true}]} className="label-black">
                  <Input type="text" placeholder="your Phone no."/>
                </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
               <Form.Item label="Email" name="email" required rules={[{required:true}]} className="label-black">
                  <Input type="email" placeholder="your Email"/>
                </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
               <Form.Item label="Website" name="website" className="label-black">
                  <Input type="text" placeholder="your Website"/>
                </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
               <Form.Item label="Address" name="address" required rules={[{required:true}]} className="label-black">
                  <Input type="text" placeholder="your Address"/>
                </Form.Item>
          </Col>
        </Row>
        <h4 className=''> Professional Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
                <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]} className="label-black">
                  <Input type="text" placeholder="your Specialization"/>
                </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
               <Form.Item label="Experience" name="experience" required rules={[{required:true}]} className="label-black">
                  <Input type="text" placeholder="your Experience"/>
                </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
               <Form.Item label="FeesPerConsultation" name="feesPerConsultation" required rules={[{required:true}]} className="label-black">
                  <Input type="text" placeholder="Fees Per Consultation"/>
                </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
               <Form.Item label="Timings" name="timings" required rules={[{required:true}]} className="label-black">
                  <TimePicker.RangePicker format="HH:mm"/>
                </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
              <button className='btn btn-primary form-btn'>Submit</button>
          </Col>
        </Row>
      </Form>
    </Layout>
  )
}

export default ApplyDoctor
