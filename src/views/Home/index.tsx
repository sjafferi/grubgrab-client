import * as React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import State from './state';
import Cards from './Cards'
import Map from './Map';
import Menu from './Menu';
import { User, RouterStore, Viewport } from 'stores';
import { breakpoint } from 'ui'

const Container = styled.div`
  display: block;
  height: 100%;
  max-height: calc(100% - 45px);
  overflow: hidden;

  ${breakpoint.down('m')`{
    .map {
      display: none;
    }
  }`}
`;

interface IHomeProps {
  user?: User;
  router?: RouterStore;
  viewport?: Viewport;
}

@inject("viewport")
@observer
export class Home extends React.Component<IHomeProps> {
  public homeState = new State();

  get viewport() {
    return this.props.viewport!;
  }

  get selected() {
    return this.homeState.selectedRestaurant;
  }

  public render() {
    return (
      <Container>
        {(this.viewport.isTabletAndAbove || !this.selected) && <Cards state={this.homeState} />}
        {!this.selected && <Map />}
        {this.selected && <Menu state={this.homeState} />}
      </Container>
    );
  }
}