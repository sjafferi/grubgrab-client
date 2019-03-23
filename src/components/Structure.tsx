import styled from 'styled-components';

export const Section: any = styled.div`
  width: 100%;
  height: 90vh;
  background: ${(props: any) => props.color ? props.color : 'white'};
  ${(props: any) => props.center ? `
    display: flex;
    flex-direction: column;
    align-items: center;
  ` : ''}
`;

export const Row: any = styled.div`
  display: flex;

  ${(props: any) => props.center ? `
    justify-content: center;
  ` : ''}
`;

export const Column: any = styled.div`
  display: flex;
  flex-direction: column;

  ${(props: any) => props.center ? `
    justify-content: center;
  ` : ''}
`

export const Spacer: any = styled.div`
  ${(props: any) => props.width ? `
    width: ${props.width}px;
  ` : ''}

  ${(props: any) => props.height ? `
    height: ${props.height}px;
  ` : ''}
`