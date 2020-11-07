import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
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

	const courseSubmitHandler = (event) => {
		event.preventDefault();
		// create course
		sendRequest('http://localhost:3000/course', 'POST', JSON.stringify({
			title: formState.inputs.title.value,
			description: formState.inputs.description.value,
		})) 
	};

	return (
		<form className="place-form" onSubmit={courseSubmitHandler}>
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
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText="Please enter a valid description (at least 5 characters)."
				onInput={inputHandler}
			/>
			<Input
				id="address"
				element="input"
				label="Price"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid price."
				onInput={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				ADD COURSE
			</Button>
		</form>
	);
};

export default NewCourse;
