import { action, computed, observable } from 'mobx';
import { RootStore, IUser } from './index';
import { fetchRestaurants } from 'api'

export interface IRestaurantImages {
  id?: string;
  url: string;
  description: string;
}

export interface IRestaurantHours {
  id?: string;
  day: string;
  openTime: string;
  closeTime: string;
}

export interface IRestaurant {
  id?: string,
  owner?: IUser,
  name: string,
  city: string,
  address: string,
  postalCode: string,
  longitude: number,
  latitude: number,
  description: string,
  categories?: string[],
  hours?: IRestaurantHours[],
  images?: IRestaurantImages[],
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

    return { result, error };
  }

}

