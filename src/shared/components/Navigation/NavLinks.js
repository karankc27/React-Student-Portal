import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
	const auth = useContext(AuthContext);

	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					ALL Courses
				</NavLink>
			</li>
			{auth.isLoggedIn && (
				<li>
					<NavLink to="/users" exact>
						ALL USERS
					</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<NavLink to={`/${auth.userId}/courses`}>MY Courses</NavLink>
				</li>
			)}
			{auth.isLoggedIn && window.email==='karankaramchandani5@gmail.com'&& (
				<li>
					<NavLink to="/courses/new">Add Courses</NavLink>
				</li>
			)}
			{!auth.isLoggedIn && (
				<li>
					<NavLink to="/auth">LOGIN</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<button onClick={auth.logout}>LOGOUT</button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
