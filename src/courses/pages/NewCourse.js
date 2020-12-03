import React from "react";
import {useHistory} from 'react-router-dom'

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
	VALIDATOR_REQUIRE
} from "../../shared/util/validators";
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook'
import "./CourseForm.css";

const NewCourse = () => {
	const {isLoading, error, sendRequest, clearError} = useHttpClient()
	const [formState, inputHandler] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
			address: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const history = useHistory()

	const courseSubmitHandler = async(event) => {
		event.preventDefault();
		let week = formState.inputs.week.value
		week=week.split('\n')
		try{
			// create course
			await sendRequest(process.env.REACT_APP_BACKEND_URL + 'admin/courses/new', 'POST', JSON.stringify({
				title: formState.inputs.title.value,
				description: formState.inputs.description.value,
				cid:formState.inputs.cid.value,
				id:formState.inputs.id.value,
				imageUrl:formState.inputs.imageUrl.value,
				week:week
			}),
			{'Content-Type' : 'application/json'}
			) 
			history.push('/')
		}
		// Redirect to diff page
		catch(err){
			console.log(err)
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError}></ErrorModal>
			<form className="place-form" onSubmit={courseSubmitHandler}>
			{isLoading && <LoadingSpinner></LoadingSpinner>}
			<Input
				id="cid"
				element="input"
				type="text"
				label="Course Id"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid id."
				onInput={inputHandler}
			/>
			<Input
				id="id"
				element="input"
				type="text"
				label="Course Code"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a Course Code."
				onInput={inputHandler}
			/>
			<Input
				id="title"
				element="input"
				type="text"
				label="Title"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid title."
				onInput={inputHandler}
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid description (at least 5 characters)."
				onInput={inputHandler}
			/>
			<Input
				id="imageUrl"
				element="input"
				label="Image Url"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid image."
				onInput={inputHandler}
			/>
			<Input
				id="week"
				element="textarea"
				type="textbox"
				label="Weekly Description (Line Separated)"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid description"
				onInput={inputHandler}
			/>
			<Button type="submit">
				ADD COURSE
			</Button>
		</form>

		</React.Fragment>
			);
};

export default NewCourse;
