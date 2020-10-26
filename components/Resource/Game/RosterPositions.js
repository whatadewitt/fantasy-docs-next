import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const GameRosterPositions = () => {
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

    const data = await api("/game/roster_positions", {
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
      <h2 className={appStyles.public}>game.roster_positions</h2>
      <p>
        Retrieve a detailed description of all roster positions in specified
        game.
      </p>

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
  const meta = yf.game.roster_positions(game_key);
} catch (e) {
  // handle error
}

// callback based
yf.game.roster_positions(game_key, callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    game_key: "341",
                    game_id: "341",
                    name: "Hockey",
                    code: "nhl",
                    type: "full",
                    url: "http://hockey.fantasysports.yahoo.com/hockey",
                    season: "2014",
                    roster_positions: [
                      {
                        position: "C",
                        abbreviation: "C",
                        display_name: "Center",
                        position_type: "P",
                      },
                      {
                        position: "LW",
                        abbreviation: "LW",
                        display_name: "Left Winger",
                        position_type: "P",
                      },
                      {
                        position: "RW",
                        abbreviation: "RW",
                        display_name: "Right Winger",
                        position_type: "P",
                      },
                      {
                        position: "W",
                        abbreviation: "W",
                        display_name: "Winger",
                        position_type: "P",
                      },
                      {
                        position: "F",
                        abbreviation: "F",
                        display_name: "Forward",
                        position_type: "P",
                      },
                      {
                        position: "D",
                        abbreviation: "D",
                        display_name: "Defenseman",
                        position_type: "P",
                      },
                      {
                        position: "Util",
                        abbreviation: "Util",
                        display_name: "Utility",
                        position_type: "P",
                      },
                      {
                        position: "G",
                        abbreviation: "G",
                        display_name: "Goalie",
                        position_type: "G",
                      },
                      {
                        position: "BN",
                        abbreviation: "BN",
                        display_name: "Bench",
                        is_bench: 1,
                      },
                      {
                        position: "IR",
                        abbreviation: "IR",
                        display_name: "Injured Reserve",
                        is_disabled_list: 1,
                      },
                      {
                        position: "IR+",
                        abbreviation: "IR+",
                        display_name: "IR or Day-to-Day",
                      },
                      {
                        position: "NA",
                        abbreviation: "NA",
                        display_name: "Not Active",
                      },
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

export default GameRosterPositions;
