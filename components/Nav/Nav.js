import React, { useContext, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Nav.module.scss";
import cx from "classnames";

import Trophy from "../../assets/images/trophy-solid.svg";
import { Context } from "../../context";
import { USER_LOG_IN, USER_LOG_OUT } from "../../reducers/user";

const Nav = ({ show }) => {
  const [subnavToggle, setSubnavToggle] = useState({
    resources: false,
    collections: false,
  });

  const { pathname } = useRouter();
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.status);
        }

        return response.json();
      })
      .then((data) => {
        dispatch({
          type: USER_LOG_IN,
          payload: data.user,
        });
      })
      .catch((e) => {
        console.log("user not authenticated");
      });
  }, []);

  const toggleSubnav = (key) => {
    setSubnavToggle({ ...subnavToggle, [key]: !subnavToggle[key] });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (new RegExp("resource").test(pathname)) {
      setSubnavToggle({ ...subnavToggle, resources: true });
    } else if (new RegExp("collection").test(pathname)) {
      setSubnavToggle({ ...subnavToggle, collections: true });
    }
  }, [pathname]);

  const logout = () => {
    fetch("/api/logout")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.status);
        }

        return dispatch({
          type: USER_LOG_OUT,
        });
      })
      .catch((e) => {
        console.log("user couldn't log out");
      });
  };

  return (
    <div
      className={cx(styles.wrapper, {
        [styles.show]: show,
      })}
    >
      <ul className={cx(styles.list, styles.main)}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/auth">Authentication</Link>
        </li>
        <li>
          <div
            className={cx(styles.toggle, {
              [styles.on]: subnavToggle["resources"],
            })}
            onClick={() => toggleSubnav("resources")}
          >
            Resources
          </div>
          <ul
            className={cx(styles.subnav, styles.resources, {
              [styles.toggled]: subnavToggle["resources"],
            })}
          >
            <li
              className={cx({
                [styles.toggled]: new RegExp("/resource/game").test(pathname),
              })}
            >
              <Link href="/resource/game">Game</Link>
              <ul
                className={cx(styles.subnav, styles.resource, styles.game, {
                  [styles.toggled]: new RegExp("/resource/game").test(pathname),
                })}
              >
                <li
                  className={cx({
                    [styles.active]: new RegExp("/resource/game/meta").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/game/meta">Meta</Link>
                </li>
                {/* <li
                  className={cx({
                    [styles.active]: new RegExp("/resource/game/leagues").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/game/leagues">Leagues</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp("/resource/game/players").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/game/players">Players</Link>
                </li> */}
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/game/game_weeks"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/game/game_weeks">Game Weeks</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/game/stat_categories"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/game/stat_categories">
                    Stat Categories
                  </Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/game/position_types"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/game/position_types">
                    Position Types
                  </Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/game/roster_positions"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/game/roster_positions">
                    Roster Positions
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={cx({
                [styles.toggled]: new RegExp("/resource/league").test(pathname),
              })}
            >
              <Link href="/resource/league">League</Link>
              <ul
                className={cx(styles.subnav, styles.resource, styles.league, {
                  [styles.toggled]: new RegExp("/resource/league").test(
                    pathname
                  ),
                })}
              >
                <li
                  className={cx({
                    [styles.active]: new RegExp("/resource/league/meta").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/league/meta">Meta</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/league/settings"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/league/settings">Settings</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/league/standings"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/league/standings">Standings</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/league/scoreboard"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/league/scoreboard">Scoreboard</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp("/resource/league/teams").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/league/teams">Teams</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/league/players"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/league/players">Players</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/league/draft_results"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/league/draft_results">
                    Draft Results
                  </Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/league/transactions"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/league/transactions">Transactions</Link>
                </li>
              </ul>
            </li>
            <li
              className={cx({
                [styles.toggled]: new RegExp("/resource/player").test(pathname),
              })}
            >
              <Link href="/resource/player">Player</Link>
              <ul
                className={cx(styles.subnav, styles.resource, styles.player, {
                  [styles.toggled]: new RegExp("/resource/player").test(
                    pathname
                  ),
                })}
              >
                <li
                  className={cx({
                    [styles.active]: new RegExp("/resource/player/meta").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/player/meta">Meta</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp("/resource/player/stats").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/player/stats">Stats</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/player/ownership"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/player/ownership">Ownership</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/player/percent_owned"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/player/percent_owned">
                    Percent Owned
                  </Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/player/draft_analysis"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/player/draft_analysis">
                    Draft Analysis
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={cx({
                [styles.toggled]: new RegExp("/resource/roster").test(pathname),
              })}
            >
              <Link href="/resource/roster">Roster</Link>
              <ul
                className={cx(styles.subnav, styles.resource, styles.roster, {
                  [styles.toggled]: new RegExp("/resource/roster").test(
                    pathname
                  ),
                })}
              >
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/roster/players"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/roster/players">Players</Link>
                </li>
              </ul>
            </li>
            <li
              className={cx({
                [styles.toggled]: new RegExp("/resource/team").test(pathname),
              })}
            >
              <Link href="/resource/team/">Team</Link>
              <ul
                className={cx(styles.subnav, styles.resource, styles.team, {
                  [styles.toggled]: new RegExp("/resource/team").test(pathname),
                })}
              >
                <li
                  className={cx({
                    [styles.active]: new RegExp("/resource/team/meta").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/team/meta">Meta</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp("/resource/team/stats").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/team/stats">Stats</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/team/standings"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/team/standings">Standings</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp("/resource/team/roster").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/team/roster">Roster</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/resource/team/draft_results"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/team/draft_results">Draft Results</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp("/resource/team/matchups").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/team/matchups">Matchups</Link>
                </li>
              </ul>
            </li>
            <li
              className={cx({
                [styles.toggled]: new RegExp("/resource/transaction").test(
                  pathname
                ),
              })}
            >
              <Link href="/resource/transaction/">Transaction</Link>
              <ul
                className={cx(
                  styles.subnav,
                  styles.resource,
                  styles.transaction,
                  {
                    [styles.toggled]: new RegExp("/resource/transaction").test(
                      pathname
                    ),
                  }
                )}
              >
                <li
                  className={cx({
                    [styles.toggled]: new RegExp(
                      "/resource/transaction/players"
                    ).test(pathname),
                  })}
                >
                  <Link href="/resource/transaction/players">Players</Link>
                </li>
              </ul>
            </li>
            <li
              className={cx({
                [styles.toggled]: new RegExp("/resource/user").test(pathname),
              })}
            >
              <Link href="/resource/user">User</Link>
              <ul
                className={cx(styles.subnav, styles.resource, styles.user, {
                  [styles.toggled]: new RegExp("/resource/user").test(pathname),
                })}
              >
                <li
                  className={cx({
                    [styles.toggled]: new RegExp("/resource/user/games").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/user/games">Games</Link>
                </li>
                <li
                  className={cx({
                    [styles.toggled]: new RegExp("/resource/user/leagues").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/user/leagues">Leagues</Link>
                </li>
                <li
                  className={cx({
                    [styles.toggled]: new RegExp("/resource/user/teams").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/resource/user/teams">Teams</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <div
            className={cx(styles.toggle, {
              [styles.on]: subnavToggle["collections"],
            })}
            onClick={() => toggleSubnav("collections")}
          >
            Collections
          </div>
          <ul
            className={cx(styles.subnav, styles.collections, {
              [styles.toggled]: subnavToggle["collections"],
            })}
          >
            <li
              className={cx({
                [styles.toggled]: new RegExp("/collection/games").test(
                  pathname
                ),
              })}
            >
              <Link href="/collection/games">Games</Link>
              <ul
                className={cx(styles.subnav, styles.collection, styles.games, {
                  [styles.toggled]: new RegExp("/collection/games").test(
                    pathname
                  ),
                })}
              >
                <li
                  className={cx({
                    [styles.active]: new RegExp("/collection/games/fetch").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/collection/games/fetch">Fetch</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp("/collection/games/user").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/collection/games/user">User</Link>
                </li>
              </ul>
            </li>
            <li
              className={cx({
                [styles.toggled]: new RegExp("/collection/leagues").test(
                  pathname
                ),
              })}
            >
              <Link href="/collection/leagues">Leagues</Link>
              <ul
                className={cx(
                  styles.subnav,
                  styles.collection,
                  styles.leagues,
                  {
                    [styles.toggled]: new RegExp("/collection/leagues").test(
                      pathname
                    ),
                  }
                )}
              >
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/collection/leagues/fetch"
                    ).test(pathname),
                  })}
                >
                  <Link href="/collection/leagues/fetch">Fetch</Link>
                </li>
              </ul>
            </li>
            <li
              className={cx({
                [styles.toggled]: new RegExp("/collection/players").test(
                  pathname
                ),
              })}
            >
              <Link href="/collection/players">Players</Link>
              <ul
                className={cx(
                  styles.subnav,
                  styles.collection,
                  styles.players,
                  {
                    [styles.toggled]: new RegExp("/collection/players").test(
                      pathname
                    ),
                  }
                )}
              >
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/collection/players/fetch"
                    ).test(pathname),
                  })}
                >
                  <Link href="/collection/players/fetch">Fetch</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/collection/players/league"
                    ).test(pathname),
                  })}
                >
                  <Link href="/collection/players/league">League</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/collection/players/team"
                    ).test(pathname),
                  })}
                >
                  <Link href="/collection/players/team">Team</Link>
                </li>
              </ul>
            </li>
            <li
              className={cx({
                [styles.toggled]: new RegExp("/collection/teams").test(
                  pathname
                ),
              })}
            >
              <Link href="/collection/teams">Teams</Link>
              <ul
                className={cx(styles.subnav, styles.collection, styles.teams, {
                  [styles.toggled]: new RegExp("/collection/teams").test(
                    pathname
                  ),
                })}
              >
                <li
                  className={cx({
                    [styles.active]: new RegExp("/collection/teams/fetch").test(
                      pathname
                    ),
                  })}
                >
                  <Link href="/collection/teams/fetch">Teams</Link>
                </li>
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/collection/teams/leagues"
                    ).test(pathname),
                  })}
                >
                  <Link href="/collection/teams/leagues">Leagues</Link>
                </li>
              </ul>
            </li>
            <li
              className={cx({
                [styles.toggled]: new RegExp("/collection/transactions").test(
                  pathname
                ),
              })}
            >
              <Link href="/collection/transactions">Transactions</Link>
              <ul
                className={cx(
                  styles.subnav,
                  styles.collection,
                  styles.transactions,
                  {
                    [styles.toggled]: new RegExp(
                      "/collection/transactions"
                    ).test(pathname),
                  }
                )}
              >
                <li
                  className={cx({
                    [styles.active]: new RegExp(
                      "/collection/transactions/fetch"
                    ).test(pathname),
                  })}
                >
                  <Link href="/collection/transactions/fetch">Fetch</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <ul className={styles.list}>
        <li>
          <Link href="/changelog" title="Changelog">
            Changelog
          </Link>
        </li>
        <li>
          <a
            href="https://github.com/whatadewitt/yahoo-fantasy-sports-api"
            target="_blank"
            title="Source on Github"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
        <li>
          <a
            href="https://www.npmjs.com/package/yahoo-fantasy"
            target="_blank"
            title="NPM page"
            rel="noopener noreferrer"
          >
            NPM
          </a>
        </li>
        <li>
          {user.id ? (
            <Link
              href="/api/logout"
              onClick={logout}
              title="Logout"
              rel="noopener noreferrer"
            >
              <div className={styles.button}>
                <img
                  src={user.avatar}
                  className={styles.avatar}
                  alt="user avatar"
                />
                <div className={styles.info}>
                  <div className={styles.user}>{user.name}</div>
                  <div className={styles.logout}>Logout</div>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href="/api/auth"
              title="Authenticate with Yahoo!"
              rel="noopener noreferrer"
              passHref
            >
              <a className={cx(styles.button, styles.login)}>
                <Trophy />
                Authenticate w/ Yahoo!
              </a>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Nav;
