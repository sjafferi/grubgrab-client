import styled from 'styled-components';
import { BREAKPOINTS } from 'consts';
import styledBreakpoint from '@humblebee/styled-components-breakpoint';

// Creates an object with breakpoint utility methods.
export const breakpoint = styledBreakpoint(BREAKPOINTS);

export const Header1 = styled.h1`
  font-family: 'Open Sans', serif;
  font-weight: 600;
  font-size: 2em;
  line-height: 2.5em;
  letter-spacing: 0.025em;

  ${breakpoint.down('m')`{
    text-align: center;
  }`}
`;

export const Header3: any = styled.h3`
  font-family: 'Open Sans', serif;
  font-weight: 300;
  font-size: 1.25em;
  line-height: 2em;
  letter-spacing: 0.025em;
  text-transform: capitalize;

  ${(props: any) => props.center ? `
    text-align: center;
  ` : ''}
`;

export const Subtitle: any = styled.p`
  font-size: 24px;
  color: rgb(91, 97, 124);
  width: 500px;
  text-align: left;
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;

  ${(props: any) => props.center ? `
    text-align: center;
  ` : ''}
`;

export const Text: any = styled.p`
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.02em;

  ${(props: any) => props.center ? `
    text-align: center;
  ` : ''}
`;



/**
 *
 *         <Cards>
          <Card title="Choose a plan" subtitle="Contrary to popular belief, Lorem Ipsum is not simply random text. " />
          <Card title="Pick a time" subtitle="Contrary to popular belief, Lorem Ipsum is not simply random text. " />
          <Card title="Eat & Enjoy" subtitle="Contrary to popular belief, Lorem Ipsum is not simply random text. " />
        </Cards>
*/
