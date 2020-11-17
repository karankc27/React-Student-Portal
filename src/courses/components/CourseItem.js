import React, { useState, useContext } from "react";
import axios from 'axios';

import { useHttpClient } from '../../shared/hooks/http-hook'


import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import "./CourseItem.css";

import {
	Link
} from "react-router-dom";

const CourseItem = (props) => {

	console.log(props)
	console.log(props.id)
	console.log('props')
	const auth = useContext(AuthContext);
	const [showMap, setShowMap] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const openMapHandler = () => setShowMap(true);

	const closeMapHandler = () => setShowMap(false);

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = async() => {
		setShowConfirmModal(false);
		console.log(props.cid)
		console.log("DELETING...");
		try{
			const res =await axios.get( `http://localhost:3000/admin/courses/delete/${props.cid}` ) 
			console.log(res)
		}
		catch(err){
			console.log(err)
		}
	};
	return (
		<React.Fragment>
			<Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={props.title}
				contentClass="place-item__modal-content"
				footerClass="place-item__modal-actions"
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
			>
				<div className="map-container">
					<h2>
						<center>
							{props.description} <br />
							 <br></br>
							<br></br>
							<Button> Register</Button>
						</center>
					</h2>
				</div>
			</Modal>
			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header="Are you sure?"
				footerClass="place-item__modal-actions"
				footer={
					<React.Fragment>
						<Button inverse onClick={cancelDeleteHandler}>
							CANCEL
						</Button>
						<Button danger onClick={confirmDeleteHandler}>
							DELETE
						</Button>
					</React.Fragment>
				}
			>
				<p>
					Do you want to proceed and delete this place? Please note that it
					can't be undone thereafter.
				</p>
			</Modal>
			
			<li className="place-item">
				<Card className="place-item__content">
					<div className="place-item__image">
						<img src={props.image} alt={props.title} />
					</div>
					<div className="place-item__info">
						
					<Link className='link' to={{
					pathname: `/coursePage/${props.id}`,
					 params: {
						title: props.title,
						description : props.description,
						id: props.id,
						cid: props.cid,
						weeks: props.week
					 }
						}}>
						<h2 >{props.title}</h2>
						</Link>
						
						<h3>{props.address}</h3>
						<p>{props.description}</p>
					</div>
					<div className="place-item__actions">
						<Button inverse onClick={openMapHandler}>
							REGISTER
						</Button>
						{auth.isLoggedIn && window.email=='karankaramchandani5@gmail.com' && (
							<Button to={`/courses/${props.id}`}>EDIT</Button>
						)}

						{auth.isLoggedIn && window.email=='karankaramchandani5@gmail.com' &&(
							<Button danger onClick={showDeleteWarningHandler}>
								DELETE
							</Button>
						)}	
					</div>
				</Card>
				
			</li>
		</React.Fragment>
	);
};

export default CourseItem;
