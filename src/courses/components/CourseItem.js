import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import "./CourseItem.css";

import CoursePage from './CoursePage'
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

const CourseItem = (props) => {
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

	const confirmDeleteHandler = () => {
		setShowConfirmModal(false);
		console.log("DELETING...");
	};
	const routes = (
		<Switch>
			<Route path="/courses/:courseId/home">
				<CoursePage />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
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
							Price: {props.price} <br></br>
							<br></br>
							<Button> Buy Now</Button>
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
						<h2>{props.title}</h2>
						<h3>{props.address}</h3>
						<p>{props.description}</p>
					</div>
					<div className="place-item__actions">
						<Button inverse onClick={openMapHandler}>
							REGISTER
						</Button>
						{auth.isLoggedIn && (
							<Button to={`/courses/${props.id}`}>EDIT</Button>
						)}

						{auth.isLoggedIn && (
							<Button danger onClick={showDeleteWarningHandler}>
								DELETE
							</Button>
						)}

						
						
					</div>
				</Card>
				{auth.isLoggedIn && (
							
							<Button >
								
							<CoursePage 
							key={props.id}
							id={props.id}>
								GoTo Course
							</CoursePage>
							</Button>
						)}
			</li>
			<Router>
				<main>
					
						{routes}
				</main>
			</Router>
		</React.Fragment>
	);
};

export default CourseItem;
