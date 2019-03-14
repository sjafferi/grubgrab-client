import { action, computed, observable } from 'mobx';
import { RootStore } from './index';
import { login, signup, fetchUser } from 'api'

export type IRole = "admin" | "customer" | "restaurant";

export interface IUser {
  id?: string;
  email: string;
  phone: string;
  role: IRole;
  password: string;
  city: string;
}

export class User {
  protected rootStore: RootStore;

  @observable public user?: IUser;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    const user = localStorage.getItem('user');
    if (user) {
      const cached = JSON.parse(user); // this needs fixing
      if (cached.id) {
        this.user = cached;
        // this.validateUser();
      }
    }
  }

  setUser = (user?: IUser) => {
    this.user = user;
    localStorage.setItem("user", user ? JSON.stringify(this.user) : "");
  }

  @action
  validateUser = async () => {
    let result, error;

    try {
      const response = await fetchUser(this.user!.id!);
      if (response.error) error = response.error;
      else result = response;
    } catch (e) {
      error = e;
    }

    if (result) this.setUser(result);
    else this.setUser(undefined);

    return { result, error };
  }

  @action
  public async login(payload: { email: string, password: string, role: string }) {
    let result, error;

    try {
      const response = await login(payload);
      if (response.error) error = response.error;
      else result = response;
    } catch (e) {
      error = e;
    }

    if (result) this.setUser(result);

    return { result, error };
  }

  @action
  public async signup(payload: { email: string, password: string, role: IRole }) {
    let result, error;

    try {
      const response = await signup(payload);
      if (response.error) error = response.error;
      else result = response;
    } catch (e) {
      error = e;
    }

    if (result) this.setUser(result);

    return { result, error };
  }

  @computed
  get isLoggedIn(): boolean {
    return !!(this.user);
  }

}

