import { combineReducers, createStore } from "redux";
import { applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
//Actions

const FETCH_AIRLINE_REQUEST = "FETCH_AIRLINE_REQUEST";
const FETCH_AIRLINE_SUCCESS = "FETCH_AIRLINE_SUCCESS";
const FETCH_AIRLINE_FAILURE = "FETCH_AIRLINE_FAILURE";
const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";
//airline InitialState
const initialStateForAirline = {
	id: "",
	name: "",
	logo: "",
	country: "",
	head_quaters: "",
	slogan: "",
	established: "",
	website: "",
};
const initialStateForProfile = {
	id: 0,
	uid: "",
	password: "",
	first_name: "",
	last_name: "",
	username: "",
	email: "",
	avatar: "",
	gender: "",
	phone_number: "",
	social_insurance_number: "",
	date_of_birth: "",
	employment: {
		title: "",
		key_skill: "",
	},
};

const airlineReducer = (state = initialStateForAirline, action) => {
	switch (action.type) {
		case FETCH_AIRLINE_REQUEST:
			return {
				...state,
				loading: true,
				error: "false",
			};
		case FETCH_AIRLINE_SUCCESS:
			return {
				...state,
				id: action.payload.id,
				name: action.payload.name,
				logo: action.payload.logo,
				country: action.payload.country,
				website: action.payload.website,
				established: action.payload.established,
				head_quaters: action.payload.head_quaters,
				slogan: action.payload.slogan,
				loading: false,
				error: "false",
			};
		case FETCH_AIRLINE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		default:
			return state;
	}
};
const userProfileReducer = (state = initialStateForProfile, action) => {
	switch (action.type) {
		case FETCH_PROFILE_REQUEST:
			return {
				...state,
				loading: true,
				error: "false",
			};
		case FETCH_PROFILE_SUCCESS:
			return {
				...state,
				id: action.payload.id,
				uid: action.payload.uid,
				password: action.payload.password,
				first_name: action.payload.first_name,
				last_name: action.payload.last_name,
				username: action.payload.username,
				email: action.payload.email,
				avatar: action.payload.avatar,
				gender: action.payload.gender,
				phone_number: action.payload.phone_number,
				employment: {
					title: action.payload?.employment?.title,
					key_skill: action.payload?.employment?.skill,
				},
			};
		case FETCH_PROFILE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		default:
			return state;
	}
};
//root Reducers
const rootReducer = combineReducers({
	airline: airlineReducer,
	user: userProfileReducer,
});
//create redux store
const store = createStore(rootReducer, applyMiddleware(logger.default, thunk.default));
store.subscribe(() => {
	console.log(store.getState());
});
//action creators
//1.Airline Action Creators Function
const fetchAirlineData = (id) => {
	return async (dispatch, getState) => {
		dispatch({ type: FETCH_AIRLINE_REQUEST });
		try {
			const res = await fetch(`http://localhost:3000/airline`);
			const data = await res.json();
			dispatch({ type: FETCH_AIRLINE_SUCCESS, payload: data });
		} catch (error) {
		
			dispatch({ type: FETCH_AIRLINE_FAILURE, payload: error });
		}
	};
};
//2.Profile Action Creators Function
const fetchProfileData =() => {
	return async (dispatch, getState) => {
		dispatch({ type: FETCH_PROFILE_REQUEST });
		try {
			const res = await fetch(`https://random-data-api.com/api/v2/users`);
			const data = await res.json();
			dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data });
		} catch (err) {
			dispatch({ type: FETCH_PROFILE_FAILURE, payload: err });
		}
	};
};
//dispatching actions
store.dispatch(fetchAirlineData(10));
store.dispatch(fetchProfileData());
