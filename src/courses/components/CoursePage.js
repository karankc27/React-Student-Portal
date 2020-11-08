import React, { useState, useContext } from 'react';

import './CoursePage.css'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';


const CoursePage = (props) => {

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
	event.preventDefault();
	console.log(formState.inputs)
     try{ 
      sendRequest(process.env.REACT_APP_BACKEND_URL +'teacher/assignments/upload/10/7', 'POST', JSON.stringify({
          pdf : formState.inputs.pdf.value,
        }),
        {
        'Content-Type': 'application/json'
        },
      )
      auth.login();
    }
    catch(err){
      console.log(err)
    }
  };
	console.log(props)
	return (
		<div className="maths-page">
		  <div className="page-wrapper">
			<h1 className="page-title">{props.title} Title</h1>
			<p className="page-paragraph">
			  Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
			  error voluptas dolorum quod. Deserunt, error. Ipsa sed architecto,
			 dae iure eos eaque
			  quasi dolor quibusdam vel molestiae distinctio in.
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
				<h3 className="page-card-title">Lorem, ipsum.</h3>
				<p className="page-card-body">
				  Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>
			  </div>
			  <div className="page-card" style={{ backgroundColor: "#629677" }}>
				<div className="page-card-img">
				  <i className="fas fa-microscope"></i>
				</div>
				<h3 className="page-card-title">Lorem, ipsum.</h3>
				<p className="page-card-body">
				  Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>
			  </div>
			</div>
			<hr />
			<h1 className="page-title">Course Details</h1>
			<ul className="page-list">
			  <h3>Week 1</h3> 
			  <br></br><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
			  <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
			  <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
			  <br></br>
			  
			 <div className="container">
			 <form className="form" >
        		<div>
				<b>Upload Assignment 1 :  </b>  < Input onChange={onChange} />
        		  <button type="submit">Submit</button>
        			</div>
      			</form>
    		</div>
				<br></br>
				
				<h3>Week 2</h3> 
			  <br></br><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
			  <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
			  <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
				<br></br>
				
				
				<div className="container">
			 <h4>Upload Assignment 2</h4><form className="form" onSubmit={formSubmitHandler} >
        		<div>
         		 <Input onChange={onChange} />
        		  <button type="submit">Submit</button>
        			</div>
      			</form>
    		</div>
				<br></br>
				
				<h3>Week 3</h3> 
			  <br></br><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
			  <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
			  <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
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