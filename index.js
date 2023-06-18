import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
//Create the rootReducer
const initialState = {
	counter: 0,
	post: {},
};
const initialComments = {
	comments: {},
};
//create the actions for the async actions
const commentsPending = "COMMENTS/getCommentData/pending";
const commentsFulfilled = "COMMENTS/getCommentData/fulfilled";
const commentsRejected = "COMMENTS/getCommentData/rejected";
const postPending = "POSTS/getPostData/pending";
const postFulfilled = "POSTS/getPostData/fulfilled";
const postRejected = "POSTS/getPostData/rejected";
//rootReducer is done
const postsReducer = (state = initialState, action) => {
	console.log("🚀 ~ file: index.js:22 ~ postsReducer ~ action.type:", action.type)
	switch (action.type) {
		case "INCREMENT":
			return { ...state, counter: state.counter + 1 };
		case "DECREMENT":
			return { ...state, counter: state.counter - 1 };
		case "INCREMENT_BY_X":
			// state.counter += action.payload;
			// return state;
			//best practice
			return { ...state, counter: state.counter + action.payload };
		case "DECREMENT_BY_X":
			// state.counter -= action.payload;
			// return state;
			//best practice
			return { ...state, counter: state.counter - action.payload };
		case postFulfilled:
			return { ...state, post: action.payload };
		case postRejected:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};
//commentsReducer
const commentsReducer = (state = initialComments, action) => {
	switch (action.type) {
		case "GET_COMMENTS_ID":
			return state;
		default:
			console.log(action);
			return { ...state, comments: action.payload };
	}
};

//Create the redux store
const store = createStore(
	combineReducers({ post: postsReducer, comments: commentsReducer }),
	applyMiddleware(logger.default, thunk.default)
);

//Action creators function
let X = 10;
const history = [];
const incrementByX = () => {
	return {
		type: "INCREMENT_BY_X",
		payload: X,
	};
};
const decrementByX = () => {
	return {
		type: "DECREMENT_BY_X",
		payload: X,
	};
};
// const getPostData1 = async (id = 2) => {
// 	try {
// 		const response = await fetch(
// 			`https://jsonplaceholder.typicode.com/posts/${id}`
// 		);
// 		const data = await response.json();
// 	} catch (error) {}
// };
//get the global store
// store.subscribe(() => {
	// history.push(store.getState());
	// console.log(history);
// });

// store.dispatch(getPostData(12));
// setInterval(() => {
// store.dispatch(decrementByX());
// }, 8000);

// store.dispatch({ type: "INCREMENT" });
// const data = store.getState();
// console.log("🚀 ~ file: index.js:26 ~ data:", data.counter);
// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "INCREMENT" });
// console.log("🚀 ~ file: index.js:26 ~ data:", store.getState());

// store.dispatch(incrementByX());
// console.log("🚀 ~ file: index.js:42 ~ data:", store.getState());
// store.dispatch(decrementByX());
// console.log(
// 	"🚀 ~ file: index.js:47 ~ store.getState():",
// 	store.getState().state
// );
const getPostData = (id) => {
	return async (dispatch, getState) => {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.co/posts/${id}`
			);
			const data = await response.json();
			dispatch({ type: postFulfilled, post: data });
		} catch (error) {
			dispatch({ type: postRejected, error });
		}
	};
};
store.dispatch(getPostData(67));
console.log(store.getState())

const getComments = (id) => {
	return async (dispatch, getState) => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/comments/${id}`
		);
		const data = await response.json();
		dispatch({ type: "GET_COMMENTS_ID", comments: data.email });
	};
};

store.dispatch(getComments(23));
