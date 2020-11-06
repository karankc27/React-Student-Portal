import React, { useState, useCallback, Suspense } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import LoadingSpinner from './shared/components/UIElements/LoadingSpinner'
//import Users from "./user/pages/Users";
import Courses from './courses/pages/Courses'
//import NewCourse from "./courses/pages/NewCourse";
//import UserCourses from "./courses/pages/UserCourses";
//import UpdateCourse from "./courses/pages/UpdateCourse";

import Auth from './user/pages/Auth'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import { AuthContext } from './shared/context/auth-context'
import Footer from '../src/shared/components/Navigation/Footer'

const Users = React.lazy(() => import('./user/pages/Users'))
const NewCourse = React.lazy(() => import('./courses/pages/NewCourse'))
const UserCourses = React.lazy(() => import('./courses/pages/UserCourses'))
const UpdateCourse = React.lazy(() => import('./courses/pages/UpdateCourse'))
const CoursePage = React.lazy(() => import('./courses/components/CoursePage'))

const About = React.lazy(() => import('./app/pages/About'))

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const login = useCallback(() => {
		setIsLoggedIn(true)
	}, [])

	const logout = useCallback(() => {
		setIsLoggedIn(false)
	}, [])

	let routes

	if (isLoggedIn) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Courses />
				</Route>
				<Route path="/users" exact>
					<Users />
				</Route>
				<Route path="/:userId/courses" exact>
					<UserCourses />
				</Route>
				<Route path="/courses/new" exact>
					<NewCourse />
				</Route>
				<Route path="/courses/:courseId">
					<UpdateCourse />
				</Route>
				<Route path="/coursePage/:courseId">
					<CoursePage />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Redirect to="/" />
			</Switch>
		)
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Courses />
				</Route>
				<Route path="/users" exact>
					<Users />
				</Route>

				<Route path="/:userId/courses" exact>
					<UserCourses />
				</Route>
				<Route path="/auth">
					<Auth />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		)
	}

	return (
		<AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
			<Router>
				<MainNavigation />
				<main>
					<Suspense
						fallback={
							<div className="center">
								<LoadingSpinner />
							</div>
						}
					>
						{routes}
					</Suspense>
				</main>
			<Footer />
			</Router>
			
		</AuthContext.Provider>
	)
}

export default App
