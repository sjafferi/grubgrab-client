import * as React from "react";
import styled from "styled-components";
import { Header3 } from 'ui';
import { inject, observer } from "mobx-react";
import { User, RouterStore, Restaurant } from 'stores';

interface ICardProps {
  user?: User;
  router?: RouterStore;
  restaurant?: Restaurant;
}

@inject("restaurant")
@inject("user")
@observer
export default class Cards extends React.Component<ICardProps> {
  componentWillMount() {
    this.props.restaurant!.fetch();
  }

  public render() {
    return (
      <Container>
        <RestaurantCard name="Shawarma Plus" />
        <RestaurantCard name="Shawarma Plus" />
        <RestaurantCard name="Shawarma Plus" />
        <RestaurantCard name="Shawarma Plus" />
      </Container>
    );
  }
}

interface IRestaurtCardProps {
  name?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  distance?: string;
}

const RestaurantCard: React.SFC<IRestaurtCardProps> = ({
  name,
  description,
  startTime,
  endTime,
  distance
}) => {
  return (
    <li className="uk-card uk-card-default uk-card-hover">
      <a className="card">
        <div className="card-image">
          <img src="https://www.bbcgoodfood.com/sites/default/files/guide/guide-image/2018/06/chicken-wings-main.jpg" />
        </div>
        <div className="card-content">
          <div className="card-top">
            <Header3 className="uk-card-title uk-margin-remove-bottom card-title">{name}</Header3>
            <span data-uk-icon="chevron-right" className="uk-text-large card-icon" />
          </div>

          <p className="uk-text-meta uk-margin-remove-top card-description">Sandwiches, Mediterranean</p>

          <div className="card-bottom">
            <p className="uk-text-meta uk-margin-remove-top card-time">6:00am to 4:45pm</p>
            <i className="ico-walk"></i>
            <span className="uk-text-meta uk-margin-remove-top">0.25km</span>
          </div>
        </div>
      </a>
    </li>
  );
};

interface INotificationCardProps {
  text: string;
  backgroundColor?: string
}

const NotificationCard: React.SFC<INotificationCardProps> = ({
  text,
  backgroundColor
}) => {
  return (
    <div className="uk-card uk-card-default card notification" style={{ background: backgroundColor }}>
      <p>{text}</p>
    </div>
  )
}

const Container = styled.ul`
  display: block;
  max-width: 52vh;
  height: 100%;
  background: #f6f6f7;

  list-style-type: none;
  padding: 5px 0;

  li {
    margin: 12px 5px;
  }

  .notification {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 0;
    margin-bottom: 5px;

    p {
      margin: 0;
      color: black;
      font-weight: 300;
      letter-spacing: 0.02em;
    }
  }

  .card {
    display: flex;
    background: white;
    text-decoration: none !important;
    padding: 5px;
  }

  .card-image {
    flex: 40%;
    img {
      max-width: 90%;
    }
  }

  .card-content {
    flex: 60%;

    display: flex;
    flex-direction: column;
  }

  .card-top {
    justify-self: flex-start;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }

  .card-time {
    justify-self: flex-end;
    margin-bottom: 2px;
  }

  .card-bottom {
    justify-self: flex-end;
    margin-bottom: 2px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    span, p {
      font-size: 0.65em !important;
    }
  }

  .card-icon {
    color: green;
  }

`;