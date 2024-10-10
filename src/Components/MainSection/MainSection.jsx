import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { BookContext } from "../../contexts/BookContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SingleBook from "../SingleBook/SingleBook";
import { DarkModeContext } from "../../contexts/DarkmodeContext";

const MainSection = () => {
  const {
    isBookLoading: isLoading,
    isBookError: isError,
    books,
  } = useContext(BookContext);
 const {isDarkMode} = useContext(DarkModeContext);
  return (
    <main className={isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}>
      <Container className={`pt-5`}>
        <Row className="gy-3">
          {isLoading && !isError && <LoadingSpinner />}
          {!isLoading && isError && (
            <Alert variant="danger">Oops, qualcosa è andato storto...</Alert>
          )}

          {!isLoading &&
            !isError &&
            books
              .slice(0, 12)
              .map((book) => (
                <SingleBook
                  key={book.asin} // Preferire una chiave unica
                  title={book.title}
                  category={book.category}
                  price={book.price}
                  img={book.img}
                  asin={book.asin}
                />
              ))}
        </Row>
      </Container>
    </main>
  );
};

export default MainSection;
