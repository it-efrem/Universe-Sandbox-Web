import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import {
  StyledApp,
  StyledAppDate,
  StyledAppSubTitle,
  StyledAppTitle,
} from "./App.styles";

export const App: React.FC = () => (
  <StyledApp>
    <StyledAppTitle>
      Universe Sandbox Web <FontAwesomeIcon icon={faWrench} />
    </StyledAppTitle>
    <StyledAppSubTitle>coming soon...</StyledAppSubTitle>
    <StyledAppDate>(march 2022)</StyledAppDate>
  </StyledApp>
);
