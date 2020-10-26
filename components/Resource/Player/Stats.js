import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const PlayerStats = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [playerKey, setPlayerKey] = useState(null);
  const [playerKeyError, setPlayerKeyError] = useState(false);

  const [week, setWeek] = useState(null);

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

    const data = await api("/player/stats", {
      playerKey,
      week,
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
      <h2 className={appStyles.public}>player.stats</h2>
      <p>
        Retrieve player stats. If you're only looking for the player's stats for
        a given week, you can optionally specify a week number. If no week
        number is specified, you'll get the full-season stats.
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
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg)}>week</div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: playerKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setWeek, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                The week number you'd like the stats for, if no week specified
                you'll get the full season statistical information.
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
  const stats = yf.player.stats(
    player_key,
    week // optional
  );
} catch (e) {
  // handle error
}

// callback based
yf.player.stats(
  player_key, 
  week, // optional
  callbackFn
);`}</CodeBlock>
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
                    stats: {
                      coverage_type: "season",
                      coverage_value: "2014",
                      stats: [
                        { stat_id: "0", value: "159" },
                        { stat_id: "1", value: "159" },
                        { stat_id: "2", value: "-" },
                        { stat_id: "6", value: "633" },
                        { stat_id: "7", value: "89" },
                        { stat_id: "8", value: "172" },
                        { stat_id: "9", value: "106" },
                        { stat_id: "10", value: "37" },
                        { stat_id: "11", value: "1" },
                        { stat_id: "12", value: "28" },
                        { stat_id: "13", value: "105" },
                        { stat_id: "14", value: "0" },
                        { stat_id: "15", value: "9" },
                        { stat_id: "16", value: "5" },
                        { stat_id: "17", value: "1" },
                        { stat_id: "18", value: "48" },
                        { stat_id: "19", value: "11" },
                        { stat_id: "20", value: "5" },
                        { stat_id: "21", value: "71" },
                        { stat_id: "22", value: "28" },
                        { stat_id: "23", value: "295" },
                        { stat_id: "51", value: "879" },
                        { stat_id: "52", value: "81" },
                        { stat_id: "53", value: "3" },
                        { stat_id: "54", value: ".997" },
                        { stat_id: "3", value: ".272" },
                        { stat_id: "4", value: ".324" },
                        { stat_id: "5", value: ".466" },
                        { stat_id: "55", value: ".790" },
                        { stat_id: "58", value: "-" },
                        { stat_id: "59", value: "-" },
                        { stat_id: "61", value: "66" },
                        { stat_id: "62", value: "4" },
                        { stat_id: "63", value: ".833" },
                        { stat_id: "64", value: "-" },
                        { stat_id: "65", value: "695" },
                        { stat_id: "66", value: "-" },
                        { stat_id: "86", value: "0" },
                        { stat_id: "87", value: "78" },
                        { stat_id: "88", value: "0" },
                      ],
                    },
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

export default PlayerStats;
