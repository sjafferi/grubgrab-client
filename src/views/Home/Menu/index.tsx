import * as React from "react";
import styled, { StyledComponentBase } from "styled-components";
import { assign, some, values } from 'lodash';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { colors, breakpoint, Header1, Header2, Header3, Text, Primary, Spacer } from 'ui';
import { IFoodItem, Viewport } from 'stores';
import { formatTime, formatCents, hoursToday } from '@util';
import State from '../state';
import ConfirmModal from './ConfirmModal';

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

  ${breakpoint.down('m')`{
    left: 0;
  }`}
`;

interface IHeaderProps extends StyledComponentBase<any, any, any, any> {
  backgroundImage?: string;
}
const Header: IHeaderProps = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
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

  ${breakpoint.down('m')`{
    h1 {
      line-height 1.75em;
    }
  }`}

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

  ${breakpoint.down('m')`{
    h2 {
      margin-left: 10%;
    }
  }`}
`;
const MenuItem = styled.li`
  display: flex;
  position: relative;
  justify-content: center;
  width: 80%;
  margin-left: 15%;
  padding: 0.5% 2.5% 0 2.5%;
  user-select: none;

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
    align-self: center;
    width: 16px;
    height: 16px;
    background-url: none !important;
  }

  &:hover {
    cursor: pointer;
  }

  ${breakpoint.down('m')`{
    width: 94%;
    margin-left: 4.5%;
    padding: 5px 0;
    margin-bottom: 5%;
    min-height: 90px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }`}
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

  ${breakpoint.down('m')`{
    width: 70%;
  }`}
`;

const CheckoutButtonRow = styled.div`
  height: 70px;
  /* width: calc(100% - 52vh); */
  width: 100%;
  margin-right: -52vh;
  padding-right: 52vh;
  
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 52vh;
  margin: 10px 0 0 0;
  background-color: ${colors.lightGrey};

  button {
    width: 200px;
  }


  ${breakpoint.down('m')`{
    padding-right: 0;
    left: 0;
  }`}
`;


interface IMenuProps {
  state: State;
  viewport?: Viewport;
}

@inject("viewport")
@observer
export default class Menu extends React.Component<IMenuProps, { showConfirm: boolean }> {
  state = {
    showConfirm: false
  }

  public close = () => {
    this.props.state.assign({ selectedRestaurant: undefined });
  }

  public select = (type: string, id: string) => {
    const copy = assign({}, toJS(this.selected));
    if (id !== copy[type]) copy[type] = id;
    else copy[type] = "";

    this.props.state.assign({ selectedMenuItems: copy });
  }

  get hasSelected() {
    return some(values(this.selected["entree"])) || some(values(this.selected["side"]));
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

  toggleConfirm = () => {
    this.setState({ showConfirm: !this.state.showConfirm });
  }

  renderMenuGroup(group: "entree" | "side" | "dessert") {
    const menu = this.menu[group];
    if (!menu.length) return;

    const className = this.props.viewport!.isTabletAndAbove ? "uk-card-hover" : "uk-card-default";

    return (
      <MenuGroup>
        <Header2 className="uk-text-lead">{group}s</Header2>
        {menu.map(({ name, description, priceCents, id }) => {
          const selected = !!(this.selected[group] && this.selected[group] === id);
          return (
            <MenuItem key={id} className={`uk-card ${className}`} onClick={() => this.select(group, id!)}>
              <MenuItemColumn>
                <Header3>{name}</Header3>
                <Text className="uk-text-meta">{description}</Text>
              </MenuItemColumn>
              <input className="radio uk-radio" type="radio" name={`radio-${id}`} checked={selected} readOnly />
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
        {this.hasSelected && <Spacer height={70} />}
        {this.hasSelected && <CheckoutButtonRow>
          <Primary onClick={this.toggleConfirm}>Schedule</Primary>
        </CheckoutButtonRow>}
        {this.state.showConfirm && <ConfirmModal state={this.props.state} onClose={this.toggleConfirm} />}
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