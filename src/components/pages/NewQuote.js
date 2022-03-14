import QuoteForm from "../quotes/QuoteForm";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { addQuote } from "../../lib/api";
import { useEffect } from "react";

function NewQuote() {
  const { sendRequest, status } = useHttp(addQuote);

  const navigate = useNavigate();

  const addQuoteHandler = function (quoteData) {
    sendRequest(quoteData);
  };

  useEffect(
    function () {
      if (status === "completed") {
        navigate("/quotes");
      }
    },
    [status, navigate]
  );

  return (
    <div>
      <QuoteForm
        isLoading={status === "pending"}
        onAddQuote={addQuoteHandler}
      ></QuoteForm>
    </div>
  );
}

export default NewQuote;
