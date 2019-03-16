import { action, observable } from 'mobx';
import { IRestaurant } from 'stores';
import { assign } from 'lodash';

export default class HomeState {
  @observable public selectedRestaurant?: IRestaurant;
  @observable public selectedMenuItems: { [type: string]: { [id: string]: boolean } } = {};
  @observable public freeItem?: string;

  constructor() {

  }

  @action
  assign(fields: { [id: string]: any }) {
    assign(this, fields);
  }
}