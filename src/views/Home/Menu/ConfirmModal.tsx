import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { values } from 'lodash';
import { observer } from "mobx-react";
import State from '../state';
import { IFoodItem } from 'stores';
import { hoursToday } from '@util';
import { breakpoint, colors, Column, Modal, Header3, Primary, Row, Spacer, Text, TimePicker } from 'ui';

const Container = styled(Modal)`
  .uk-modal-dialog {
    transform: translateY(30%);
    min-width: 35%;
  }
  
  .title {
    line-height: 0;
  }

  ${breakpoint.down('m')`{
    min-height: 50%;
  }`}
`

const Items = styled.ul`
  list-style-type: none;

  li:before {
    content: '–';
    position: absolute;
    margin-left: -20px;
    margin-top: -7px;
  }

  border: 1px dashed ${colors.blackish};
  padding: 15%;


  ${breakpoint.down('m')`{
    padding: 7% 15% 2% 15%;
  }`}
`

const Item = styled.li`
  p {
    font-weight: 300;
    text-transform: capitalize;
  }

  .rc-time-picker {

  }
`;

const BottomContainer = styled(Row)`

`

const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 3px 3px 0 0;
  }
`;

@observer
export default class ConfirmModal extends React.Component<{ state: State, onClose: () => void }> {

  constructor(props: any) {
    super(props);
  }

  get restaurant() {
    return this.props.state.selectedRestaurant!;
  }

  get hours() {
    const { hours } = this.restaurant;
    const { openTime, closeTime } = (hoursToday(hours) || {} as any);
    return { startTime: moment(openTime, ['h:mm a', 'H:mm']), endTime: moment(closeTime, ['h:mm a', 'H:mm']) }
  }

  handleTimeChange = (value: moment.Moment) => {
    this.props.state.assign({ pickupTime: value });
  }


  public renderItems = () => {
    const items: IFoodItem[] = values(this.props.state.selectedMenuItems)
      .map(item => this.restaurant.menu!.find(({ id }) => item === id)!);

    return (
      <Items>
        {items.map(({ name, type, id }) => (
          <Item key={id}>
            <Text>{type}: {name}</Text>
          </Item>
        ))}
      </Items>
    )
  }

  public render() {
    return (
      <Container onClose={this.props.onClose}>
        <Header3 className="title" center>Your Items</Header3>
        <Spacer height={15} />
        {this.renderItems()}
        <Spacer height={25} />
        <BottomContainer center>
          <Column>
            <TimeContainer>
              <Text center>Select Time:</Text>
              <TimePicker
                defaultValue={moment().add(15, 'm')}
                startTime={this.hours.startTime}
                endTime={this.hours.endTime}
                value={this.props.state.pickupTime}
                onChange={this.handleTimeChange}
              />
            </TimeContainer>
            <Spacer height={20} />
            <Primary theme="light">Confirm Pickup</Primary>
          </Column>
        </BottomContainer>
      </Container>
    )
  }
}