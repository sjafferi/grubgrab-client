import { observable } from 'mobx';
import { IRestaurant } from 'stores';

export default class HomeState {
  @observable public selectedRestaurant?: IRestaurant;

  constructor() {

  }
}