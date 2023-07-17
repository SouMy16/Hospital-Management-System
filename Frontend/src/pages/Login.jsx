import React from 'react'
import '../styles/Registerstyles.css';
import { Form, Input,message} from 'antd';
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import axios from "axios";
import { Link,useNavigate} from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("https://hospital-management-veiu.onrender.com/api/v1/user/login", values);
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("something went wrong");
    }
  };

  return (
      <div className="form-container" id="form">
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
              <h3 className='text-center' id="text-center">Login Form</h3>
              <Form.Item label="Email- admin@gmail.com" name="email" placehoder="admin@gmail.com">
                <Input type="email" required/>
              </Form.Item>
              <Form.Item label="Password- 1234" name="password" placeholder="1234">
                <Input type="password" required/>
              </Form.Item>
              <Link to="/Register" className="m-2">Not a user Register here</Link>
              <button className='btn btn-primary' type="submit">Login</button>
        </Form>
   </div>
  )
}

export default Login
