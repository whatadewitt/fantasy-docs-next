import React from "react";
import Link from "next/link";

import appStyles from "../../Layout/Layout.module.scss";

import cx from "classnames";

const Transactions = () => (
  <>
    <div>
      <h2>Transactions</h2>
      <p>
        With the Transactions Collection API, you can obtain fantasy transaction
        related information at the same time.
      </p>

      <h3>Methods</h3>

      <div className={appStyles.table}>
        <div className={cx(appStyles.header, appStyles.row)}>
          <div>Method</div>
          <div>Description</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/collection/transactions/fetch">
              transactions.fetch
            </Link>
          </div>
          <div>Retrieve information about transactions at once</div>
        </div>
      </div>
    </div>
  </>
);

export default Transactions;
