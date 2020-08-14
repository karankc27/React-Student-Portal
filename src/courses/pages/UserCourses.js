import React from "react";
import { useParams } from "react-router-dom";

import CourseList from "../components/CoursesList";

const DUMMY_COURSES = [
	{
		id: "p1",
		title: "Data Structures and Algorithms in Java",
		description: "One of the best course to learn!",
		imageUrl:
			"https://res.cloudinary.com/practicaldev/image/fetch/s--rx3ZbK7S--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://thepracticaldev.s3.amazonaws.com/i/zh2w7nufrewbbh2n9zjv.png",
		creator: "u1",

		price: "Rs 600",
	},
	{
		id: "p2",
		title: "MERN Stack Developer",
		description:
			"Best course to learn Web Development using MongoDB Express ReactJS and NodeJS!",
		imageUrl: "https://img-a.udemycdn.com/course/750x422/1646980_23f7_2.jpg",
		creator: "u1",

		price: "Rs 600",
	},
];

const UserCourses = () => {
	const userId = useParams().userId;
	const loadedPlaces = DUMMY_COURSES.filter(
		(course) => course.creator === userId
	);
	return <CourseList items={loadedPlaces} />;
};

export default UserCourses;
