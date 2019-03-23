import { action, observable } from 'mobx';
import { IRestaurant } from 'stores';
import { assign } from 'lodash';
import moment from 'moment';

export default class HomeState {
  @observable public selectedRestaurant?: IRestaurant;
  @observable public selectedMenuItems: { [type: string]: string } = {};
  @observable public freeItem?: string;
  @observable public pickupTime?: moment.Moment;

  constructor() {

  }

  @action
  assign(fields: { [id: string]: any }) {
    assign(this, fields);
  }
}