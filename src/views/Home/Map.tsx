import * as React from "react";
import styled from "styled-components";
import { Map as MapUntyped, GoogleAPI, Marker as MarkerUntyped, GoogleApiWrapper } from 'google-maps-react';

const Container = styled.div`
  position: fixed;
  left: 52vh;
  right: 0;
  top: 45px;
  bottom: 0;

  > div > div > div {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: rgb(229, 227, 223);
  }

  .map span, a {
    font-size: 8px !important;
  }
`;

const Map: any = MapUntyped;
const Marker: any = MarkerUntyped;

interface IMapProps {
  google?: GoogleAPI
}

interface IMapState {
  selectedPlace: any
}

class MapContainer extends React.Component<IMapProps, IMapState> {
  render() {
    return (
      <Container>
        <Map
          zoom={15}
          className='map'
          style={{ width: '100%', height: '100%', position: 'relative' }}
          google={this.props.google!}
          styles={Styles}
          mapTypeControl={false}
          fullscreenControl={false}
          streetViewControl={false}
        >
          <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{ lat: 37.778519, lng: -122.405640 }} />
        </Map>

      </Container>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.MAPS_API_KEY || ""
})(MapContainer as any)

const Styles = [
  {
    "featureType": "administrative",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]