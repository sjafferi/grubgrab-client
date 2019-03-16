import * as React from "react";
import styled from "styled-components";
import { Header3, breakpoint } from 'ui';
import { formatTime, hoursToday } from '@util';
import { inject, observer } from "mobx-react";
import { User, RouterStore, Restaurant, IRestaurant } from 'stores';
import State from './state';

interface ICardProps {
  user?: User;
  router?: RouterStore;
  restaurant?: Restaurant;
  state: State;
}

@inject("restaurant")
@inject("user")
@observer
export default class Cards extends React.Component<ICardProps> {

  componentWillMount() {
    this.props.restaurant!.fetch();
  }

  get restaurants() {
    return this.props.restaurant!.restaurants;
  }

  handleSelectRestaurant = async (retaurant: IRestaurant) => {
    const { result, error } = await this.props.restaurant!.fetchOne(retaurant.id!);
    if (result) {
      this.props.state.selectedRestaurant = result;
    }
  }

  renderRestaurant = (restaurant: IRestaurant) => {
    const { name, hours, categories, images, id } = restaurant;
    const parsedHours = hoursToday(hours) || {};
    const image = images!.find(({ description }) => description.includes('listImageMobileUrl'));
    return (
      <RestaurantCard
        name={name}
        description={categories!.slice(0, 3).join(', ')}
        startTime={parsedHours.openTime}
        endTime={parsedHours.closeTime}
        image={image!.url}
        key={id}
        onClick={() => this.handleSelectRestaurant(restaurant)}
      />
    )
  }

  public render() {
    return (
      <Container>
        {this.restaurants.map(this.renderRestaurant)}
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
  image?: string;
  onClick: () => void
}

const RestaurantCard: React.SFC<IRestaurtCardProps> = ({
  name,
  description,
  startTime,
  endTime,
  image,
  onClick,
}) => {

  return (
    <li className="uk-card uk-card-default uk-card-hover">
      <a className="card" onClick={onClick}>
        <div className="card-image">
          <img src={image} />
        </div>
        <div className="card-content">
          <div className="card-top">
            <Header3 className="uk-card-title uk-margin-remove-bottom card-title">{name && name.length > 30 ? name.substring(0, 27) : name}</Header3>
            <span data-uk-icon="chevron-right" className="uk-text-large card-icon" />
          </div>

          <p className="uk-text-meta uk-margin-remove-top card-description">{description}</p>

          <div className="card-bottom">
            <p className="uk-text-meta uk-margin-remove-top card-time">{formatTime(startTime!)} to {formatTime(endTime!)}</p>
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

  ${breakpoint.down('m')`{
    max-width: 100vw;
  }`}

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
    position: relative;

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
    position: absolute;
    bottom: 5px;
    justify-self: flex-end;
    margin-bottom: 2px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    span, p {
      font-size: 0.65em !important;
    }

    ${breakpoint.down('xl')`{
      bottom: 0px;
    }`}  

    ${breakpoint.down('m')`{
      bottom: -5px;
    }`}
  }

  .card-icon {
    color: green;
    min-width: 1.5em;
  }

`;