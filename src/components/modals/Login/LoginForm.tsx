import * as React from 'react';
import styled from 'styled-components';
import { Header3, Primary, Text } from 'ui';
import { observer } from 'mobx-react'
import FormState from './state';

const Form = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: fit-content !important;

  input {
    margin-bottom: 10px;
  }
  
  .uk-margin {
    width: fit-content;
  }

  p.error {
    font-size: 9px;
    margin: 0;
    padding: 0;
  }

  p.authentication {
    margin-top: 25px;
    text-align: center;
    font-size: 10px;
    color: red;
  }
`;

interface IProps {
  state: FormState;
  name?: string;
}

@observer
export default class Login extends React.Component<IProps> {
  get form() { return this.props.state; }

  handleChange = (key: string) => (event: any) => this.form.assign({ [key]: event.target.value })

  submit = (e: any) => {
    e.preventDefault();
    this.form.submit();
  }

  public render() {
    return (
      <form>
        <Form className="uk-fieldset">
          <Header3 center>Login</Header3>
          <Field name="email" state={this.form} handleChange={this.handleChange("email")} />
          <Field name="password" type="password" state={this.form} handleChange={this.handleChange("password")} />
          <Primary onClick={this.submit} loading={this.form.loading}>Submit</Primary>
          {this.form.errorFor('authentication') && <Text className="error authentication">{this.form.errors['authentication']}</Text>}
        </Form>
      </form>
    )
  }
}

const FieldContainer: any = styled.div`
  p.error {
    display: ${(props: any) => props.error ? 'block' : 'none'};
  }

  input.uk-form-danger {
    border-color: red;
  }

  input.uk-form-danger::placeholder {
    color: red;
    font-weight: 300 !important;
  }
`


const Field: React.SFC<IProps & { handleChange: (event: any) => void, type?: string }> = observer(({ state, name, type, handleChange }) => (
  <FieldContainer className="uk-margin" error={state.errorFor(name)}>
    <input placeholder={`Enter ${name}`}
      className={`uk-input uk-form-width-medium ${state.errorFor(name) ? "uk-form-danger" : ""}`}
      type={type || "text"}
      value={state[name]}
      onChange={handleChange} />
    <Text className="error">{state.errors[name]}</Text>
  </FieldContainer>
))