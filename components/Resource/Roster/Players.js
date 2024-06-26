import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const RosterPlayers = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [teamKey, setTeamKey] = useState(null);
  const [teamKeyError, setTeamKeyError] = useState(false);

  const [date, setDate] = useState(null);
  const [subresource, setSubresource] = useState(null);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === teamKey) {
      return setTeamKeyError(true);
    } else {
      setTeamKeyError(false);
    }

    setLoading(true);

    const data = await api("/roster/players", {
      teamKey,
      date,
      subresource,
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
        roster.players
      </h2>
      <p>
        Access the players collection within the roster. Users must be
        authenticated and a member of the league to query against private
        leagues.
      </p>
      <p>
        For the purposes of this API, we only ever query the base "roster"
        resource, but use the "players" subresource to keep things consistent
        with the rest of the code.
      </p>
      <p>
        In version 4.1.0, the ability to add an optional parameter for "date"
        was added. Per the{" "}
        <a
          href="https://developer.yahoo.com/fantasysports/guide/roster-resource.html#roster-resource-desc"
          title="Yahoo! Fantasy API documentation"
          target="_blank"
          rel="noopener noreferrer"
        >
          API docs
        </a>
        , this can be either a week or specific day. The API allows you to
        specify a week number (NFL), or a string of format 'YYYY-MM-DD' to
        retrieve a team's roster on a specific date (MLB, NHL, NBA).
      </p>
      <p>
        In version 5.3.0, this was split from the roster.fetch resource to allow
        for an optional subresources to be queried. You may specify an optional
        subresource to get additional insights into a team roster. You can only
        specify one at a time and it must be one of stats, percent_owned,
        ownership, or draft_analysis (note: for all but stats, the date field
        may be ignored).
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
                team_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: teamKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setTeamKey, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                The key for the team you'd like to query. Team key format:{" "}
                {`{game_key}.l.{league_id}.t.{team_id}`}
              </div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg)}>date (week)</div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: teamKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setDate, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                The date you'd like the roster for, if no date is specified
                you'll get the roster for today. Date format: YYYY-MM-DD,
                alternatively you can specify a week number and the API will get
                the roster for that week.
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
                      type="radio"
                      name="subresource"
                      value="stats"
                      onChange={(e) => setSubresource("stats")}
                    />
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
                      type="radio"
                      name="subresource"
                      value="ownership"
                      onChange={(e) => setSubresource("ownership")}
                    />
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
                      type="radio"
                      name="subresource"
                      value="percent_owned"
                      onChange={(e) => setSubresource("percent_owned")}
                    />
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
                      type="radio"
                      name="subresource"
                      value="draft_analysis"
                      onChange={(e) => setSubresource("draft_analysis")}
                    />
                  </div>
                )}
                <div>
                  Retrieve the draft_analysis for the retrieved players.
                </div>
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {teamKeyError && (
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
  const stats = await yf.roster.players(
    player_key,
    date // optional
    subresource // optional
  );
} catch (e) {
  // handle error
}

// callback based
yf.roster.players(
  player_key, 
  date, // optional
  subresource // optional
  callbackFn
);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    team_key: "328.l.34014.t.1",
                    team_id: "1",
                    name: "ChicksDigTheLongBall",
                    url: "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/1",
                    team_logo:
                      "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_6_lg.gif",
                    waiver_priority: 4,
                    number_of_moves: "19",
                    number_of_trades: 0,
                    clinched_playoffs: 1,
                    managers: [],
                    roster: [
                      {
                        player_key: "328.p.7276",
                        player_id: "7276",
                        name: {
                          full: "Dioner Navarro",
                          first: "Dioner",
                          last: "Navarro",
                          ascii_first: "Dioner",
                          ascii_last: "Navarro",
                        },
                        editorial_player_key: "mlb.p.7276",
                        editorial_team_key: "mlb.t.14",
                        editorial_team_full_name: "Toronto Blue Jays",
                        editorial_team_abbr: "Tor",
                        uniform_number: "30",
                        display_position: "C",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/J9RMjaT_oREGtFew60DPjA--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150420/7276.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["C", "Util"],
                      },
                      {
                        player_key: "328.p.8640",
                        player_id: "8640",
                        name: {
                          full: "Chris Carter",
                          first: "Chris",
                          last: "Carter",
                          ascii_first: "Chris",
                          ascii_last: "Carter",
                        },
                        editorial_player_key: "mlb.p.8640",
                        editorial_team_key: "mlb.t.18",
                        editorial_team_full_name: "Houston Astros",
                        editorial_team_abbr: "Hou",
                        uniform_number: "23",
                        display_position: "1B,OF",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/jD8fiOgDefp2DzocPg0PBw--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150520/8640.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["1B", "OF", "Util"],
                      },
                      {
                        player_key: "328.p.7483",
                        player_id: "7483",
                        name: {
                          full: "Aaron Hill",
                          first: "Aaron",
                          last: "Hill",
                          ascii_first: "Aaron",
                          ascii_last: "Hill",
                        },
                        editorial_player_key: "mlb.p.7483",
                        editorial_team_key: "mlb.t.29",
                        editorial_team_full_name: "Arizona Diamondbacks",
                        editorial_team_abbr: "Ari",
                        uniform_number: "2",
                        display_position: "2B,3B",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/8kpV.ZqAAc5vOR0cmYdEeA--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150406/7483.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["2B", "3B", "Util"],
                        has_player_notes: 1,
                      },
                      {
                        player_key: "328.p.7163",
                        player_id: "7163",
                        name: {
                          full: "Miguel Cabrera",
                          first: "Miguel",
                          last: "Cabrera",
                          ascii_first: "Miguel",
                          ascii_last: "Cabrera",
                        },
                        editorial_player_key: "mlb.p.7163",
                        editorial_team_key: "mlb.t.6",
                        editorial_team_full_name: "Detroit Tigers",
                        editorial_team_abbr: "Det",
                        uniform_number: "24",
                        display_position: "1B,3B",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/Nnbfp5yPxVW96EuLc.Xv5g--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150420/7163.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["1B", "3B", "Util"],
                        has_player_notes: 1,
                      },
                      {
                        player_key: "328.p.7066",
                        player_id: "7066",
                        name: {
                          full: "José Reyes",
                          first: "José",
                          last: "Reyes",
                          ascii_first: "Jose",
                          ascii_last: "Reyes",
                        },
                        editorial_player_key: "mlb.p.7066",
                        editorial_team_key: "mlb.t.27",
                        editorial_team_full_name: "Colorado Rockies",
                        editorial_team_abbr: "Col",
                        uniform_number: "7",
                        display_position: "SS",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/bbfHZkggtrtdBXz5Mberlg--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://sp.yimg.com/j/assets/ipt/7066.1.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["SS", "Util"],
                        has_player_notes: 1,
                      },
                      {
                        player_key: "328.p.8412",
                        player_id: "8412",
                        name: {
                          full: "Austin Jackson",
                          first: "Austin",
                          last: "Jackson",
                          ascii_first: "Austin",
                          ascii_last: "Jackson",
                        },
                        editorial_player_key: "mlb.p.8412",
                        editorial_team_key: "mlb.t.16",
                        editorial_team_full_name: "Chicago Cubs",
                        editorial_team_abbr: "ChC",
                        uniform_number: "27",
                        display_position: "OF",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/H2QFSHF2qb5pV0E6QxppfQ--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150520/8412.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["OF", "Util"],
                      },
                      {
                        player_key: "328.p.8213",
                        player_id: "8213",
                        name: {
                          full: "Denard Span",
                          first: "Denard",
                          last: "Span",
                          ascii_first: "Denard",
                          ascii_last: "Span",
                        },
                        status: "DL",
                        on_disabled_list: "1",
                        editorial_player_key: "mlb.p.8213",
                        editorial_team_key: "mlb.t.20",
                        editorial_team_full_name: "Washington Nationals",
                        editorial_team_abbr: "Was",
                        uniform_number: "2",
                        display_position: "OF",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/jT_zstYpDxfZd_4z0_k4Kg--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150406/8213.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["OF", "Util", "DL"],
                      },
                      {
                        player_key: "328.p.8117",
                        player_id: "8117",
                        name: {
                          full: "Steve Pearce",
                          first: "Steve",
                          last: "Pearce",
                          ascii_first: "Steve",
                          ascii_last: "Pearce",
                        },
                        editorial_player_key: "mlb.p.8117",
                        editorial_team_key: "mlb.t.1",
                        editorial_team_full_name: "Baltimore Orioles",
                        editorial_team_abbr: "Bal",
                        uniform_number: "28",
                        display_position: "1B,OF",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/OQqJVDrtTQCPY5Boao0bcA--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150406/8117.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["1B", "OF", "Util"],
                        has_player_notes: 1,
                      },
                      {
                        player_key: "328.p.8169",
                        player_id: "8169",
                        name: {
                          full: "Alexei Ramírez",
                          first: "Alexei",
                          last: "Ramírez",
                          ascii_first: "Alexei",
                          ascii_last: "Ramirez",
                        },
                        editorial_player_key: "mlb.p.8169",
                        editorial_team_key: "mlb.t.4",
                        editorial_team_full_name: "Chicago White Sox",
                        editorial_team_abbr: "CWS",
                        uniform_number: "10",
                        display_position: "SS",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/nt8GYTfpPP6_ulkvqFIGCw--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150420/8169.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["SS", "Util"],
                        has_player_notes: 1,
                      },
                      {
                        player_key: "328.p.8554",
                        player_id: "8554",
                        name: {
                          full: "Doug Fister",
                          first: "Doug",
                          last: "Fister",
                          ascii_first: "Doug",
                          ascii_last: "Fister",
                        },
                        editorial_player_key: "mlb.p.8554",
                        editorial_team_key: "mlb.t.20",
                        editorial_team_full_name: "Washington Nationals",
                        editorial_team_abbr: "Was",
                        uniform_number: "33",
                        display_position: "SP",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/TgxUogQ6RsZ.cpz7je3JDg--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150406/8554.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                      },
                      {
                        player_key: "328.p.8167",
                        player_id: "8167",
                        name: {
                          full: "Hiroki Kuroda",
                          first: "Hiroki",
                          last: "Kuroda",
                          ascii_first: "Hiroki",
                          ascii_last: "Kuroda",
                        },
                        status: "NA",
                        editorial_player_key: "mlb.p.8167",
                        editorial_team_key: "mlb.t.10",
                        editorial_team_full_name: "New York Yankees",
                        editorial_team_abbr: "NYY",
                        uniform_number: "18",
                        display_position: "SP",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/CPX2GGcZUzUvIdM3TpZb2g--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/http://l.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20140331/8167.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                      },
                      {
                        player_key: "328.p.6525",
                        player_id: "6525",
                        name: {
                          full: "Mark Buehrle",
                          first: "Mark",
                          last: "Buehrle",
                          ascii_first: "Mark",
                          ascii_last: "Buehrle",
                        },
                        editorial_player_key: "mlb.p.6525",
                        editorial_team_key: "mlb.t.14",
                        editorial_team_full_name: "Toronto Blue Jays",
                        editorial_team_abbr: "Tor",
                        uniform_number: "56",
                        display_position: "SP",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/tA2.WrhNYhNsU7BesJLkug--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150420/6525.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                        has_player_notes: 1,
                      },
                      {
                        player_key: "328.p.9334",
                        player_id: "9334",
                        name: {
                          full: "Kevin Gausman",
                          first: "Kevin",
                          last: "Gausman",
                          ascii_first: "Kevin",
                          ascii_last: "Gausman",
                        },
                        editorial_player_key: "mlb.p.9334",
                        editorial_team_key: "mlb.t.1",
                        editorial_team_full_name: "Baltimore Orioles",
                        editorial_team_abbr: "Bal",
                        uniform_number: "39",
                        display_position: "SP,RP",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/iyfQQTKVv8MriFhDnUY5wQ--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150406/9334.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP", "RP"],
                        has_player_notes: 1,
                        has_recent_player_notes: 1,
                      },
                      {
                        player_key: "328.p.8773",
                        player_id: "8773",
                        name: {
                          full: "Greg Holland",
                          first: "Greg",
                          last: "Holland",
                          ascii_first: "Greg",
                          ascii_last: "Holland",
                        },
                        editorial_player_key: "mlb.p.8773",
                        editorial_team_key: "mlb.t.7",
                        editorial_team_full_name: "Kansas City Royals",
                        editorial_team_abbr: "KC",
                        uniform_number: "56",
                        display_position: "RP",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/WDIoCkfFq1LMnTm1UW0KZw--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150420/8773.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["RP"],
                        has_player_notes: 1,
                      },
                      {
                        player_key: "328.p.8176",
                        player_id: "8176",
                        name: {
                          full: "Jake McGee",
                          first: "Jake",
                          last: "McGee",
                          ascii_first: "Jake",
                          ascii_last: "McGee",
                        },
                        status: "DL",
                        on_disabled_list: "1",
                        editorial_player_key: "mlb.p.8176",
                        editorial_team_key: "mlb.t.30",
                        editorial_team_full_name: "Tampa Bay Rays",
                        editorial_team_abbr: "TB",
                        uniform_number: "57",
                        display_position: "RP",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/79aSP1eCCVf15EhoaQ1QZA--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150420/8176.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["RP", "DL"],
                        has_player_notes: 1,
                      },
                      {
                        player_key: "328.p.7484",
                        player_id: "7484",
                        name: {
                          full: "Brandon McCarthy",
                          first: "Brandon",
                          last: "McCarthy",
                          ascii_first: "Brandon",
                          ascii_last: "McCarthy",
                        },
                        status: "DL",
                        on_disabled_list: "1",
                        editorial_player_key: "mlb.p.7484",
                        editorial_team_key: "mlb.t.19",
                        editorial_team_full_name: "Los Angeles Dodgers",
                        editorial_team_abbr: "LAD",
                        uniform_number: "38",
                        display_position: "SP",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/1IZQ5iOEmPVOeExbQr4kwA--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150520/7484.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP", "DL"],
                      },
                      {
                        player_key: "328.p.5763",
                        player_id: "5763",
                        name: {
                          full: "Bartolo Colón",
                          first: "Bartolo",
                          last: "Colón",
                          ascii_first: "Bartolo",
                          ascii_last: "Colon",
                        },
                        editorial_player_key: "mlb.p.5763",
                        editorial_team_key: "mlb.t.21",
                        editorial_team_full_name: "New York Mets",
                        editorial_team_abbr: "NYM",
                        uniform_number: "40",
                        display_position: "SP",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/O08DInd47rSi1dVaaAa_RA--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150406/5763.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                        has_player_notes: 1,
                      },
                      {
                        player_key: "328.p.9019",
                        player_id: "9019",
                        name: {
                          full: "Wily Peralta",
                          first: "Wily",
                          last: "Peralta",
                          ascii_first: "Wily",
                          ascii_last: "Peralta",
                        },
                        editorial_player_key: "mlb.p.9019",
                        editorial_team_key: "mlb.t.8",
                        editorial_team_full_name: "Milwaukee Brewers",
                        editorial_team_abbr: "Mil",
                        uniform_number: "38",
                        display_position: "SP",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/0Hn.qHEbQzI49B.bxz6hgA--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150527/9019.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                        has_player_notes: 1,
                      },
                      {
                        player_key: "328.p.7779",
                        player_id: "7779",
                        name: {
                          full: "James Shields",
                          first: "James",
                          last: "Shields",
                          ascii_first: "James",
                          ascii_last: "Shields",
                        },
                        editorial_player_key: "mlb.p.7779",
                        editorial_team_key: "mlb.t.25",
                        editorial_team_full_name: "San Diego Padres",
                        editorial_team_abbr: "SD",
                        uniform_number: "33",
                        display_position: "SP",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/mn7rn6GdoQgWKsMqchWAOA--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150520/7779.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                        has_player_notes: 1,
                        has_recent_player_notes: 1,
                      },
                      {
                        player_key: "328.p.9140",
                        player_id: "9140",
                        name: {
                          full: "Drew Smyly",
                          first: "Drew",
                          last: "Smyly",
                          ascii_first: "Drew",
                          ascii_last: "Smyly",
                        },
                        editorial_player_key: "mlb.p.9140",
                        editorial_team_key: "mlb.t.30",
                        editorial_team_full_name: "Tampa Bay Rays",
                        editorial_team_abbr: "TB",
                        uniform_number: "33",
                        display_position: "SP,RP",
                        headshot: {
                          url: "http://l.yimg.com/iu/api/res/1.2/QoY9Tp3nbg9RErW3kjErSw--/YXBwaWQ9c2hhcmVkO2NoPTIzMzY7Y3I9MTtjdz0xNzkwO2R4PTg1NztkeT0wO2ZpPXVsY3JvcDtoPTYwO3E9MTAwO3c9NDY-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/20150406/9140.png",
                          size: "small",
                        },
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP", "RP"],
                        has_player_notes: 1,
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

export default RosterPlayers;
