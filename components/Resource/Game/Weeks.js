import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const GameWeeks = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [gameKey, setGameKey] = useState(null);
  const [gameKeyError, setGameKeyError] = useState(false);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === gameKey) {
      return setGameKeyError(true);
    } else {
      setGameKeyError(false);
    }

    setLoading(true);

    const data = await api("/game/game_weeks", {
      gameKey,
    });

    setResponse(data);
  };

  useEffect(() => {
    if (response) {
      setLoading(false);
    }
  }, [response]);

  const updateInput = (cb, val) => {
    return cb(val);
  };

  return (
    <>
      <h2 className={appStyles.public}>game.game_weeks</h2>
      <p>Retrieve start and end dates for each week in a specified game.</p>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div>
        <h3>{activeTab === "description" ? "Arguments" : "Try It Out"}</h3>
        <form onSubmit={(e) => makeAPICall(e)}>
          <div className={appStyles.table}>
            <div className={cx(appStyles.header, appStyles.row)}>
              <div>Argument</div>
              {activeTab === "tester" && <div>Value</div>}
              <div>Description</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.required)}>
                game_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: gameKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setGameKey, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                Key for the game you want to query. You can find a list of
                common game_ids in the{" "}
                <a
                  href="https://developer.yahoo.com/fantasysports/guide/#game-resource"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  official Yahoo! Fantasy Sports documentation for the game
                  resource
                </a>
                . Game key examples: 'mlb', 'nfl', 328 (2014 MLB season), 242
                (2010 NFL season)
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {gameKeyError && (
                <div className={appStyles.err}>
                  Please enter a value for all required fields
                </div>
              )}
              <button
                onClick={makeAPICall}
                className={appStyles.button}
                type="submit"
              >
                {loading ? (
                  <div className={appStyles.spinner}>
                    <div className={appStyles.bounce1}></div>
                    <div className={appStyles.bounce2}></div>
                    <div className={appStyles.bounce3}></div>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          )}
        </form>

        {response && activeTab === "tester" && <CodeBlock code={response} />}

        {activeTab === "description" && (
          <>
            <div>
              <h3>How to use</h3>
              <CodeBlock>{`const YahooFantasy = require('yahoo-fantasy');
const yf = new YahooFantasy(
  Y!APPLICATION_KEY,
  Y!APPLICATION_SECRET,
  tokenCallbackFn, // optional
  redirectUri // optional
);

yf.setUserToken(
  Y!OAuthAccessToken
);

// promise based
try {
  const game_weeks = await yf.game.game_weeks(game_key);
} catch (e) {
  // handle error
}

// callback based
yf.game.game_weeks(game_key, callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    game_key: "328",
                    game_id: "328",
                    name: "Baseball",
                    code: "mlb",
                    type: "full",
                    url: "http://baseball.fantasysports.yahoo.com/b1",
                    season: "2014",
                    weeks: [
                      { week: "1", start: "2014-03-22", end: "2014-04-06" },
                      { week: 2, start: "2014-04-07", end: "2014-04-13" },
                      { week: 3, start: "2014-04-14", end: "2014-04-20" },
                      { week: 4, start: "2014-04-21", end: "2014-04-27" },
                      { week: 5, start: "2014-04-28", end: "2014-05-04" },
                      { week: 6, start: "2014-05-05", end: "2014-05-11" },
                      { week: 7, start: "2014-05-12", end: "2014-05-18" },
                      { week: 8, start: "2014-05-19", end: "2014-05-25" },
                      { week: 9, start: "2014-05-26", end: "2014-06-01" },
                      { week: 10, start: "2014-06-02", end: "2014-06-08" },
                      { week: 11, start: "2014-06-09", end: "2014-06-15" },
                      { week: 12, start: "2014-06-16", end: "2014-06-22" },
                      { week: 13, start: "2014-06-23", end: "2014-06-29" },
                      { week: 14, start: "2014-06-30", end: "2014-07-06" },
                      { week: 15, start: "2014-07-07", end: "2014-07-20" },
                      { week: 16, start: "2014-07-21", end: "2014-07-27" },
                      { week: 17, start: "2014-07-28", end: "2014-08-03" },
                      { week: 18, start: "2014-08-04", end: "2014-08-10" },
                      { week: 19, start: "2014-08-11", end: "2014-08-17" },
                      { week: 20, start: "2014-08-18", end: "2014-08-24" },
                      { week: 21, start: "2014-08-25", end: "2014-08-31" },
                      { week: 22, start: "2014-09-01", end: "2014-09-07" },
                      { week: 23, start: "2014-09-08", end: "2014-09-14" },
                      { week: 24, start: "2014-09-15", end: "2014-09-21" },
                      { week: 25, start: "2014-09-22", end: "2014-09-28" },
                    ],
                  },
                  null,
                  2
                )}
              </CodeBlock>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GameWeeks;
