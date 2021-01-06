import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const TransactionPlayers = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [transactionKey, setTransactionKey] = useState(null);
  const [transactionKeyError, setTransactionKeyError] = useState(false);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === transactionKey) {
      return setTransactionKeyError(true);
    } else {
      setTransactionKeyError(false);
    }

    setLoading(true);

    const data = await api("/transaction/players", {
      transactionKey,
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
      <h2 className={cx(appStyles.public, appStyles.private)}>
        transaction.players
      </h2>
      <p>
        Retrieve basic information about a transaction. Users must be
        authenticated and a member of the league to query against teams of
        private leagues. Users may not be able to access transactions for
        privacy reasons (ie/ waiver claims)
      </p>
      <p>Can also be accessed by using the transaction.meta method.</p>

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
                team_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: transactionKeyError,
                    })}
                    type="text"
                    onChange={(e) =>
                      updateInput(setTransactionKey, e.target.value)
                    }
                  ></input>
                </div>
              )}
              <div>
                The key for the transaction you'd like to query. Team key
                format: {`{game_key}.l.{league_id}.tr.{transaction_id}`}
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {transactionKeyError && (
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
  const players = await yf.transaction.players(transaction_key);
} catch (e) {
  // handle error
}

// callback based
yf.transaction.players(transaction_key, callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    transaction_key: "328.l.34014.tr.237",
                    transaction_id: "237",
                    type: "add/drop",
                    status: "successful",
                    timestamp: "1406292531",
                    players: [
                      {
                        player_key: "328.p.9147",
                        player_id: "9147",
                        name: {
                          full: "Stephen Vogt",
                          first: "Stephen",
                          last: "Vogt",
                          ascii_first: "Stephen",
                          ascii_last: "Vogt",
                        },
                        editorial_team_abbr: "Oak",
                        display_position: "C,1B,OF",
                        position_type: "B",
                        transaction_data: {
                          type: "add",
                          source_type: "freeagents",
                          destination_type: "team",
                          destination_team_key: "328.l.34014.t.1",
                          destination_team_name: "ChicksDigTheLongBall",
                        },
                      },
                      {
                        player_key: "328.p.7865",
                        player_id: "7865",
                        name: {
                          full: "Miguel Montero",
                          first: "Miguel",
                          last: "Montero",
                          ascii_first: "Miguel",
                          ascii_last: "Montero",
                        },
                        editorial_team_abbr: "Ari",
                        display_position: "C",
                        position_type: "B",
                        transaction_data: {
                          type: "drop",
                          source_type: "team",
                          source_team_key: "328.l.34014.t.1",
                          source_team_name: "ChicksDigTheLongBall",
                          destination_type: "waivers",
                        },
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

export default TransactionPlayers;
