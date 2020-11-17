import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
	const USERS = [
		{
			id: "u2",
			name: "Karan K",
			image:
				"data:image/jpeg;base64,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",
			courses: 5,
		},
		{
			id: "u3",
			name: "Random User",
			image:
				"data:image/jpeg;base64,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",
			courses: 2,
		},
		{
			id: "u4",
			name: "Another User",
			image:
				"https://media-exp1.licdn.com/dms/image/C5603AQE7syC8Fxkw8Q/profile-displayphoto-shrink_200_200/0?e=1601510400&v=beta&t=1MhArVcuCGoIP0JUkTVXpr4yb-ajmxgLg3qZ2ldZioo",
			courses: 4,
		},
	];

	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedUsers, setLoadedUsers] = useState();
  
	useEffect(() => {
	  const fetchUsers = async () => {
		try {
		  const responseData = await sendRequest(
			process.env.REACT_APP_BACKEND_URL+'users'
		  );
			console.log(responseData.data)
			let res= []
			for(let data of responseData.data){

				console.log(data)
				res.push(data)
				
			}
			console.log(res)
		  setLoadedUsers(res);
		} catch (err) {}
	  };
	  fetchUsers();
	}, [sendRequest]);
  
	return (
	  <React.Fragment>
		<ErrorModal error={error} onClear={clearError} />
		{isLoading && (
		  <div className="center">
			<LoadingSpinner />
		  </div>
		)}
		{!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
	  </React.Fragment>
	);
};

export default Users;
