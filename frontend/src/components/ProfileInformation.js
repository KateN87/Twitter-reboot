import { React, useState, useEffect } from 'react';
import {
	IoMdPin,
	IoMdMail,
	IoMdPerson,
	IoMdCalendar,
	IoIosPaperPlane,
	IoMdBriefcase,
} from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ProfileInformation() {
	const dispatch = useDispatch();
	const [profile, setProfile] = useState({});

	const [following, setFollowers] = useState([]);
	const [followList, setFollowlist] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const [isLoading, setIsLoading] = useState(null);
	const [showFollowers, setShowFollowers] = useState(false);

	const user = useSelector((state) => state.userReducer);
	const idparam = useParams().id;

	const [ownProfile, setOwnProfile] = useState(false);

	useEffect(() => {
		const fetchProfile = async () => {
			const response = await fetch(
				'http://localhost:3001/users/' + idparam
			);
			const data = await response.json();

			setProfile(data);
			setFollowers(data.following);
			/* const checkUser = JSON.parse(localStorage.getItem('user')); */
			/* const loggedinId = checkUser.id; */
			if (user.id === data.id) {
				setOwnProfile(true);
			}

			if (data.username) {
				const findFollowing = user.following.includes(data.username);
				if (findFollowing) {
					setIsFollowing(true);
				} else {
					setIsFollowing(false);
				}
			}
		};
		fetchProfile();
	}, [idparam, user]);

	const followUser = async () => {
		const checkUser = JSON.parse(localStorage.getItem('user'));
		const username = profile.username;
		setIsLoading(true);
		const options = {
			method: 'PATCH',
			body: JSON.stringify({ username }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${checkUser.token}`,
			},
		};
		const response = await fetch(
			'http://localhost:3001/locked/follow/',
			options
		);
		const data = await response.json();

		if (response.status === 201) {
			dispatch({ type: 'ADD_FOLLOWING', payload: data });
			setIsLoading(false);
		}
		if (response.status === 200) {
			dispatch({ type: 'DELETE_FOLLOWING', payload: data });
			setIsLoading(false);
		}
	};

	const checkFollowing = (profile) => {
		let followList = profile.following;
		const following = followList?.length;
		return following;
	};

	if (profile.username === undefined) {
		return <div>Loading...</div>;
	}

	return (
		<div className='profile'>
			<img
				src={`http://localhost:3001/images/${profile.avatar}`}
				alt='Profile avatar'
				className='avatar'
			/>

			<h2 className='nickname'>{profile.nickname}</h2>

			<div className='icon-container'>
				<IoMdPerson className='icon' />
				<p className='username'>{profile.username}</p>
			</div>
			<div>
				<p onClick={() => setShowFollowers(!showFollowers)}>
					Followers {profile.followers.length}
				</p>
				<ul>
					{showFollowers &&
						profile.followers.map((follow) => (
							<li key={follow}>{follow}</li>
						))}
				</ul>
				<p onClick={() => setFollowlist(!followList)}>
					Following {checkFollowing(profile)}
				</p>
				<ul>
					{followList &&
						following.map((follow) => (
							<li key={follow}>{follow}</li>
						))}
				</ul>
			</div>

			<div className='about-container'>
				<p className='about'>{profile.about}</p>
			</div>

			<div className='icon-container'>
				<IoMdMail className='icon' />
				<p className='email'>{profile.email}</p>
			</div>

			<div className='icon-container'>
				<IoMdBriefcase className='icon' />
				<p className='occupation'>{profile.occupation}</p>
			</div>

			<div className='icon-container'>
				<IoMdPin className='icon' />
				<p className='hometown'>{profile.hometown}</p>
			</div>

			<div className='icon-container'>
				<IoIosPaperPlane className='icon' />
				<a href={`https://${profile.website}`} className='website'>
					{profile.website}
				</a>
			</div>

			<div className='icon-container'>
				<IoMdCalendar className='icon' />
				<p className='joined'>{profile.joined}</p>
			</div>
			{!ownProfile && (
				<button onClick={() => followUser()} disabled={isLoading}>
					{isFollowing ? 'Unfollow' : 'Follow'}
				</button>
			)}
		</div>
	);
}
