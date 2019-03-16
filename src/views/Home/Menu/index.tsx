import * as React from "react";
import styled, { StyledComponentBase } from "styled-components";
import { Header1, Header2, Header3, Text } from 'ui';
import { IFoodItem } from 'stores';
import { formatTime, formatPrice, hoursToday } from '@util';
import State from '../state';

const Container = styled.div`
  height: 100%;
  max-height: calc(100% - 45px);
  position: fixed;
  left: 52vh;
  right: 0;
  top: 45px;
  bottom: 0;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 6px;
  }
`;

interface IHeaderProps extends StyledComponentBase<any, any, any, any> {
  backgroundImage?: string;
}
const Header: IHeaderProps = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin-top: 5px;

  background-image: url('${(props: any) => props.backgroundImage ? props.backgroundImage : ''}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  h1 {
    font-size: 1.5em;
    font-weight: 500;
    line-height: 0.75em;
  }
`;
const HeaderRow = styled.div`
  display: flex;
  p {
    margin: 0 5px;
  }
`;


const MenuGroup = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  h2 {
    margin-left: 15%;
  }
`;
const MenuItem = styled.li`
  display: flex;
  justify-content: center;
  width: 80%;
  margin-left: 15%;
  padding: 0.5% 2.5% 0 2.5%;

  .price {
    font-size: 0.875em;
  }

  &:hover {
    cursor: pointer;
  }
`;
const MenuItemColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  p.uk-text-meta {
    padding-left: 15px;
    margin: 10px;
  }
  h3 {
    margin: 0;
    font-size: 1em;
  }
`

interface IMenuProps {
  state: State;
}


export default class Menu extends React.Component<IMenuProps> {

  get restaurant() {
    return this.props.state.selectedRestaurant!;
  }

  get hours() {
    const { hours } = this.restaurant;
    const parsedHours = hoursToday(hours) || {};
    return `${formatTime(parsedHours.openTime)} - ${formatTime(parsedHours.closeTime)}`
  }

  get image() {
    if (this.restaurant.images!.length < 4) return;
    return this.restaurant.images![4].url;
  }

  get menu() {
    const types: { entree: IFoodItem[], side: IFoodItem[], dessert: IFoodItem[] } = { entree: [], side: [], dessert: [] };
    this.restaurant.menu!.forEach(item => {
      ((types as any)[item.type] as any).push(item);
    })
    return types;
  }

  renderMenuGroup(group: "entree" | "side" | "dessert") {
    const menu = this.menu[group];
    if (!menu.length) return;
    return (
      <MenuGroup>
        <Header2 className="uk-text-lead">{group}s</Header2>
        {menu.map(({ name, description, priceCents }) => (
          <MenuItem className="uk-card uk-card-hover">
            <MenuItemColumn>
              <Header3>{name}</Header3>
              <Text className="uk-text-meta">{description}</Text>
            </MenuItemColumn>
            {formatPrice(priceCents)}
          </MenuItem>
        ))}
      </MenuGroup>
    )
  }

  public render() {
    const { name, address } = this.restaurant;

    return (
      <Container>
        <Header>
          <Header1 className="uk-text-lead">{name.length > 30 ? name.substring(0, 27) : name}</Header1>
          <HeaderRow>
            <Text className="uk-text-meta">{address.split(',')[0]}</Text>
            <Text className="uk-text-meta">{this.hours}</Text>
          </HeaderRow>
        </Header>
        {this.renderMenuGroup("entree")}
        {this.renderMenuGroup("side")}
        {this.renderMenuGroup("dessert")}
      </Container>
    );
  }
}