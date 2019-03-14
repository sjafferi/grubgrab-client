import { action, computed, observable } from 'mobx';
import { assign } from 'lodash'
import { User, RouterStore } from 'stores';
import * as joi from 'joi';

export const UserLoginSchema = joi.object().keys({
  email: joi
    .string()
    .email()
    .required().label("Email"),
  role: joi
    .string()
    .valid(["admin", "customer", "restaurant"])
    .required(),
  password: joi.string().required().label("Password")
});


export default class LoginState {
  @observable email: string = "";
  @observable password: string = "";
  @observable errors: { [key: string]: string } = {};
  @observable isDirty: { [key: string]: string } = {};
  @observable loading: boolean = false;

  public user?: User;
  public router?: RouterStore;

  @action
  assign = (fields: { [key: string]: string }) => {
    assign(this, fields);
    assign(this.isDirty, fields);
  }

  @action
  submit = async () => {
    if (!this.validate()) return false;

    this.loading = true;
    const { result, error } = await this.user!.login(this.payload);
    this.loading = false;

    if (error) {
      this.errors.authentication = error.message;
      return false;
    }

    this.router!.goBack();

    return result;
  }

  validate = () => {
    this.isDirty = {};
    const { error } = joi.validate(this.payload, UserLoginSchema);
    if (error) {
      const key = error.details[0].context!.key as string;
      this.errors[key] = error.details[0].message.replace(/\"/g, '');
      return false;
    }

    return true;
  }

  errorFor = (key: string) => {
    return this.errors[key] && !this.isDirty[key];
  }

  get payload() {
    return {
      email: this.email.toString(),
      password: this.password.toString(),
      role: "customer"
    }
  }
}