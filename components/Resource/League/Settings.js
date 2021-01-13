import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const LeagueSettings = () => {
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

    const data = await api("/league/settings", {
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
      <h2 className={cx(appStyles.public, appStyles.private)}>
        league.settings
      </h2>
      <p>
        Subresource to provide data regarding league settings. For instance,
        draft type, scoring type, roster positions, stat categories and
        modifiers, divisions. Users must be authenticated and a member of the
        league to query against private leagues.
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
  const settings = await yf.league.settings(league_key);
} catch (e) {
  // handle error
}

// callback based
yf.league.settings(league_key, callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    draft_type: "live",
                    is_auction_draft: "1",
                    scoring_type: "head",
                    persistent_url:
                      "http://baseball.fantasysports.yahoo.com/league/freddybaseball",
                    uses_playoff: "1",
                    has_playoff_consolation_games: true,
                    playoff_start_week: "23",
                    uses_playoff_reseeding: 0,
                    uses_lock_eliminated_teams: 0,
                    num_playoff_teams: "8",
                    num_playoff_consolation_teams: 0,
                    uses_roster_import: "1",
                    roster_import_deadline: "2014-03-06",
                    waiver_type: "R",
                    waiver_rule: "all",
                    uses_faab: "0",
                    draft_time: "1395361800",
                    post_draft_players: "W",
                    max_teams: "12",
                    waiver_time: "2",
                    trade_end_date: "2014-08-17",
                    trade_ratify_type: "commish",
                    trade_reject_time: "2",
                    player_pool: "ALL",
                    cant_cut_list: "yahoo",
                    is_publicly_viewable: "1",
                    roster_positions: [
                      { position: "C", position_type: "B", count: 1 },
                      { position: "1B", position_type: "B", count: 1 },
                      { position: "2B", position_type: "B", count: 1 },
                      { position: "3B", position_type: "B", count: 1 },
                      { position: "SS", position_type: "B", count: 1 },
                      { position: "OF", position_type: "B", count: 3 },
                      { position: "Util", position_type: "B", count: 1 },
                      { position: "SP", position_type: "P", count: 4 },
                      { position: "RP", position_type: "P", count: 2 },
                      { position: "BN", count: 5 },
                      { position: "DL", count: "2" },
                    ],
                    stat_categories: [
                      {
                        stat_id: 60,
                        enabled: "1",
                        name: "H/AB",
                        display_name: "H/AB",
                        sort_order: "1",
                        position_type: "B",
                        stat_position_types: [
                          { position_type: "B", is_only_display_stat: "1" },
                        ],
                        is_only_display_stat: "1",
                      },
                      {
                        stat_id: 7,
                        enabled: "1",
                        name: "Runs",
                        display_name: "R",
                        sort_order: "1",
                        position_type: "B",
                        stat_position_types: [{ position_type: "B" }],
                      },
                      {
                        stat_id: 12,
                        enabled: "1",
                        name: "Home Runs",
                        display_name: "HR",
                        sort_order: "1",
                        position_type: "B",
                        stat_position_types: [{ position_type: "B" }],
                      },
                      {
                        stat_id: 13,
                        enabled: "1",
                        name: "Runs Batted In",
                        display_name: "RBI",
                        sort_order: "1",
                        position_type: "B",
                        stat_position_types: [{ position_type: "B" }],
                      },
                      {
                        stat_id: 16,
                        enabled: "1",
                        name: "Stolen Bases",
                        display_name: "SB",
                        sort_order: "1",
                        position_type: "B",
                        stat_position_types: [{ position_type: "B" }],
                      },
                      {
                        stat_id: 3,
                        enabled: "1",
                        name: "Batting Average",
                        display_name: "AVG",
                        sort_order: "1",
                        position_type: "B",
                        stat_position_types: [{ position_type: "B" }],
                      },
                      {
                        stat_id: 50,
                        enabled: "1",
                        name: "Innings Pitched",
                        display_name: "IP",
                        sort_order: "1",
                        position_type: "P",
                        stat_position_types: [
                          { position_type: "P", is_only_display_stat: "1" },
                        ],
                        is_only_display_stat: "1",
                      },
                      {
                        stat_id: 28,
                        enabled: "1",
                        name: "Wins",
                        display_name: "W",
                        sort_order: "1",
                        position_type: "P",
                        stat_position_types: [{ position_type: "P" }],
                      },
                      {
                        stat_id: 32,
                        enabled: "1",
                        name: "Saves",
                        display_name: "SV",
                        sort_order: "1",
                        position_type: "P",
                        stat_position_types: [{ position_type: "P" }],
                      },
                      {
                        stat_id: 42,
                        enabled: "1",
                        name: "Strikeouts",
                        display_name: "K",
                        sort_order: "1",
                        position_type: "P",
                        stat_position_types: [{ position_type: "P" }],
                      },
                      {
                        stat_id: 26,
                        enabled: "1",
                        name: "Earned Run Average",
                        display_name: "ERA",
                        sort_order: "0",
                        position_type: "P",
                        stat_position_types: [{ position_type: "P" }],
                      },
                      {
                        stat_id: 27,
                        enabled: "1",
                        name: "(Walks + Hits)/ Innings Pitched",
                        display_name: "WHIP",
                        sort_order: "0",
                        position_type: "P",
                        stat_position_types: [{ position_type: "P" }],
                      },
                    ],
                    max_adds: "31",
                    season_type: "full",
                    min_innings_pitched: "30",
                    league: {
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

export default LeagueSettings;
