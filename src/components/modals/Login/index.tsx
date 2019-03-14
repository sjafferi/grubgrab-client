import * as React from 'react';
import styled from 'styled-components';
import FormState from './state';
import Form from './LoginForm';

import { inject, observer } from "mobx-react";
import { User, RouterStore } from 'stores';

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1010;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 15px 15px;
  background: rgba(0,0,0,0.6);
  opacity: 1;
  transition: opacity .15s linear;
  .uk-modal-dialog {
      opacity: 1;
      transform: translateY(50%);
      width: fit-content;
      padding: 5%;
  }

  button.uk-modal-close-default {
    background-color: white;
  }
`

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
      <Container id="login-modal" className="uk-flex-top">
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button className="uk-modal-close-default" onClick={this.close}>
            <span data-uk-icon="close" className="uk-text-medium" />
          </button>
          <Form state={this.formState} />
        </div>
      </Container>
    )
  }
}