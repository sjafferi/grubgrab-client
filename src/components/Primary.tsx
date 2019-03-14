import * as React from 'react';
import styled from 'styled-components'
import { Spinner } from 'ui';

interface IPrimaryProps {
  onClick: (e: any) => void;
  loading?: boolean;
}

export default class Primary extends React.Component<IPrimaryProps> {

  public render() {
    return (
      <button
        className="uk-button uk-form-width-medium uk-button-secondary"
        onClick={this.props.onClick}>
        {!this.props.loading && this.props.children}
        {this.props.loading && <Spinner />}
      </button>
    )
  }
}