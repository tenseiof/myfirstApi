import React, { useEffect, useState } from 'react';

export default function UserList() {
	const [users, setUsers] = useState([]);
	const [newName, setNewName] = useState('');
	const ApiBaseUrl = 'http://localhost:3001';

	// user list
	useEffect(() => {
		fetch(`${ApiBaseUrl}/users`) // Express
			.then(res => res.json())
			.then(data => setUsers(data))
			.catch(err => console.error('Users loading error:', err));
	}, []);

	// new user add
	const handleAddUser = () => {
		if (!newName.trim()) return; // empty name check

		fetch(`${ApiBaseUrl}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: newName })
		})
			.then(res => res.json())
			.then(newUser => {
				setUsers(prev => [...prev, newUser]);
				setNewName('');
			})
			.catch(err => console.error('Users adding error:', err));
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-teal-100'>
			<div className='p-8 bg-white bg-opacity-80 rounded-3xl shadow-lg w-full max-w-lg space-y-6'>
				<h2 className='text-3xl font-semibold text-gray-800 text-center tracking-wider'>
					Users List
				</h2>
				<ul className='space-y-3 text-lg text-gray-700'>
					{users.map(user => (
						<li key={user.id} className='hover:text-gray-500 transition-all'>
							{user.name}
						</li>
					))}
				</ul>
				<div className='flex space-x-3'>
					<input
						type='text'
						value={newName}
						onChange={e => setNewName(e.target.value)}
						placeholder='Enter username'
						className='w-full p-3 rounded-md text-gray-800 placeholder-gray-500 bg-white bg-opacity-90 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all'
					/>
					<button
						onClick={handleAddUser}
						className='px-6 py-3 rounded-md bg-gradient-to-r from-teal-300 to-blue-300 text-gray-800 font-semibold hover:from-teal-400 hover:to-blue-400 transform hover:scale-105 transition duration-300'
					>
						Add
					</button>
				</div>
			</div>
		</div>
	);
}
