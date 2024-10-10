import { useContext, useState } from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { BookContext } from "../../contexts/BookContext";
import { Login } from "../Login/Login";
import "./navbar.css";
import NavInput from "./NavInput/NavInput";
import cartImg from "../../assets/cart.svg";
import { CartItems } from "../Cart/CartItems";
import { DarkModeContext } from "../../contexts/DarkmodeContext";

const NavBar = () => {
  const { books, setBooks, allBooks } = useContext(BookContext);
  const { currentUser } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {isDarkMode, toggleDarkMode} = useContext(DarkModeContext);
  const toggleShowLoginModal = () => setShowLoginModal(!showLoginModal);

  const searchBooks = () => {
    if (inputValue === "") {
      setBooks(allBooks);
    } else {
      const searchedBooks = allBooks.filter((book) => {
        return book.title.toLowerCase().includes(inputValue.toLowerCase());
      });
      setBooks(searchedBooks);
    }
  };

  return (
    <nav>
      <Container fluid>
        <Row>
          <Col className={`d-flex align-items-center justify-content-between ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"} py-2 px-3 gap-2`}>
            <a href="/">
              <h3>EpicBook</h3>
            </a>
            <ul className="d-flex align-items-center justify-content-center gap-3 list-unstyled linkList m-0 flex-grow-1">
              <li>
                <a href="#">Menu</a>
              </li>
              <li>
                <a href="#">Carrello</a>
              </li>
              <li>
                {" "}
                <a href="#">Chi siamo</a>
              </li>
              <li>
                <a href="#">Contattaci</a>
              </li>
            </ul>
            <NavInput
              books={books}
              setBooks={setBooks}
              allBooks={allBooks}
              searchBooks={searchBooks}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
            <Button variant="info" onClick={toggleShowLoginModal}>
              Login
            </Button>
            <Button variant="warning" onClick={toggleDarkMode}>
              DarkMode
            </Button>
            {showLoginModal && (
              <Login
                showLoginModal={showLoginModal}
                toggleShowLoginModal={toggleShowLoginModal}
              />
            )}
            {currentUser.email && (
              <>
                <div>Benvenuto {currentUser.username}</div>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <img src={cartImg} alt="" width={30} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <CartItems />
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </nav>
  );
};

export default NavBar;
