import React from "react";

import CourseItem from "./CourseItem";
import Card from "../../shared/components/UIElements/Card";
import "./CoursesList.css";

import Button from "../../shared/components/FormElements/Button";

const CourseList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className="place-list center">
				<Card>
					<h2>No Courses found. Maybe create one?</h2>
					<Button to="/courses/new">Add Course</Button>
				</Card>
			</div>
		);
	}

	return (
		<ul className="place-list">
			{props.items.map((course) => (
				<CourseItem
					key={course.id}
					id={course.id}
					image={course.imageUrl}
					title={course.title}
					description={course.description}
					creatorId={course.creator}
					price={course.price}
				/>
			))}
		</ul>
	);
};

export default CourseList;
