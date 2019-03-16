import * as React from "react";
import styled, { StyledComponentBase } from "styled-components";
import { assign, some, values } from 'lodash';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Header1, Header2, Header3, Text } from 'ui';
import { IFoodItem } from 'stores';
import { formatTime, formatCents, hoursToday } from '@util';
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

  .close-modal {

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
  position: relative;
  justify-content: center;
  width: 80%;
  margin-left: 15%;
  padding: 0.5% 2.5% 0 2.5%;

  .price {
    font-size: 0.75em;
    text-decoration: line-through;
  }

  .selected.price {
    text-decoration: none;
  }

  span.uk-text-meta {
    line-height: inherit;
    margin-left: 5px;
  }

  .radio {
    position: absolute;
    top: 16%;
    left: -7%;
    width: 16px;
    height: 16px;
    background-url: none !important;
  }

  &:hover {
    cursor: pointer;
  }
`;
const MenuItemColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  outline-style: none;

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

@observer
export default class Menu extends React.Component<IMenuProps> {

  public close = () => {
    this.props.state.assign({ selectedRestaurant: undefined });
  }

  public select = (type: string, id: string) => {
    const copy = assign({}, toJS(this.selected));
    if (!copy[type]) copy[type] = { [id]: false };
    copy[type][id] = !copy[type][id];
    const noneSelected = !some(values(copy[type]));
    let freeItem;
    if (noneSelected) {
      freeItem = undefined;
    } else if (copy[type][id]) {
      freeItem = id;
    } else if (id === this.freeItem) { // unselected current
      freeItem = Object.entries(copy[type]).find(([id, selected]) => selected)![0];
    } else {
      freeItem = this.freeItem;
    }
    this.props.state.assign({ selectedMenuItems: copy, freeItem });
  }

  get selected() {
    return this.props.state.selectedMenuItems;
  }

  get freeItem() {
    return this.props.state.freeItem;
  }

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
        {menu.map(({ name, description, priceCents, id }) => {
          const selected = this.selected[group] && this.selected[group][id!];
          const free = !(this.selected[group] !== undefined && this.freeItem !== id) || this.freeItem === undefined;
          return (
            <MenuItem key={id} className="uk-card uk-card-hover" onClick={() => this.select(group, id!)}>
              <input className="radio uk-radio" type="radio" name={`radio-${id}`} checked={selected} />
              {/* <Radio checked={!selected} /> */}
              <MenuItemColumn>
                <Header3>{name}</Header3>
                <Text className="uk-text-meta">{description}</Text>
              </MenuItemColumn>
              <Price className={!free ? "selected" : ""} priceCents={priceCents} />
              {free && <span className="uk-text-meta">free</span>}
            </MenuItem>
          )
        })}
      </MenuGroup>
    )
  }

  public render() {
    const { name, address } = this.restaurant;

    return (
      <Container>
        <CloseButton close={this.close} />
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

const Price: React.SFC<{ priceCents: number, className?: string }> = ({ priceCents, className }) => {
  const priceDollars = formatCents({ cents: priceCents });

  const cents = priceDollars.substr(-2);
  const whole = priceDollars.substr(0, priceDollars.length - 3);

  return (
    <span className={`price ${className ? className : ""}`}>
      ${whole}.{cents}
    </span>
  );
}

const CloseButton: React.SFC<{ close: () => void }> = ({ close }) => (
  <button className={`close-modal uk-modal-close-default`} onClick={close}>
    <span data-uk-icon="close" className="uk-text-medium" />
  </button>
)

const Radio: React.SFC<{ checked: boolean }> = observer(({ checked }) => (
  <input className="radio uk-radio" type="radio" name="radio2" checked={checked} />
));