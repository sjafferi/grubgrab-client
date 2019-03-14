import * as React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { Restaurant, IRestaurant } from 'stores';
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
  restaurant?: Restaurant;
  google?: GoogleAPI;
}

interface IMapState {
  selectedPlace: any
}

@inject("restaurant")
@inject("user")
@observer
class MapContainer extends React.Component<IMapProps, IMapState> {

  get restaurants(): IRestaurant[] { return this.props.restaurant!.restaurants; }

  get bounds() { return this.restaurants.map(({ latitude: lat, longitude: lng }) => (lat && lng && { lat, lng })) }

  public renderMarker = (restaurant: IRestaurant) => {
    return (
      <Marker
        key={restaurant.id}
        title={restaurant.description}
        name={restaurant.name}
        position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
      />
    )
  }

  render() {
    return (
      <Container>
        <Map
          zoom={17}
          className='map'
          style={{ width: '100%', height: '100%', position: 'relative' }}
          google={this.props.google!}
          styles={Styles}
          mapTypeControl={false}
          fullscreenControl={false}
          streetViewControl={false}
          initialCenter={{
            lat: 43.4765785,
            lng: -80.5612137
          }}
          bounds={this.bounds}
        >
          {this.restaurants.map(this.renderMarker)}

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