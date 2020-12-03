import React , {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import CourseList from "../components/CoursesList";
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const Courses = () => {

	const { isLoading, error, sendRequest, clearError } = useHttpClient()
	const [loadedCourses, setLoadedCourses] = useState()

	const userId = useParams().userId;
	useEffect(()=> {
		const fetchCourses = async()=> {
			try{
				const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL)
				setLoadedCourses(responseData.data)
				console.log(responseData)
			}
			catch(err){}
		}
		fetchCourses()
	}, [sendRequest])
	// loadedCourses = DUMMY_COURSES.filter(
	// 	(course) => course.creator === userId
	// );
	return <React.Fragment>
		<ErrorModal error={error} onClear={clearError} />
		{isLoading && (
			<div className='center'><LoadingSpinner/></div>
		)}
		{ !isLoading && loadedCourses && <CourseList items={loadedCourses}/>}
		</React.Fragment>
};

export default Courses;
