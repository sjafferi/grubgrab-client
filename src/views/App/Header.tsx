import * as React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { breakpoint, colors, Text } from "ui";

import { inject, observer } from "mobx-react";
import { User, RouterStore, Viewport } from 'stores';

const Container = styled.header`
  height: 45px;
  width: 100%;
  padding: 0 1em 0 2em;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.themeGradient};
`;

const Logo = styled(Link)`
  color: rgb(91, 97, 124);
  font-size: 20px;
  text-decoration: none !important;
  color: ${colors.white} !important;
`;

const Center = styled.div`
  display: flex;
  color: white;
  align-items: center;

  ${breakpoint.down('m')`{
    margin: auto auto;

    .uk-search {
      width: 200px;
    }
  }`}
`

const SearchForm = styled.form`
  border: none;
  margin-right: 10px !important;
`;

const SearchTextStyle = css`
  color: white !important;
  font-size: 12px !important;
  font-famiy: "Open Sans";
  letter-spacing: 0.02em;
  padding-left: 1% !important;
`

const SearchInput = styled.input`
  height: 30px !important;
  border: none !important;
  background: #184c28a1 !important;

  ${SearchTextStyle}
  padding-left: 10% !important;

  &::placeholder {
    ${SearchTextStyle}
  }
`;

const Locations = styled.div`
  display: flex;
  font-size: 12px;

  button, p {
    margin: 0;
    margin-left: 7px;
  }

  p {
    align-self: center;
  }
`

const LocationButton = styled.button`
  border: none !important;
  ${SearchTextStyle}
  padding: 0 !important;
`;

const ButtonLink = styled.a`
  background: #184c28a1 !important;
  ${SearchTextStyle}
  padding: 0 15px !important;
  text-decoration: none !important;
`

const Right = styled.div`
  display: flex;
  align-items: center;
  p, span {
    color: white;
    margin: 0;
  }

  p {
    font-size: 12px;
    margin-right: 15px;
  }
`
@inject("user")
@inject("viewport")
@inject("router")
@observer
export class Header extends React.Component<{ user?: User, router?: RouterStore, viewport?: Viewport }, {}> {
  get user() { return this.props.user!; }
  get viewport() { return this.props.viewport!; }

  public render() {
    return (
      <Container>
        {this.viewport.isTabletAndAbove && <Logo to="/">GrubGrab</Logo>}

        <Center>
          <SearchForm className="uk-search uk-search-default">
            <SearchInput className="uk-search-input" type="search" placeholder="Search categories" />
          </SearchForm>
          {this.viewport.isTabletAndAbove && <Locations>
            <p>in</p>
            <LocationButton className="uk-button uk-button-default">Toronto</LocationButton>
            <p>or</p>
            <LocationButton className="uk-button uk-button-default">Waterloo</LocationButton>
          </Locations>}
        </Center>

        <Right>
          {this.user.isLoggedIn && <ProfileSection />}
          {!this.user.isLoggedIn && <Login router={this.props.router!} />}
        </Right>
      </Container>
    );
  }
}


const ProfileSection: React.SFC = () => (
  <>
    <Text>5 meals remaining</Text>
    <span data-uk-icon="user" className="uk-text-medium" />
  </>
);

const Login: React.SFC<{ router: RouterStore }> = ({ router }) => (
  <ButtonLink onClick={() => router.push({ search: '?login=true', pathname: router.location.pathname })}>Login</ButtonLink>
)