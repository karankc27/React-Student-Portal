import React, { useState, useContext } from 'react';

import './CoursePage.css'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';


const CoursePage = (props) => {
	console.log(props)
	const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {isLoading, error, sendRequest, clearError} = useHttpClient()
  const [formState, inputHandler, setFormData] = useForm(
    {
      pdf: {
        value: '',
        isValid: false
      }
    },
    false
  );

	const formSubmitHandler = async event => {
	console.log('In form submit handler')
	event.preventDefault();
	console.log(formState.inputs.pdf.value)
     try{ 
      const res = await sendRequest(process.env.REACT_APP_BACKEND_URL +'teacher/assignments/upload/10/7', 'POST', JSON.stringify({
          pdf : formState.inputs.pdf.value,
        }),
        {
        'Content-Type': 'application/json'
        },
	  )
	  console.log(res)
    }
    catch(err){
      console.log(err)
    }
  };
	console.log(props)
	return (
		<div className="maths-page">
		  <div className="page-wrapper">
			<h1 className="page-title">{props.title} Data Structures and Algorithms in Java</h1>
			<p className="page-paragraph">
			  Learn the strengths and weaknesses of a variety of data structures, so you can choose the best data structure for your data and applications. Also Learn many of the algorithms commonly used to sort data, so your applications will perform efficiently when sorting large datasets.
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
			  <h3>Week 1</h3> 
			  <br></br><h4>Arrays and Big-O Notation</h4> <br></br>
			  <li>A quick review of arrays in Java and arrays as data structures.</li>
			  <li>Big-O notations and big-O values for array operations.</li>
			  <br></br>
			  
			 <div className="container">
			 <form className="form" onSubmit={formSubmitHandler}>
        		<div>
				<b>Upload Assignment 1 :  </b>  < Input onChange={onChange} />
        		  <button type="submit" >Submit</button>
        			</div>
      			</form>
    		</div>
				<br></br>
				
				<h3>Week 2</h3> 
			  <br></br><h4>Sort Algorithms</h4><br></br>
			  <li>Detailed desciption of bubble sort, selection sort, insertion sort.</li>
			  <li>Detailed desciption of merge sort, quick sort, and radix sort.</li>
				<br></br>
				
				
				<div className="container">
				<form className="form" >
        		<div>
				<b>Upload Assignment 2 :  </b>  < Input onChange={onChange} />
        		  <button type="submit">Submit</button>
        			</div>
      			</form>
    		</div>
				<br></br>
				
				<h3>Week 3</h3> 
			  <br></br><h4>Lists</h4><br></br>
			  <li>Abstract data types and array lists in java.</li>
			  <li>Singly linked lists and doubly linked lists.</li>
		          <br></br>
		<div className="container">
			 <form className="form" >
        		<div>
				<b>Upload Assignment 3 :  </b>  < Input onChange={onChange} />
        		  <button type="submit">Submit</button>
        			</div>
      			</form>
    		</div>
				<br></br>
		
		<h3>Week 4</h3> 
			  <br></br><h4>Stacks and Queues</h4><br></br>
			  <li>Theory and implementation of stack.</li>
			  <li>Theory and implementation of queue and circular queue.</li>
			  <br></br>
			  
			 <div className="container">
			 <form className="form" >
        		<div>
				<b>Upload Assignment 4 :  </b>  < Input onChange={onChange} />
        		  <button type="submit">Submit</button>
        			</div>
      			</form>
    		</div>
				<br></br>
		
		<h3>Week 5</h3> 
			  <br></br><h4>Search Algorithms</h4><br></br>
			  <li>Linear search algorithm.</li>
			  <li>Binary search algorithm.</li>
			  <br></br>
			  
			 <div className="container">
			 <form className="form" >
        		<div>
				<b>Upload Assignment 5 :  </b>  < Input onChange={onChange} />
        		  <button type="submit">Submit</button>
        			</div>
      			</form>
    		</div>
				<br></br>

			  

			</ul>
			
		  </div>
		</div>
	  );
}

const Input = (props) => (
	<input type="file" name="pdf" multiple {...props} />
  )
  const onChange = (e) => {
    console.log(e.target.files)
  }
export default CoursePage;