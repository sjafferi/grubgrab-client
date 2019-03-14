import * as React from "react";
import styled from "styled-components";
import Cards from './Cards'
import Map from './Map';
import { Spacer } from 'ui'

const Container = styled.div`
  display: block;
  height: 100%;
  max-height: calc(100% - 45px);
  overflow: hidden;
`;


export class Home extends React.Component {

  public render() {
    return (
      <Container>
        <Cards />
        <Map />
      </Container>
    );
  }
}