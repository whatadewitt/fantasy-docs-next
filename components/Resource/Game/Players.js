import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const GamePlayers = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [gameKey, setGameKey] = useState(null);
  const [gameKeyError, setGameKeyError] = useState(false);

  const [playerKeys, setPlayerKeys] = useState(null);
  const [playerKeysError, setPlayerKeysError] = useState(false);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === gameKey) {
      setGameKeyError(true);
    } else {
      setGameKeyError(false);
    }

    if (null === playerKeys) {
      setPlayerKeysError(true);
    } else {
      setPlayerKeysError(false);
    }

    // because of hooks...
    if (null === playerKeys || null === gameKey) {
      return;
    }

    setLoading(true);

    // TODO: multiple keys...
    const data = await api("/game/players", {
      gameKey,
      playerKeys,
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
      <h2 className={cx(appStyles.public)}>game.players</h2>
      <p>Retrieve information about a player or players.</p>
      <p>You can use this subresource to query game eligible players.</p>
      <p>
        You can specify either a single player id, or an array of player id's to
        return multiple leagues from the same game.
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
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.required)}>
                player_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: playerKeysError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setPlayerKeys, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                Key(s) of the player(s) you'd like to retrieve. Player key
                format: {`{game_key}.p.{player_id}`}. For the purposes of this
                demo, you can enter a comma separated list of player keys for
                the array.
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {(gameKeyError || playerKeysError) && (
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
  const players = await yf.game.players(game_key, player_key(s));
} catch (e) {
  // handle error
}

// callback based
yf.game.players(game_key, player_key(s), callbackFn);`}</CodeBlock>
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
                    players: [
                      {
                        player_key: "328.p.8861",
                        player_id: "8861",
                        name: {
                          full: "Mike Trout",
                          first: "Mike",
                          last: "Trout",
                          ascii_first: "Mike",
                          ascii_last: "Trout",
                        },
                        editorial_player_key: "mlb.p.8861",
                        editorial_team_key: "mlb.t.3",
                        editorial_team_full_name: "Los Angeles Angels",
                        editorial_team_abbr: "LAA",
                        uniform_number: "27",
                        display_position: "OF",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/mf1klpjytL0QlhrnXzz3PA--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/8861.1.jpg",
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["CF", "DH", "LF", "OF"],
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

export default GamePlayers;
