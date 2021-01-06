import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const LeagueTeams = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [leagueKey, setLeagueKey] = useState(null);
  const [leagueKeyError, setLeagueKeyError] = useState(false);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === leagueKey) {
      return setLeagueKeyError(true);
    } else {
      setLeagueKeyError(false);
    }

    setLoading(true);

    const data = await api("/league/teams", {
      leagueKey,
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
      <h2 className={cx(appStyles.public, appStyles.private)}>league.teams</h2>
      <p>
        Retrieve information about the teams in a specific league. Users must be
        authenticated and a member of the league to query against private
        leagues.
      </p>
      <p>
        <em>
          Please note that in the sample output below, the user's nicknames are
          automatically marked as '--hidden--', if you are not authorized and/or
          not in the league.
        </em>
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
                league_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: leagueKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setLeagueKey, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                The key for the league you'd like to query. League key format:{" "}
                {`{game_key}.l.{league_id}`}
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {leagueKeyError && (
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
  const teams = await yf.league.teams(league_key);
} catch (e) {
  // handle error
}

// callback based
yf.league.teams(league_key, callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    league_key: "328.l.34014",
                    league_id: "34014",
                    name: "Freddy Beach Baseball",
                    url: "http://baseball.fantasysports.yahoo.com/b1/34014",
                    draft_status: "postdraft",
                    num_teams: 12,
                    edit_key: "2014-11-13",
                    weekly_deadline: "intraday",
                    league_update_timestamp: "1411979069",
                    scoring_type: "head",
                    league_type: "private",
                    renew: "308_51222",
                    renewed: "",
                    short_invitation_url:
                      "https://yho.com/mlb?l=34014&k=0a2bf56970bb200c",
                    is_pro_league: "0",
                    current_week: "25",
                    start_week: "1",
                    start_date: "2014-03-22",
                    end_week: "25",
                    end_date: "2014-09-28",
                    is_finished: 1,
                    teams: [
                      {
                        team_key: "328.l.34014.t.1",
                        team_id: "1",
                        name: "ChicksDigTheLongBall",
                        url:
                          "http://baseball.fantasysports.yahoo.com/b1/34014/1",
                        team_logo:
                          "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_6_lg.gif",
                        waiver_priority: 4,
                        number_of_moves: "19",
                        number_of_trades: 0,
                        clinched_playoffs: 1,
                        managers: [
                          {
                            manager_id: "1",
                            nickname: "--hidden--",
                            guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                            is_commissioner: "1",
                          },
                        ],
                      },
                      {
                        team_key: "328.l.34014.t.2",
                        team_id: "2",
                        name: "SALEBOAT",
                        url:
                          "http://baseball.fantasysports.yahoo.com/b1/34014/2",
                        team_logo: "https://i.imgur-ysports.com/k9xxNC8y.jpg",
                        waiver_priority: 8,
                        number_of_moves: "30",
                        number_of_trades: "2",
                        clinched_playoffs: 1,
                        managers: [
                          {
                            manager_id: "2",
                            nickname: "--hidden--",
                            guid: "APYOZ4FEZELDRTK3F3FEBYTDPY",
                          },
                        ],
                      },
                      {
                        team_key: "328.l.34014.t.3",
                        team_id: "3",
                        name: "Human Centipuig",
                        url:
                          "http://baseball.fantasysports.yahoo.com/b1/34014/3",
                        team_logo:
                          "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_1_lg.gif",
                        waiver_priority: 2,
                        number_of_moves: "21",
                        number_of_trades: 0,
                        clinched_playoffs: 1,
                        managers: [
                          {
                            manager_id: "3",
                            nickname: "--hidden--",
                            guid: "43VCZ4PSCQWJEKA2UEDRIZ65JQ",
                          },
                        ],
                      },
                      {
                        team_key: "328.l.34014.t.4",
                        team_id: "4",
                        name: "Jose Abreu",
                        url:
                          "http://baseball.fantasysports.yahoo.com/b1/34014/4",
                        team_logo:
                          "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_1_lg.gif",
                        waiver_priority: 10,
                        number_of_moves: "31",
                        number_of_trades: "1",
                        clinched_playoffs: 1,
                        managers: [
                          {
                            manager_id: "4",
                            nickname: "--hidden--",
                            guid: "JAJUZNSZORWFAP7UINDBTUWZ2A",
                          },
                        ],
                      },
                      {
                        team_key: "328.l.34014.t.5",
                        team_id: "5",
                        name: "The Beetle Bunch",
                        url:
                          "http://baseball.fantasysports.yahoo.com/b1/34014/5",
                        team_logo:
                          "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_11_lg.gif",
                        waiver_priority: 6,
                        number_of_moves: "31",
                        number_of_trades: "1",
                        clinched_playoffs: 1,
                        managers: [
                          {
                            manager_id: "5",
                            nickname: "--hidden--",
                            guid: "FI4ZS2L24CX4SD4F72MTL6O6QE",
                          },
                        ],
                      },
                      {
                        team_key: "328.l.34014.t.6",
                        team_id: "6",
                        name: "Deep In To The Night",
                        url:
                          "http://baseball.fantasysports.yahoo.com/b1/34014/6",
                        team_logo:
                          "http://l.yimg.com/dh/ap/fantasy/img/profile_96.png",
                        waiver_priority: 7,
                        number_of_moves: "30",
                        number_of_trades: "2",
                        managers: [
                          {
                            manager_id: "6",
                            nickname: "--hidden--",
                            guid: "GNNX2ZSNVAWRAWXNR7GSXGCXIY",
                          },
                        ],
                      },
                      {
                        team_key: "328.l.34014.t.7",
                        team_id: "7",
                        name: "TNTNT",
                        url:
                          "http://baseball.fantasysports.yahoo.com/b1/34014/7",
                        team_logo:
                          "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_1_lg.gif",
                        waiver_priority: 11,
                        number_of_moves: "31",
                        number_of_trades: "1",
                        clinched_playoffs: 1,
                        managers: [
                          {
                            manager_id: "7",
                            nickname: "--hidden--",
                            guid: "3TORY3MNIUTVTE4LGFNECRT4VA",
                          },
                        ],
                      },
                      {
                        team_key: "328.l.34014.t.8",
                        team_id: "8",
                        name: "Bronx Bombers",
                        url:
                          "http://baseball.fantasysports.yahoo.com/b1/34014/8",
                        team_logo:
                          "http://l.yimg.com/dh/ap/fantasy/img/profile_96.png",
                        waiver_priority: 5,
                        number_of_moves: "30",
                        number_of_trades: "4",
                        managers: [
                          {
                            manager_id: "8",
                            nickname: "--hidden--",
                            guid: "TFQ27G3QYLXC46WOKKFGSDX2JE",
                          },
                        ],
                      },
                      {
                        team_key: "328.l.34014.t.9",
                        team_id: "9",
                        name: "You Down With OBP?",
                        url:
                          "http://baseball.fantasysports.yahoo.com/b1/34014/9",
                        team_logo:
                          "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_1_lg.gif",
                        waiver_priority: 3,
                        number_of_moves: "19",
                        number_of_trades: "3",
                        managers: [
                          {
                            manager_id: "9",
                            nickname: "--hidden--",
                            guid: "S2YGZELAJVUBSWHGSXGKNTEBVQ",
                          },
                        ],
                      },
                      {
                        team_key: "328.l.34014.t.10",
                        team_id: "10",
                        name: "Jays of Thunder",
                        url:
                          "http://baseball.fantasysports.yahoo.com/b1/34014/10",
                        team_logo:
                          "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_4_lg.gif",
                        waiver_priority: 9,
                        number_of_moves: "30",
                        number_of_trades: "3",
                        clinched_playoffs: 1,
                        managers: [
                          {
                            manager_id: "10",
                            nickname: "--hidden--",
                            guid: "5DNOGI6CO6Y6GDZCRICACC6YFE",
                          },
                        ],
                      },
                      {
                        team_key: "328.l.34014.t.11",
                        team_id: "11",
                        name: "BaseOnBalls",
                        url:
                          "http://baseball.fantasysports.yahoo.com/b1/34014/11",
                        team_logo:
                          "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_12_lg.gif",
                        waiver_priority: 1,
                        number_of_moves: "29",
                        number_of_trades: 0,
                        clinched_playoffs: 1,
                        managers: [
                          {
                            manager_id: "11",
                            nickname: "--hidden--",
                            guid: "USBPVWVCNM4RNPGM4ZGZRQS7MQ",
                          },
                        ],
                      },
                      {
                        team_key: "328.l.34014.t.12",
                        team_id: "12",
                        name: "Nino Something",
                        url:
                          "http://baseball.fantasysports.yahoo.com/b1/34014/12",
                        team_logo:
                          "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_10_lg.gif",
                        waiver_priority: 12,
                        number_of_moves: "18",
                        number_of_trades: "1",
                        managers: [
                          {
                            manager_id: "12",
                            nickname: "--hidden--",
                            guid: "HF2I4HQA4LCNT7AHXJXWVEXOEQ",
                          },
                        ],
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

export default LeagueTeams;
