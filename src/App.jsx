import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import BookDetails from "./Components/BookDetails/BookDetails";
import NotFoundPage from "./Pages/Notfoundpage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage/>} />
          <Route path="/book/:bookId" element={<BookDetails/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
