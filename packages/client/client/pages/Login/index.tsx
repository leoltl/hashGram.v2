import React from "react";
import styled from "@emotion/styled";

const Login: React.FC = () => {
  return (
    <main>
      <StyledWrapper>
        <StyledSignIn className="sign-in">
          <div className="logo">#hashGram</div>
          <div className="form">
            <input
              name="username"
              placeholder="Phone number, username, or email"
            />
            <input name="password" placeholder="Password" />
            <button>Log In</button>
          </div>
        </StyledSignIn>
        <StyledSignUp className="sign-up">
          Don't have an account?&nbsp;
          <a className="sign-up-link" href="#">
            Sign up
          </a>
        </StyledSignUp>
      </StyledWrapper>
    </main>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--padding-xl);
  gap: var(--padding-md);
  font-size: 0.9rem;
  > div {
    width: 348px;
  }
`;

const StyledSignIn = styled.div`
  border: thin solid var(--colors-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: var(--padding-lg);
  height: 350px;
  .logo {
    font-family: var(--brand-font);
    font-size: 2.75rem;
  }
  .form {
    display: flex;
    flex-direction: column;
    width: 75%;
    height: 40%;
    justify-content: space-evenly;
    > input {
      border: 1px solid var(--colors-border);
      border: radius: 2.5px;
      padding: calc(1.5 * var(--padding-sm));      
      font-size: 0.8rem;
    }
    > button {
      border: none;
      border-radius: 2.5px;
      padding: var(--padding-sm);
      background-color: var(--colors-primary);
      color: white;
    }
  }
`;

const StyledSignUp = styled.div`
  border: thin solid var(--colors-border);
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  .sign-up-link {
    color: var(--colors-primary);
    font-weight: 600;
    text-decoration: none;
  }
`;

export default Login;
