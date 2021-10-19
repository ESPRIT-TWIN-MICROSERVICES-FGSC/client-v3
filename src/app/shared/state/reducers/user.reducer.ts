import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {User} from "@app/modules/auth/shared/_models/User";


export interface UserState extends EntityState<User> {
  currentlyOnline: boolean;
  selectedUserId: string | null;
}
export function selectUserId(a: User): string {
  return a.id;
}

export function sortByUserName(a: User, b: User): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId,
  sortComparer: sortByUserName,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: null,
});

const userReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}



