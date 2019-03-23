import * as React from 'react';
import FormState from './state';
import Form from './LoginForm';
import { Modal } from 'ui';
import { inject, observer } from "mobx-react";
import { User, RouterStore } from 'stores';

@inject("user")
@inject("router")
@observer
export default class LoginModal extends React.Component<{ user?: User, router?: RouterStore }> {
  private formState: FormState = new FormState();

  constructor(props: any) {
    super(props);
    this.formState.assign({ user: props.user, router: props.router });
  }

  close = () => {
    this.props.router!.goBack();
  }

  public render() {
    return (
      <Modal onClose={this.close}>
        <Form state={this.formState} />
      </Modal>
    )
  }
}