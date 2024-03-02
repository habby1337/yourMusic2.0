import { create } from "zustand";
import { devtools, redux } from "zustand/middleware";

const Actions = {
	play: "PLAY",
	pause: "PAUSE",
};

const initialState = { isPlaying: false };

/**
 * Reducer function for the player store.
 *
 * @param state - The current state of the player store.
 * @param action - The action to be performed on the player store.
 * @returns The new state of the player store after applying the action.
 */
const reducer = (state: typeof initialState, { action }: { action: keyof typeof Actions }) => {
	switch (action) {
		case Actions.play:
			return { isPlaying: true };
		case Actions.pause:
			return { isPlaying: false };
		default:
			return state;
	}
};

/**
 * A higher-order reducer that enhances the given reducer function by dispatching an action.
 * @param state - The current state of the reducer.
 * @param action - The action to be dispatched.
 * @returns The new state after applying the action.
 */
const enhancedReducer = (state: typeof initialState, action: { type: keyof typeof Actions }) => {
	return reducer(state, { action: action.type });
};
// const usePlayerStore = create(devtools(redux(reducer, initialState), { name: "playerStore" }));
const usePlayerStore = create(devtools(redux(enhancedReducer, initialState), { name: "playerStore" }));

export default usePlayerStore;
