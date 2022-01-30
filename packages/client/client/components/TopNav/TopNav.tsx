import React from "react";
import styled from "@emotion/styled";
import { Activity, Home, LogIn, NewPost, Share } from "../Icons";

const TopNav = () => {
  return (
    <StyledNav>
      <div className="logo">#hashGram</div>
      <div className="menu">
        <Home />
        <Share />
        <NewPost />
        <Activity />
        <LogIn />
      </div>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: calc(4 * var(--padding-md));
  height: var(--topnav-height);
  width: calc(100vw - 2 * var(--padding-md));
  position: fixed;
  z-index: 99;
  border-bottom: thin solid var(--colors-border);
  background: var(--colors-background);
  padding: 0 var(--padding-md);
  > div {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    font-family: var(--brand-font);
    font-size: 1.35rem;
  }
  .menu {
    flex-grow: 1;
    max-width: 254px;
    padding: 0 var(--padding-md);
    > svg {
      cursor: pointer;
    }
  }
`;

export default TopNav;
