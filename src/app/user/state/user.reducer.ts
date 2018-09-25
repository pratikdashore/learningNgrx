import { User } from "../user";

export interface userState {
  users: User[];
  selectedUser: User;
  isUsernameMasked: boolean;
}

export function userReducer(state: userState, action) {
  switch (action.type) {
    case "TOGGLE_USER_MASK":
      return {
        ...state,
        isUsernameMasked: action.payload
      };
    default:
      return state;
  }
}
