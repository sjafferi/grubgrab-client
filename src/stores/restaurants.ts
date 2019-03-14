import { action, computed, observable } from 'mobx';
import { RootStore, IUser } from './index';
import { fetchRestaurants } from 'api'

export interface IRestaurant {
  id?: string,
  owner?: IUser,
  name: string,
  city: string,
  address: string,
  description: string,
}

export class Restaurant {
  protected rootStore: RootStore;

  @observable public restaurants: IRestaurant[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  fetch = async () => {
    let result, error;

    try {
      const response = await fetchRestaurants();
      if (!response.error) result = response
      else error = response.error;
    } catch (e) {
      error = e;
    }

    if (result) {
      this.restaurants = result;
    }

    console.log({ result, error })

    return { result, error };
  }

}

