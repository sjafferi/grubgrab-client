import * as stores from "./";
import { syncHistoryWithStore } from "mobx-react-router";
import createBrowerhistory from "history/createBrowserHistory";
import { History } from "history";

export class RootStore {
  public history: History;
  public router: stores.RouterStore;
  public viewport: stores.Viewport;
  public user: stores.User;
  public restaurant: stores.Restaurant;

  public constructor() {
    const browerHistory = createBrowerhistory();

    this.router = new stores.RouterStore();
    this.history = syncHistoryWithStore(browerHistory, this.router);

    this.viewport = new stores.Viewport(this).listenForTouch().updateOnResize();
    this.user = new stores.User(this);
    this.restaurant = new stores.Restaurant(this);

    return {
      router: this.router,
      history: this.history,
      viewport: this.viewport,
      user: this.user,
      restaurant: this.restaurant
    };
  }
}
