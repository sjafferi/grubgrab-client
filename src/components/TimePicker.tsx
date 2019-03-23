import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import RcTimePicker from 'rc-time-picker';
import { range } from 'lodash';
import { observer } from "mobx-react";
import { TextStyle } from 'ui';
import 'rc-time-picker/assets/index.css';

const Container = styled(RcTimePicker)`
  &.rc-time-picker {
    width: 80px;
  }
  input {
    ${TextStyle}
    outline-style: none;
    padding-left: 15px;
    border: none;
  }
`;

interface ITimePicker {
  defaultValue?: moment.Moment;
  startTime?: moment.Moment;
  endTime?: moment.Moment;
  value?: moment.Moment;
  onChange: (value: moment.Moment) => void
}

@observer
export default class TimePicker extends React.Component<ITimePicker> {
  static defaultProps = {
    defaultValue: moment(),
    startTime: moment(),
    endTime: moment().add(1, "h")
  }

  public onChange = (value: moment.Moment) => {
    if (this.isValid(value)) {
      this.props.onChange(value);
    }
  }

  public isValid = (value?: moment.Moment) => {
    const start = this.props.startTime;
    const end = this.props.endTime;
    return value && value.isSameOrAfter(start) && value.isSameOrBefore(end);
  }

  get defaultValue() {
    if (this.isValid(this.props.defaultValue!)) return this.props.defaultValue;
    return this.props.startTime;
  }

  disabledHours = () => {
    const start = this.props.startTime!.hours();
    const end = this.props.endTime!.hours();
    return [...range(0, start), ...range(end + 1, 23)];
  }

  disabledMinutes = (h: number) => {
    const startHour = this.props.startTime!.hours();
    const endHour = this.props.endTime!.hours();
    if (h === startHour) {
      const startMinute = this.props.startTime!.minutes();
      return range(0, startMinute);
    }
    if (h === endHour) {
      const endMinute = this.props.endTime!.minutes();
      return range(endMinute + 1, 60);
    }
    if (h < startHour || h > endHour) return range(0, 60);

    return [];
  }

  public render() {
    return (
      <Container
        defaultValue={this.defaultValue}
        allowEmpty={false}
        showSecond={false}
        use12Hours={true}
        minuteStep={15}
        format={"h:mm a"}
        popupClassName="timepicker-popup" // defined in index.html
        disabledHours={this.disabledHours}
        disabledMinutes={this.disabledMinutes}
        onChange={this.onChange}
        value={this.props.value}
      />
    );
  }
}

