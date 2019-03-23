import * as React from 'react';
import styled from 'styled-components'
import { colors, Spinner } from 'ui';

interface IPrimaryProps {
  onClick?: (e: any) => void;
  loading?: boolean;
  theme?: string;
}

const Button = styled.button`
  &.uk-button-default {
    border-color: ${colors.grey};
    color: ${colors.blackish};
    &:active, &:hover, &:focus {
      border-color: ${colors.blackish};
      background-color: ${colors.blackish};
      color: ${colors.white};
    }
    transition: all 0.3s ease 0s;
  }
`

export default class Primary extends React.Component<IPrimaryProps> {
  static defaultProps = {
    theme: 'dark'
  }

  get className() {
    const classes = [];
    if (this.props.theme === "dark") classes.push('uk-button-secondary');
    else if (this.props.theme === "light") classes.push('uk-button-default');
    return classes.join(' ');
  }

  public render() {
    return (
      <Button
        className={`uk-button uk-form-width-medium ${this.className}`}
        onClick={this.props.onClick}
      >
        {!this.props.loading && this.props.children}
        {this.props.loading && <Spinner />}
      </Button>
    )
  }
}