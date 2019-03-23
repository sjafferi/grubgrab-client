import * as React from 'react';
import styled from 'styled-components';
import { inject, observer } from "mobx-react";
import { RouterStore } from 'stores';

import { breakpoint } from 'ui';

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

  ${breakpoint.down('m')`{
    .uk-modal-dialog {
      min-height: 43%;
      padding: 30px;
      transform: translateY(45%);
    }
  }`}
`
interface IModalProps {
  router?: RouterStore;
  onClose?: () => void;
  className?: string;
}

@inject("router")
@observer
export default class Modal extends React.Component<IModalProps> {
  static defaultProps: { onClose: () => void; className: string };

  constructor(props: any) {
    super(props);
    Modal.defaultProps = {
      onClose: () => this.props.router!.goBack(),
      className: ""
    }
  }

  public render() {
    return (
      <Container className={`uk-flex-top ${this.props.className}`} onClick={this.props.onClose}>
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" onClick={e => { e.stopPropagation() }}>
          <button className="uk-modal-close-default" onClick={this.props.onClose}>
            <span data-uk-icon="close" className="uk-text-medium" />
          </button>
          {this.props.children}
        </div>
      </Container>
    )
  }
}