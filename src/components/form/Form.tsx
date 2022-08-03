import {
  ChangeEventHandler, FC, FormEventHandler, useState,
} from 'react';
import { useLogin } from '../../context/LoginProvider';
import { FormState } from '../../services/LoginService.class';
import './form.css';


const initialState: FormState = {
  discordId: '',
  email: '',
};

export const Form: FC = () => {
  const [userInput, setUserInput] = useState<FormState>(initialState);
  const { onFetchToken } = useLogin();

  const onSubmitHandler : FormEventHandler = async (e) => {
    e.preventDefault();
    onFetchToken(userInput);
    setUserInput(initialState);
  };

  const onChangeHandler:
    ChangeEventHandler<HTMLInputElement> = (e) => {
      setUserInput((state) => {
        return {
          ...state,
          [e.target.id]: e.target.value,
        };
      });
    };

  return (
    <form className="form" action="" onSubmit={onSubmitHandler}>
      <h2 className="form__heading">Login</h2>
      <input
        value={userInput.discordId}
        onChange={onChangeHandler}
        id="discordId"
        className="form__input"
        type="text"
        placeholder="DiscordID..."
        required
      />

      <input
        value={userInput.email}
        onChange={onChangeHandler}
        id="email"
        className="form__input"
        type="email"
        placeholder="Email..."
        required
      />
      <button className="btn" type="submit">submit</button>
    </form>
  );
};
