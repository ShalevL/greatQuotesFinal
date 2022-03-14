import { Outlet, useParams } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Comments from "../comments/Comments";
import HighLightedQuote from "../quotes/HighlightedQuote";
import NotFound from "../pages/NotFound";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getSingleQuote } from "../../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

function QuoteDetail() {
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  const params = useParams();
  const { quoteId } = params;

  const quote = [].find((quote) => quote.id === params.quoteId);

  useEffect(
    function () {
      sendRequest(quoteId);
    },
    [sendRequest, quoteId]
  );

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  // if (error) {
  //   return <p className="centered">{error}</p>;
  // }

  // if (!loadedQuote) {
  //   return <NotFound />;
  // }

  return (
    <div>
      <HighLightedQuote text={quote.text} author={quote.author} />
      <Routes>
        <Route
          path={"/"}
          element={
            <div className="centered">
              <Link
                className="btn--flat"
                to={`/quotes/${params.quoteId}/comments`}
              >
                Load Comments
              </Link>
            </div>
          }
        />
      </Routes>
      <Outlet />
    </div>
  );
}

export default QuoteDetail;
