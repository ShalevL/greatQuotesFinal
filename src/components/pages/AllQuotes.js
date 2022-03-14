import Quotelist from "../quotes/QuoteList";
import useHttp from "../../hooks/use-http";
import { getAllQuotes } from "../../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoQuotesFound from "../quotes/NoQuotesFound";

function AllQuotes() {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(
    function () {
      sendRequest();
    },
    [sendRequest]
  );

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered focused">{error}</div>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return (
    <div>
      <Quotelist quotes={loadedQuotes}></Quotelist>
    </div>
  );
}

export default AllQuotes;
