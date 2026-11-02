import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import getArticles from "../services/getArticles";

function useArticles({ location, tabName, tagName, username }) {
  const [{ articles, articlesCount }, setArticlesData] = useState({
    articles: [],
    articlesCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const { headers } = useAuth();

  useEffect(() => {
    if (!headers && tabName === "feed") return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    getArticles({ headers, location, tabName, tagName, username })
      .then(setArticlesData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [headers, location, tabName, tagName, username]);

  return { articles, articlesCount, loading, setArticlesData };
}

export default useArticles;
