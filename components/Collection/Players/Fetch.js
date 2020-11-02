import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const LeaguesFetch = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [playerKey, setPlayerKey] = useState(null);
  const [playerKeyError, setPlayerKeyError] = useState(false);

  const [subresources, setSubresources] = useState([]);

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

    const data = await api("/leagues/fetch", {
      playerKey,
      subresources,
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

  const updateSubresources = (key) => {
    const idx = subresources.findIndex((k) => k === key);

    if (idx > 0) {
      const newSubs = subresources;
      newSubs.splice(idx, 1);
      setSubresources([...newSubs]);
    } else {
      setSubresources([...subresources, key]);
    }
  };

  return (
    <>
      <h2 className={cx(appStyles.public, appStyles.private)}>players.fetch</h2>
      <p>Retrieve information about multiple players in a single request.</p>

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
                The key(s) for the player(s) you'd like to query. League key
                format: {`{game_key}.p.{player_id}`}
              </div>
            </div>
          </div>

          <div className={cx(appStyles.table, appStyles.subresource)}>
            <div className={cx(appStyles.header, appStyles.row)}>
              <div>Subresource</div>
              {activeTab === "tester" && <div>Select</div>}
              <div>Description</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                stats
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("stats")}
                  ></input>
                </div>
              )}
              <div>Retrieve the stats for the retrieved players.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                ownership
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("ownership")}
                  ></input>
                </div>
              )}
              <div>Retrieve the ownership for the retrieved players.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                percent_owned
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("percent_owned")}
                  ></input>
                </div>
              )}
              <div>Retrieve the percent_owned for the retrieved players.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                draft_analysis
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("draft_analysis")}
                  ></input>
                </div>
              )}
              <div>Retrieve the draft_analysis for the retrieved players.</div>
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
  const players = yf.players.fetch(
    [player_keys],
    [subresources], // optional
  );
} catch (e) {
  // handle error
}

// callback based
yf.players.fetch(
  [player_keys], 
  [subresources], // optional
  callbackFn
);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  [
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
                    },
                    {
                      player_key: "341.p.3985",
                      player_id: "3985",
                      name: {
                        full: "Joe Pavelski",
                        first: "Joe",
                        last: "Pavelski",
                        ascii_first: "Joe",
                        ascii_last: "Pavelski",
                      },
                      editorial_player_key: "nhl.p.3985",
                      editorial_team_key: "nhl.t.18",
                      editorial_team_full_name: "San Jose Sharks",
                      editorial_team_abbr: "SJ",
                      uniform_number: "8",
                      display_position: "C,LW,RW",
                      headshot:
                        "http://l.yimg.com/iu/api/res/1.2/Dd5dNYTipp8s2GCFVkEnuA--/YXBwaWQ9eXZpZGVvO…0Ng--/http://l.yimg.com/j/assets/i/us/sp/v/nhl/players_l/20130211/3985.jpg",
                      is_undroppable: "0",
                      position_type: "P",
                      eligible_positions: ["C", "LW", "RW"],
                    },
                  ],
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

export default LeaguesFetch;
