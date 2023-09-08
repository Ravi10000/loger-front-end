import { Suspense, lazy, useEffect, useState } from "react";
import styles from "./account-details.page.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import { HiCamera } from "react-icons/hi";
const PersonalDetails = lazy(() =>
  import("#components/personal-details/personal-details")
);
const PaymentDetails = lazy(() =>
  import("#components/payment-details/payment-details")
);
const Settings = lazy(() => import("#components/settings/settings"));
const ChangePassword = lazy(() =>
  import("#components/change-password/change-password")
);

const tabs = [
  {
    name: "Personal Details",
    icon: "/images/account-icons/user.svg",
    activeIcon: "/images/account-icons/user-active.svg",
    path: "/account/personal-details",
  },
  {
    name: "Payment Details",
    icon: "/images/account-icons/card.svg",
    activeIcon: "/images/account-icons/card-active.svg",
    path: "/account/payment-details",
  },
  {
    name: "Wallet Rewards",
    icon: "/images/account-icons/wallet-add.svg",
    activeIcon: "/images/account-icons/wallet-add-active.svg",
    path: "/wallet",
  },
  {
    name: "Settings",
    icon: "/images/account-icons/settings.svg",
    activeIcon: "/images/account-icons/settings-active.svg",
    path: "/account/settings",
  },
  {
    name: "Payment History",
    icon: "/images/account-icons/history.svg",
    activeIcon: "/images/account-icons/history-active.svg",
    path: "/wallet",
  },
  {
    name: "Change Password",
    icon: "/images/account-icons/lock.svg",
    activeIcon: "/images/account-icons/lock-active.svg",
    path: "/account/change-password",
  },
];

function AccountDetailsPage() {
  const validPaths = tabs.map((tab) => tab.path);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedTab, setSelectedTab] = useState(pathname);
  useEffect(() => {
    setSelectedTab(() =>
      validPaths.includes(pathname) ? pathname : validPaths[0]
    );
  }, [pathname]);
  const Pages = {
    [tabs[0].path]: PersonalDetails,
    [tabs[1].path]: PaymentDetails,
    [tabs[3].path]: Settings,
    [tabs[5].path]: ChangePassword,
  };
  const Page = Pages[selectedTab];

  return (
    <div className={styles.accountDetailsPage}>
      <div className={styles.container}>
        <div className={styles.navContainer}>
          <nav>
            {tabs.map((tab) => (
              <li
                onClick={() => {
                  navigate(tab.path);
                }}
                key={tab.path}
                className={`${styles.tab} ${
                  selectedTab === tab.path ? styles.selected : ""
                }`}
              >
                <img
                  src={selectedTab === tab.path ? tab.activeIcon : tab.icon}
                  alt={tab.name}
                />
                <p>{tab.name}</p>
              </li>
            ))}
          </nav>
        </div>
        <Suspense fallback={<Loader />}>
          <main className={styles.page}>
            <div className={styles.head}>
              <div className={styles.info}>
                <h1>{tabs.find((tab) => tab.path === selectedTab).name}</h1>
                <p>
                  <Balancer>
                    Lorem Ipsum is simply dummy text of the Lorem Ipsum is
                    simply
                  </Balancer>
                </p>
              </div>
              <div
                className={styles.profilePic}
                style={{
                  backgroundImage: `linear-gradient(to right, #00000070 0%, #000000a3 100%), url("/images/user-circle.png")`,
                }}
              >
                <HiCamera className={styles.icon} />
              </div>
            </div>
            {Page && <Page />}
            {/* {selectedTab === "/account/personal-details" && <PersonalDetails />}
            {selectedTab === "/account/payment-details" && <PaymentDetails />}
            {selectedTab === "/account/settings" && <Settings />} */}
          </main>
        </Suspense>
      </div>
    </div>
  );
}
function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default AccountDetailsPage;
