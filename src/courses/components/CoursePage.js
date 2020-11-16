import React, { useState, useContext } from 'react';

import './CoursePage.css'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';
import Modal from './EModal'

const onChangeHandler=event=>{

    console.log(event.target.files[0])
	state.selectedFile = event.target.files[0]
}
let state = {
	selectedFile: null
}
let error= null
const CoursePage = (props) => {
	const course = props.history.location.params
	const weeks = course.weeks
	console.log(course)
	const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {isLoading, sendRequest, clearError} = useHttpClient()
  const [formState, inputHandler, setFormData] = useForm(
    {
      pdf: {
        value: '',
        isValid: false
	  },
	  assignment:{
		  value: '',
		  isValid: false
	  }
    },
    false
  );

  function myApp(){
	
	let i=1
	return (<div>
				 {weeks.map(week=> (
					 <div>
				<h3>Week {i} </h3> <br></br>
			  <li>{week}</li>
			  {/* <li>Big-O notations and big-O values for array operations.</li> */}
			  <br></br>

			  <div className="container">
			  
			  <form className="form" onSubmit={teacherFormSubmitHandler}>
				<div>
				<b>Teacher Upload Assignment {i} :  </b>  
				< input type='text' label='assignment' element='input' id='assignment' value={i.toString()} />
				<input type='file' name='pdf' label='pdf' onChange={onChangeHandler}/>

				  <button type="submit" >Submit</button>
					</div>
				  </form>
			 
			 <form className="form" onSubmit={formSubmitHandler}>
			 <div>
				<b>Student Upload Assignment {i} :  </b>  
				< input type='text' label='assignment' element='input' id='assignment' value={i.toString()} />
				<input type='file' name='pdf' label='pdf' onChange={onChangeHandler}/>

				  <button type="submit" >Submit</button>
					</div>
				  </form>
			</div>
				<br></br>
				</div>
				 ))}
				</div>
	)}
const formSubmitHandler = async event => {
	event.preventDefault()
	  const data = new FormData() 
	  data.append('pdf', state.selectedFile)
	  console.log(data)
     try{ 
		 axios.post(process.env.REACT_APP_BACKEND_URL +`student/assignments/upload/${course.cid}/karankaramchandani5@gmail.com`, data, { // receive two parameter endpoint url ,form data 
	})
	.then(res => { // then print response status
		console.log(res.data)
		alert(res.data.data.status)
		error=res.data.data.status
	})
    }
    catch(err){
	  console.log(err)
	}
  };

  const teacherFormSubmitHandler = async event => {
	  event.preventDefault()
	  const data = new FormData() 
	  data.append('pdf', state.selectedFile)
	  console.log(data)
     try{ 
		 axios.post(process.env.REACT_APP_BACKEND_URL +`teacher/assignments/upload/${course.cid}/teacher@gmail.com`, data, { // receive two parameter endpoint url ,form data 
	})
	.then(res => { // then print response status
		console.log(res)
		alert(res.data.data.status)
		error=res.data.data.status
	})
    }
    catch(err){
	  console.log(err)
	}
  };

	return (
		<React.Fragment>
			<Modal error={error}></Modal>
		<div className="maths-page">
		  <div className="page-wrapper">
			<h1 className="page-title">{course.title}</h1>
			<p className="page-paragraph">
			 	{course.description}
			 	</p>
			<hr />
			<div className="page-cards-wrapper">
			  <div className="page-card" style={{ backgroundColor: "#FAC8CD" }}>
				<div className="page-card-img">
				  <i className="fas fa-chalkboard"></i>
				</div>
				<h3 className="page-card-title">Devices</h3>
				<p className="page-card-body">
				Online Studies made easy 
				</p>
			  </div>
			  <div className="page-card" style={{ backgroundColor: "#D7BCC8" }}>
				<div className="page-card-img">
				  <i className="fas fa-book-open"></i>
				</div>
				<h3 className="page-card-title">Accessible Resources</h3>
				<p className="page-card-body">
					All Study materials available anytime from anywhere
				</p>
			  </div>
			  <div className="page-card" style={{ backgroundColor: "#98B6B1" }}>
				<div className="page-card-img">
				  <i className="fas fa-school"></i>
				</div>
				<h3 className="page-card-title">Expert instruction</h3>
				<p className="page-card-body">
				  Learn under expert guidance
				</p>
			  </div>
			  <div className="page-card" style={{ backgroundColor: "#629677" }}>
				<div className="page-card-img">
				  <i className="fas fa-microscope"></i>
				</div>
				<h3 className="page-card-title">Lifetime access</h3>
				<p className="page-card-body">
				  Learn on your schedule
				</p>
			  </div>
			</div>
			<hr />
			<h1 className="page-title">Course Details</h1>
			<ul className="page-list">
			{myApp()}
			</ul>
		  </div>
		</div>
		</React.Fragment>
	  );
}

  const onChange = (e) => {
    console.log(e.target.files)
  }
export default CoursePage;
