import React from "react";
import Link from "next/link";

import appStyles from "../../Layout/Layout.module.scss";

import cx from "classnames";

const Transaction = () => (
  <>
    <div>
      <h2>Transaction</h2>
      <p>
        With the Transaction API, you can obtain information about transactions
        (adds, drops, trades, and league settings changes) performed on a
        league. A transaction is identified in the context of a particular
        league, although you can request a particular Transaction Resource as
        the base of your URI by using the global transaction_key. A user can
        only retrieve data about a transaction if that user is part of a private
        league of which the user is a member, or if it's in a public league.
      </p>
      <p>
        <em>
          <strong>TODO:</strong> additional methods for creating transctions
        </em>
      </p>

      <h3>Methods</h3>

      <div className={appStyles.table}>
        <div className={cx(appStyles.header, appStyles.row)}>
          <div>Method</div>
          <div>Description</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/transaction/players">
              transaction.players
            </Link>
          </div>
          <div>Retrieve information about a specific transaction.</div>
        </div>
      </div>
    </div>
  </>
);

export default Transaction;
