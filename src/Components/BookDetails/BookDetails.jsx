import { useParams } from "react-router-dom";
import { BookContext } from "../../contexts/BookContext";
import { useContext, useState, useEffect } from "react";
import NavBar from "../Navbar/NavBar";
import { Col, Container, Row, Card, Button, Form } from "react-bootstrap";

const BookDetails = () => {
    const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA3MDI5N2I3MzZmYjAwMTU4ZjAxMDciLCJpYXQiOjE3Mjg1MTI2NjMsImV4cCI6MTcyOTcyMjI2M30.Lar0yHxyegAS2JPurxh3o2NUAPgOYG5NP5YDIlAlkw8"
    const { bookId } = useParams();
    const { isBookLoading: isLoading, isBookError: isError, books } = useContext(BookContext);
    const selectedBook = books.find(book => book.asin === bookId);

    const [isCommentError, setIsCommentError] = useState("");
    const [isCommentLoading, setIsCommentLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        rate: "",
        comment: "",
        elementId: bookId,
    });
    const [editCommentId, setEditCommentId] = useState(null);

    // Endpoint aggiornato (senza bookId nel path)
    const endPoint = `https://striveschool-api.herokuapp.com/api/comments/`;

    const getCommentsFromApi = async () => {
        setIsCommentLoading(true);
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${apikey}`
                }
            });
            const data = await response.json();
            setComments(data);
            setIsCommentLoading(false);
        } catch (error) {
            setIsCommentError(error.message);
            console.log(error);
        } finally {
            setIsCommentLoading(false);
        }
    };

    // Aggiungere nuovo commento
    const addComment = async () => {
        try {
            const response = await fetch(endPoint, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apikey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...newComment, elementId: bookId }), // Assicurarsi che elementId sia aggiornato
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            // Resetta il form dopo l'invio
            setNewComment({
                rate: "",
                comment: "",
                elementId: bookId,
            });

            getCommentsFromApi(); // Aggiorna la lista dei commenti

        } catch (error) {
            console.error("Error adding comment:", error.message);
        }
    };

    // Modifica commento esistente
    const editComment = async (id) => {
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${apikey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            });
            if (response.ok) {
                setEditCommentId(null);
                setNewComment({ comment: "", rate: 1 });
                getCommentsFromApi(); // Aggiorna la lista dei commenti
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Elimina commento
    const deleteComment = async (id) => {
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${apikey}`,
                },
            });
            if (response.ok) {
                getCommentsFromApi(); // Aggiorna la lista dei commenti
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCommentsFromApi();
    }, [bookId]);

    return (
        <>
            <NavBar />
            <Container>
                <Row className="justify-content-center">
                    {selectedBook ? (
                        <>
                            <Col sm={12} md={6} lg={5}>
                                <Card className="book-card shadow-sm">
                                    <Card.Img variant="top" src={selectedBook.img} className="book-img" />
                                    <Card.Body>
                                        <Card.Title className="book-title">{selectedBook.title}</Card.Title>
                                        <Card.Text>
                                            <strong>Category:</strong> {selectedBook.category}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Price:</strong> {selectedBook.price}€
                                        </Card.Text>
                                        <Card.Text>{selectedBook.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12} md={6} lg={4}>
                                <Card className="comments-card shadow-sm">
                                    <Card.Body>
                                        <h5 className="comments-title">Comments</h5>
                                        <div className="comments-section">
                                            {comments.length > 0 ? (
                                                comments.map((comment) => (
                                                    <div key={comment._id} className="comment">
                                                        <p>
                                                            {comment.comment} - <strong>Rating:</strong> {comment.rate}
                                                        </p>
                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                            onClick={() => {
                                                                setEditCommentId(comment._id);
                                                                setNewComment({ comment: comment.comment, rate: comment.rate });
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            className="ml-2"
                                                            onClick={() => deleteComment(comment._id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="no-comments">No comments available</p>
                                            )}
                                        </div>
                                        <Form className="mt-3">
                                            <Form.Group>
                                                <Form.Label>Add/Update Comment</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={newComment.comment}
                                                    onChange={(e) =>
                                                        setNewComment({ ...newComment, comment: e.target.value })
                                                    }
                                                    placeholder="Write your comment"
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={newComment.rate}
                                                    onChange={(e) =>
                                                        setNewComment({ ...newComment, rate: parseInt(e.target.value) })
                                                    }
                                                >
                                                    {[1, 2, 3, 4, 5].map((rate) => (
                                                        <option key={rate} value={rate}>
                                                            {rate}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                            <Button
                                                variant="primary"
                                                onClick={() =>
                                                    editCommentId ? editComment(editCommentId) : addComment()
                                                }
                                            >
                                                {editCommentId ? "Update Comment" : "Add Comment"}
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    ) : (
                        <p>No book selected.</p>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default BookDetails;
