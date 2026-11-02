
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const FeedContext = createContext();

export function useFeedContext() {
  return useContext(FeedContext);
}

function FeedProvider({ children }) {
  const { isAuth } = useAuth();

  const [tab, setTab] = useState({
    tabName: isAuth ? "feed" : "global",
    tagName: "",
    isAuth,
  });

  const tabName =
    tab.isAuth === isAuth
      ? tab.tabName
      : isAuth
        ? "feed"
        : "global";

  const tagName = tab.tagName;

  const changeTab = async (e, newTabName) => {
    const newTagName = e.target.innerText.trim();

    setTab({
      tabName: newTabName,
      tagName: newTagName,
      isAuth,
    });
  };

  return (
    <FeedContext.Provider value={{ changeTab, tabName, tagName }}>
      {children}
    </FeedContext.Provider>
  );
}

export default FeedProvider;
