import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const PlayerPercentOwned = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [playerKey, setPlayerKey] = useState(null);
  const [playerKeyError, setPlayerKeyError] = useState(false);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === playerKey) {
      return setPlayerKeyError(true);
    } else {
      setPlayerKeyError(false);
    }

    setLoading(true);

    const data = await api("/player/percent_owned", {
      playerKey,
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
      <h2 className={appStyles.public}>player.percent_owned</h2>
      <p>Retrieve data about ownership percentage of a player.</p>

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
                player_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: playerKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setPlayerKey, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                The key for the player you'd like to query. Player key format:{" "}
                {`{game_key}.p.{player_id}`}
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {playerKeyError && (
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
  const percent_owned = yf.player.percent_owned(player_key);
} catch (e) {
  // handle error
}

// callback based
yf.player.percent_owned(player_key, callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    player_key: "328.p.6619",
                    player_id: "6619",
                    name: {
                      full: "Albert Pujols",
                      first: "Albert",
                      last: "Pujols",
                      ascii_first: "Albert",
                      ascii_last: "Pujols",
                    },
                    editorial_player_key: "mlb.p.6619",
                    editorial_team_key: "mlb.t.3",
                    editorial_team_full_name: "Los Angeles Angels",
                    editorial_team_abbr: "LAA",
                    uniform_number: "5",
                    display_position: "1B",
                    headshot:
                      "http://l.yimg.com/iu/api/res/1.2/iium.CfIaaN.XDy7fB4Reg--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/6619.1.jpg",
                    is_undroppable: "0",
                    position_type: "B",
                    eligible_positions: ["1B", "CI", "DH", "IF"],
                    ownership: { value: 98 },
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

export default PlayerPercentOwned;
