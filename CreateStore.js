 export const createStore = (reducer) => {
		// Initialize the state
		let state;

		// Listeners array to hold all listeners (components that need to re-render when state changes)
		let listeners = [];

		// getState function to return the current state
		const getState = () => state;

		// dispatch function that takes an action, updates the state,
		// and notifies all listeners so they can re-render
		const dispatch = (action) => {
			state = reducer(state, action);

			// Notify all listeners that state has changed
			listeners.forEach((listener) => {
				listener();
			});
		};

		// subscribe function to add a listener (component)
		const subscribe = (listener) => {
			listeners.push(listener);

			// Return unsubscribe function
			return () => {
				listeners = listeners.filter((li) => li !== listener);
			};
		};

		// Dispatch a dummy action to trigger initial listeners
		dispatch({});

		// Return the store API
		return { getState, dispatch, subscribe };
 }
	 
