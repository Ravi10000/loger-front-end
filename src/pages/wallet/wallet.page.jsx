import styles from "./wallet.page.module.scss";
import Balancer from "react-wrap-balancer";
import { useNavigate } from "react-router-dom";
import { PiArrowLeftBold } from "react-icons/pi";

function WalletPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.walletPage}>
      <div className={styles.iconLink} onClick={() => navigate(-1)}>
        <PiArrowLeftBold className={`${styles.backIcon} ${styles.icon}`} />
        <p>Go Back</p>
      </div>
      <div className={styles.heroSectionContainer}>
        <div className={styles.heroSection}>
          <h1>
            <Balancer>Rewards & Wallet</Balancer>
          </h1>
          <p>
            <Balancer>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been
            </Balancer>
          </p>
          <div className={styles.content}>
            <div className={styles.coinCard}>
              <div className={styles.info}>
                <h2>Total Coins Earned</h2>
                <p>
                  You Have <span>50 Coins</span> Cashback
                  <br />
                  Use it to be Save On Your Next Booking
                </p>
              </div>
              <img src="/images/icons/coin.svg" alt="coin" />
            </div>
            <div className={styles.coinCard}>
              <div className={styles.info}>
                <h2>Total Coins Used</h2>
                <p>
                  You Have <span>50 Coins</span> Cashback
                  <br />
                  Use it to be Save On Your Next Booking
                </p>
              </div>
              <img src="/images/icons/coin.svg" alt="coin" />
            </div>
            <div className={styles.coinCard}>
              <div className={styles.info}>
                <h2>Coin Balance</h2>
                <p>
                  You Have <span>50 Coins</span> Cashback
                  <br />
                  Use it to be Save On Your Next Booking
                </p>
              </div>
              <img src="/images/icons/coin.svg" alt="coin" />
            </div>
          </div>
          <div className={styles.balanceCard}>
            <img
              className={styles.walletImg}
              src="/images/wallet.png"
              alt="wallet"
            />
            <div className={styles.info}>
              <h2>Wallet balance</h2>
              <p>
                <Balancer>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been
                </Balancer>
              </p>
              <div className={styles.balance}>
                <img src="/images/icons/coin.svg" alt="coin" />
                <p>1200</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <h2>Transaction History</h2>
        <div className={styles.tableContainer}>
          <table id="payment-history">
            <thead>
              <tr>
                <th>Card Holder Name</th>
                <th>Customer Number</th>
                <th>Transaction ID</th>
                <th>Hotel Name</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Anil Sogra</td>
                <td>123456789</td>
                <td>TND 123456789</td>
                <td>Tirath View, Haridwar</td>
                <td>June, 24, 2023</td>
                <td className={styles.price}>₹ 3,500</td>
              </tr>
              <tr>
                <td>Anil Sogra</td>
                <td>123456789</td>
                <td>TND 123456789</td>
                <td>Tirath View, Haridwar</td>
                <td>June, 24, 2023</td>
                <td className={styles.price}>₹ 3,500</td>
              </tr>
              <tr>
                <td>Anil Sogra</td>
                <td>123456789</td>
                <td>TND 123456789</td>
                <td>Tirath View, Haridwar</td>
                <td>June, 24, 2023</td>
                <td className={styles.price}>₹ 3,500</td>
              </tr>
              <tr>
                <td>Anil Sogra</td>
                <td>123456789</td>
                <td>TND 123456789</td>
                <td>Tirath View, Haridwar</td>
                <td>June, 24, 2023</td>
                <td className={styles.price}>₹ 3,500</td>
              </tr>
              <tr>
                <td>Anil Sogra</td>
                <td>123456789</td>
                <td>TND 123456789</td>
                <td>Tirath View, Haridwar</td>
                <td>June, 24, 2023</td>
                <td className={styles.price}>₹ 3,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;
