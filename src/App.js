import { Routes, Route, Navigate } from "react-router-dom";
import AllQuotes from "./components/pages/AllQuotes";
import QuoteDetail from "./components/pages/QuoteDetail";
import NewQuote from "./components/pages/NewQuote";
import Layout from "./components/layout/Layout";
import Comments from "./components/comments/Comments";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/quotes" />} />
        <Route path="/new-quote" element={<NewQuote />} />
        <Route path="/quotes" element={<AllQuotes />} />
        <Route path="/quotes/:quoteId/*" element={<QuoteDetail />}>
          <Route path={"comments"} element={<Comments />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
