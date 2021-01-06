import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const TeamsLeague = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [leagueKey, setLeagueKey] = useState(null);
  const [leagueKeyError, setLeagueKeyError] = useState(false);

  const [subresources, setSubresources] = useState([]);

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

    const data = await api("/teams/leagues", {
      leagueKey,
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

    if (idx >= 0) {
      const newSubs = subresources;
      newSubs.splice(idx, 1);
      setSubresources([...newSubs]);
    } else {
      setSubresources([...subresources, key]);
    }
  };

  return (
    <>
      <h2 className={cx(appStyles.public, appStyles.private)}>teams.leagues</h2>
      <p>
        Retrieve information about multiple teams across league(s) in a single
        request.
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
                Key(s) for the league(s) you want to query. League key format:{" "}
                {`{game_key}.l.{league_id}`}
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
              <div>Retrieve the stats for the retrieved teams.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                standings
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("standings")}
                  ></input>
                </div>
              )}
              <div>Retrieve the standings for the retrieved teams.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                roster
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("roster")}
                  ></input>
                </div>
              )}
              <div>Retrieve the rosters for the retrieved teams.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                draftresults
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("draftresults")}
                  ></input>
                </div>
              )}
              <div>
                Retrieve the draftresults for the retrieved teams.{" "}
                <em>
                  (note the difference between the naming here versus that of
                  the league resource)
                </em>
              </div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                matchups
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("matchups")}
                  ></input>
                </div>
              )}
              <div>Retrieve the matchups for the retrieved teams.</div>
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
  const teams = await yf.teams.leagues(
    [league_keys],
    [subresources], // optional
  );
} catch (e) {
  // handle error
}

// callback based
yf.teams.league(
  [league_keys], 
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
                      league_key: "328.l.34014",
                      league_id: "34014",
                      name: "Freddy Beach Baseball",
                      url:
                        "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014",
                      league_chat_id: "",
                      draft_status: "postdraft",
                      num_teams: 12,
                      edit_key: "2015-02-04",
                      weekly_deadline: "intraday",
                      league_update_timestamp: "1411979069",
                      scoring_type: "head",
                      league_type: "private",
                      renew: "308_51222",
                      renewed: "346_1106",
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
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/1",
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
                          stats: {
                            coverage_type: "season",
                            season: "2014",
                            stats: [
                              { stat_id: "60", value: "" },
                              { stat_id: "7", value: "676" },
                              { stat_id: "12", value: "126" },
                              { stat_id: "13", value: "623" },
                              { stat_id: "16", value: "126" },
                              { stat_id: "3", value: ".275" },
                              { stat_id: "50", value: "1555.0" },
                              { stat_id: "28", value: "101" },
                              { stat_id: "32", value: "67" },
                              { stat_id: "42", value: "1264" },
                              { stat_id: "26", value: "3.56" },
                              { stat_id: "27", value: "1.20" },
                            ],
                          },
                        },
                        {
                          team_key: "328.l.34014.t.2",
                          team_id: "2",
                          name: "SALEBOAT",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/2",
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
                          stats: {
                            coverage_type: "season",
                            season: "2014",
                            stats: [
                              { stat_id: "60", value: "" },
                              { stat_id: "7", value: "629" },
                              { stat_id: "12", value: "142" },
                              { stat_id: "13", value: "603" },
                              { stat_id: "16", value: "137" },
                              { stat_id: "3", value: ".273" },
                              { stat_id: "50", value: "1400.1" },
                              { stat_id: "28", value: "81" },
                              { stat_id: "32", value: "77" },
                              { stat_id: "42", value: "1324" },
                              { stat_id: "26", value: "3.21" },
                              { stat_id: "27", value: "1.16" },
                            ],
                          },
                        },
                        {
                          team_key: "328.l.34014.t.3",
                          team_id: "3",
                          name: "Human Centipuig",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/3",
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
                          stats: {
                            coverage_type: "season",
                            season: "2014",
                            stats: [
                              { stat_id: "60", value: "" },
                              { stat_id: "7", value: "707" },
                              { stat_id: "12", value: "134" },
                              { stat_id: "13", value: "620" },
                              { stat_id: "16", value: "110" },
                              { stat_id: "3", value: ".258" },
                              { stat_id: "50", value: "1418.1" },
                              { stat_id: "28", value: "91" },
                              { stat_id: "32", value: "70" },
                              { stat_id: "42", value: "1373" },
                              { stat_id: "26", value: "3.38" },
                              { stat_id: "27", value: "1.22" },
                            ],
                          },
                        },
                        {
                          team_key: "328.l.34014.t.4",
                          team_id: "4",
                          name: "Jose Abreu",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/4",
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
                          stats: {
                            coverage_type: "season",
                            season: "2014",
                            stats: [
                              { stat_id: "60", value: "" },
                              { stat_id: "7", value: "736" },
                              { stat_id: "12", value: "182" },
                              { stat_id: "13", value: "681" },
                              { stat_id: "16", value: "171" },
                              { stat_id: "3", value: ".278" },
                              { stat_id: "50", value: "1618.0" },
                              { stat_id: "28", value: "111" },
                              { stat_id: "32", value: "92" },
                              { stat_id: "42", value: "1523" },
                              { stat_id: "26", value: "3.27" },
                              { stat_id: "27", value: "1.18" },
                            ],
                          },
                        },
                        {
                          team_key: "328.l.34014.t.5",
                          team_id: "5",
                          name: "The Beetle Bunch",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/5",
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
                          stats: {
                            coverage_type: "season",
                            season: "2014",
                            stats: [
                              { stat_id: "60", value: "" },
                              { stat_id: "7", value: "673" },
                              { stat_id: "12", value: "169" },
                              { stat_id: "13", value: "640" },
                              { stat_id: "16", value: "79" },
                              { stat_id: "3", value: ".258" },
                              { stat_id: "50", value: "1696.2" },
                              { stat_id: "28", value: "115" },
                              { stat_id: "32", value: "82" },
                              { stat_id: "42", value: "1569" },
                              { stat_id: "26", value: "3.19" },
                              { stat_id: "27", value: "1.17" },
                            ],
                          },
                        },
                        {
                          team_key: "328.l.34014.t.6",
                          team_id: "6",
                          name: "Deep In To The Night",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/6",
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
                          stats: {
                            coverage_type: "season",
                            season: "2014",
                            stats: [
                              { stat_id: "60", value: "" },
                              { stat_id: "7", value: "658" },
                              { stat_id: "12", value: "137" },
                              { stat_id: "13", value: "612" },
                              { stat_id: "16", value: "63" },
                              { stat_id: "3", value: ".273" },
                              { stat_id: "50", value: "1356.0" },
                              { stat_id: "28", value: "85" },
                              { stat_id: "32", value: "64" },
                              { stat_id: "42", value: "1116" },
                              { stat_id: "26", value: "3.67" },
                              { stat_id: "27", value: "1.24" },
                            ],
                          },
                        },
                        {
                          team_key: "328.l.34014.t.7",
                          team_id: "7",
                          name: "TNTNT",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/7",
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
                          stats: {
                            coverage_type: "season",
                            season: "2014",
                            stats: [
                              { stat_id: "60", value: "" },
                              { stat_id: "7", value: "741" },
                              { stat_id: "12", value: "186" },
                              { stat_id: "13", value: "732" },
                              { stat_id: "16", value: "102" },
                              { stat_id: "3", value: ".270" },
                              { stat_id: "50", value: "1529.0" },
                              { stat_id: "28", value: "90" },
                              { stat_id: "32", value: "81" },
                              { stat_id: "42", value: "1308" },
                              { stat_id: "26", value: "3.60" },
                              { stat_id: "27", value: "1.21" },
                            ],
                          },
                        },
                        {
                          team_key: "328.l.34014.t.8",
                          team_id: "8",
                          name: "Bronx Bombers",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/8",
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
                          stats: {
                            coverage_type: "season",
                            season: "2014",
                            stats: [
                              { stat_id: "60", value: "" },
                              { stat_id: "7", value: "697" },
                              { stat_id: "12", value: "157" },
                              { stat_id: "13", value: "667" },
                              { stat_id: "16", value: "104" },
                              { stat_id: "3", value: ".276" },
                              { stat_id: "50", value: "1385.2" },
                              { stat_id: "28", value: "71" },
                              { stat_id: "32", value: "79" },
                              { stat_id: "42", value: "1133" },
                              { stat_id: "26", value: "3.81" },
                              { stat_id: "27", value: "1.25" },
                            ],
                          },
                        },
                        {
                          team_key: "328.l.34014.t.9",
                          team_id: "9",
                          name: "You Down With OBP?",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/9",
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
                          stats: {
                            coverage_type: "season",
                            season: "2014",
                            stats: [
                              { stat_id: "60", value: "" },
                              { stat_id: "7", value: "639" },
                              { stat_id: "12", value: "144" },
                              { stat_id: "13", value: "648" },
                              { stat_id: "16", value: "67" },
                              { stat_id: "3", value: ".260" },
                              { stat_id: "50", value: "1428.2" },
                              { stat_id: "28", value: "78" },
                              { stat_id: "32", value: "85" },
                              { stat_id: "42", value: "1322" },
                              { stat_id: "26", value: "3.55" },
                              { stat_id: "27", value: "1.22" },
                            ],
                          },
                        },
                        {
                          team_key: "328.l.34014.t.10",
                          team_id: "10",
                          name: "Jays of Thunder",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/10",
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
                          stats: {
                            coverage_type: "season",
                            season: "2014",
                            stats: [
                              { stat_id: "60", value: "" },
                              { stat_id: "7", value: "762" },
                              { stat_id: "12", value: "205" },
                              { stat_id: "13", value: "711" },
                              { stat_id: "16", value: "71" },
                              { stat_id: "3", value: ".270" },
                              { stat_id: "50", value: "1625.1" },
                              { stat_id: "28", value: "87" },
                              { stat_id: "32", value: "69" },
                              { stat_id: "42", value: "1468" },
                              { stat_id: "26", value: "3.84" },
                              { stat_id: "27", value: "1.26" },
                            ],
                          },
                        },
                        {
                          team_key: "328.l.34014.t.11",
                          team_id: "11",
                          name: "BaseOnBalls",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/11",
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
                          stats: {
                            coverage_type: "season",
                            season: "2014",
                            stats: [
                              { stat_id: "60", value: "" },
                              { stat_id: "7", value: "742" },
                              { stat_id: "12", value: "188" },
                              { stat_id: "13", value: "729" },
                              { stat_id: "16", value: "99" },
                              { stat_id: "3", value: ".272" },
                              { stat_id: "50", value: "1316.0" },
                              { stat_id: "28", value: "90" },
                              { stat_id: "32", value: "65" },
                              { stat_id: "42", value: "1257" },
                              { stat_id: "26", value: "3.34" },
                              { stat_id: "27", value: "1.22" },
                            ],
                          },
                        },
                        {
                          team_key: "328.l.34014.t.12",
                          team_id: "12",
                          name: "Nino Something",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/12",
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
                          stats: {
                            coverage_type: "season",
                            season: "2014",
                            stats: [
                              { stat_id: "60", value: "" },
                              { stat_id: "7", value: "591" },
                              { stat_id: "12", value: "164" },
                              { stat_id: "13", value: "660" },
                              { stat_id: "16", value: "83" },
                              { stat_id: "3", value: ".259" },
                              { stat_id: "50", value: "1154.2" },
                              { stat_id: "28", value: "78" },
                              { stat_id: "32", value: "76" },
                              { stat_id: "42", value: "1033" },
                              { stat_id: "26", value: "3.07" },
                              { stat_id: "27", value: "1.14" },
                            ],
                          },
                        },
                      ],
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

export default TeamsLeague;
