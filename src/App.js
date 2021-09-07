import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

import ApolloProvider from "./context/ApolloProvider";
import { AuthProvider } from "./context/auth";
import { MessageProvider } from "./context/message";
import DynamicRoute from "./utils/DynamicRoute";

import Desktop from "./Desktop/Desktop";
import SignUp from "./Windows/SignUp/SignUp";
// TODO: Change SignOn to Register page that opens in browser (after making Register Component)
// import Register from './Windows/Register/Register'
import SignOn from "./Windows/SignOn/SignOn";
import BuddyList from "./Windows/BuddyList/BuddyList";
import InstantMessage from "./Windows/InstantMessage/InstantMessage";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
  ${styleReset}
`;

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <GlobalStyles />
          <ThemeProvider theme={original}>
            <BrowserRouter>
              <Switch>
                <DynamicRoute
                  exact
                  path="/"
                  component={Desktop}
                  authenticated
                />
                <DynamicRoute
                  path="/buddylist"
                  component={BuddyList}
                  authenticated
                />
                <DynamicRoute
                  path="/im"
                  component={InstantMessage}
                  authenticated
                />
                <DynamicRoute path="/signup" component={SignUp} guest />
                // TODO: Change SignOn to Register page that opens in browser
                (after making Register Component)
                {/* <DynamicRoute path="/register" component={Register} guest /> */}
                <DynamicRoute path="/signon" component={SignOn} guest />
              </Switch>
            </BrowserRouter>
          </ThemeProvider>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
