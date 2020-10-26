import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const UserGames = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [err, setErr] = useState(false);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    // TODO: make sure user is logged in...

    setLoading(true);

    const data = await api("/user/games");

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
      <h2 className={cx(appStyles.public, appStyles.private)}>user.games</h2>
      <p>
        Retrieve basic information about a transaction. Users must be
        authenticated in order to use this endpoint.</p>

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
              <div>
                No parameters are required, but users must be authenticated in
                order to retrieve user data.
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {err && (
                <div className={appStyles.err}>
                  Please make sure you've authenticated in order to test this
                  resource
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
  const players = yf.user.games();
} catch (e) {
  // handle error
}

// callback based
yf.user.games(callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify({"guid":"RYWP7M53IC626MGOX36ZWCM4FA","games":[{"game_key":"49","game_id":"49","name":"Football","code":"nfl","type":"full","url":null,"season":"2002"},{"game_key":"63","game_id":"63","name":"Pro Football Pick'em","code":"nflp","type":"pickem-group","url":null,"season":"2002"},{"game_key":"64","game_id":"64","name":"Hockey","code":"nhl","type":"full","url":null,"season":"2002"},{"game_key":"79","game_id":"79","name":"Football","code":"nfl","type":"full","url":null,"season":"2003"},{"game_key":"91","game_id":"91","name":"Pro Football Pick'em","code":"nflp","type":"pickem-group","url":null,"season":"2003"},{"game_key":"94","game_id":"94","name":"Hockey","code":"nhl","type":"full","url":null,"season":"2003"},{"game_key":"93","game_id":"93","name":"Survival Football","code":"nfls","type":"pickem-group","url":null,"season":"2003"},{"game_key":"95","game_id":"95","name":"Basketball","code":"nba","type":"full","url":null,"season":"2003"},{"game_key":"98","game_id":"98","name":"Baseball","code":"mlb","type":"full","url":null,"season":"2004"},{"game_key":"101","game_id":"101","name":"Football","code":"nfl","type":"full","url":null,"season":"2004"},{"game_key":"105","game_id":"105","name":"Pro Football Pick'em","code":"nflp","type":"pickem-group","url":null,"season":"2004"},{"game_key":"103","game_id":"103","name":"Survival Football","code":"nfls","type":"pickem-group","url":null,"season":"2004"},{"game_key":"113","game_id":"113","name":"Baseball","code":"mlb","type":"full","url":"http://baseball.fantasysports.yahoo.com/b1","season":"2005"},{"game_key":"130","game_id":"130","name":"Hockey","code":"nhl","type":"full","url":"http://hockey.fantasysports.yahoo.com/hockey","season":"2005"},{"game_key":"124","game_id":"124","name":"Football","code":"nfl","type":"full","url":"http://football.fantasysports.yahoo.com/f1","season":"2005"},{"game_key":"126","game_id":"126","name":"Pro Football Pick'em","code":"nflp","type":"pickem-group","url":"http://football.fantasysports.yahoo.com/pickem","season":"2005"},{"game_key":"123","game_id":"123","name":"Survival Football","code":"nfls","type":"pickem-group","url":"http://football.fantasysports.yahoo.com/survival","season":"2005"},{"game_key":"147","game_id":"147","name":"Baseball","code":"mlb","type":"full","url":"http://baseball.fantasysports.yahoo.com/b1","season":"2006"},{"game_key":"164","game_id":"164","name":"Hockey","code":"nhl","type":"full","url":"http://hockey.fantasysports.yahoo.com/hockey","season":"2006"},{"game_key":"153","game_id":"153","name":"Football","code":"nfl","type":"full","url":"http://football.fantasysports.yahoo.com/f1","season":"2006"},{"game_key":"157","game_id":"157","name":"Survival Football","code":"nfls","type":"pickem-group","url":"http://football.fantasysports.yahoo.com/survival","season":"2006"},{"game_key":"155","game_id":"155","name":"Pro Football Pick'em","code":"nflp","type":"pickem-group","url":"http://football.fantasysports.yahoo.com/pickem","season":"2006"},{"game_key":"171","game_id":"171","name":"Baseball","code":"mlb","type":"full","url":"http://baseball.fantasysports.yahoo.com/b1","season":"2007"},{"game_key":"185","game_id":"185","name":"Survival Football","code":"nfls","type":"pickem-group","url":"http://football.fantasysports.yahoo.com/survival","season":"2007"},{"game_key":"182","game_id":"182","name":"Pro Football Pick'em","code":"nflp","type":"pickem-group","url":"http://football.fantasysports.yahoo.com/pickem","season":"2007"},{"game_key":"184","game_id":"184","name":"Salary Cap Football","code":"nflc","type":"pickem-team","url":"http://football.fantasysports.yahoo.com/salcap","season":"2007"},{"game_key":"195","game_id":"195","name":"Baseball","code":"mlb","type":"full","url":"http://baseball.fantasysports.yahoo.com/b1","season":"2008"},{"game_key":"206","game_id":"206","name":"Survival Football","code":"nfls","type":"pickem-group","url":"http://football.fantasysports.yahoo.com/survival","season":"2008"},{"game_key":"201","game_id":"201","name":"Pro Football Pick'em","code":"nflp","type":"pickem-group","url":"http://football.fantasysports.yahoo.com/pickem","season":"2008"},{"game_key":"210","game_id":"210","name":"Hockey","code":"nhl","type":"full","url":"http://hockey.fantasysports.yahoo.com/hockey","season":"2008"},{"game_key":"215","game_id":"215","name":"Baseball","code":"mlb","type":"full","url":"http://baseball.fantasysports.yahoo.com/b1","season":"2009"},{"game_key":"226","game_id":"226","name":"Survival Football","code":"nfls","type":"pickem-group","url":"http://football.fantasysports.yahoo.com/survival","season":"2009"},{"game_key":"233","game_id":"233","name":"Hockey","code":"nhl","type":"full","url":"http://hockey.fantasysports.yahoo.com/hockey","season":"2009"},{"game_key":"238","game_id":"238","name":"Baseball","code":"mlb","type":"full","url":"http://baseball.fantasysports.yahoo.com/b1","season":"2010"},{"game_key":"248","game_id":"248","name":"Hockey","code":"nhl","type":"full","url":"http://hockey.fantasysports.yahoo.com/hockey","season":"2010"},{"game_key":"249","game_id":"249","name":"Basketball","code":"nba","type":"full","url":"http://basketball.fantasysports.yahoo.com/nba","season":"2010"},{"game_key":"253","game_id":"253","name":"Baseball","code":"mlb","type":"full","url":"http://baseball.fantasysports.yahoo.com/b1","season":"2011"},{"game_key":"268","game_id":"268","name":"Baseball","code":"mlb","type":"full","url":"http://baseball.fantasysports.yahoo.com/b1","season":"2012"},{"game_key":"273","game_id":"273","name":"Football","code":"nfl","type":"full","url":"http://football.fantasysports.yahoo.com/f1","season":"2012"},{"game_key":"308","game_id":"308","name":"Baseball","code":"mlb","type":"full","url":"http://baseball.fantasysports.yahoo.com/b1","season":"2013"},{"game_key":"314","game_id":"314","name":"Football","code":"nfl","type":"full","url":"http://football.fantasysports.yahoo.com/f1","season":"2013"},{"game_key":"321","game_id":"321","name":"Hockey","code":"nhl","type":"full","url":"http://hockey.fantasysports.yahoo.com/hockey","season":"2013"},{"game_key":"328","game_id":"328","name":"Baseball","code":"mlb","type":"full","url":"http://baseball.fantasysports.yahoo.com/b1","season":"2014"},{"game_key":"341","game_id":"341","name":"Hockey","code":"nhl","type":"full","url":"http://hockey.fantasysports.yahoo.com/hockey","season":"2014"}]}, null, 2)}
              </CodeBlock>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserGames;
