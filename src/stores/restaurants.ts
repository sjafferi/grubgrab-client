import { action, computed, observable } from 'mobx';
import { assign } from 'lodash';
import { RootStore, IUser } from './index';
import { fetchRestaurant, fetchRestaurants } from 'api'

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

export interface IFoodItem {
  id?: string,
  name: string,
  description: string,
  priceCents: number,
  calories: number,
  type: string,
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
  menu?: IFoodItem[],
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

  @action
  fetchOne = async (id: string) => {
    let result, error;
    const index = this.restaurants.findIndex(({ id: restaurantId }) => id === restaurantId);

    if (this.restaurants[index].menu) return { result: this.restaurants[index] };

    try {
      const response = await fetchRestaurant(id);
      if (!response.error) result = response
      else error = response.error;
    } catch (e) {
      error = e;
    }

    if (result) {
      assign(this.restaurants[index], result);
    }

    return { result, error };
  }

}

