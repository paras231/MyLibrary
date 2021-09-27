import React, { useEffect, useState } from "react";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Library = () => {

    // get data from localstorage

    const getData = () => {
        let list = localStorage.getItem("lists");
        if (list) {
            return JSON.parse(localStorage.getItem("lists"));
        } else {
            return [];
        }
    }
    const [input, setInput] = useState({
        bookName: "",
        authorName: "",
        categoryName: ""


    });

    const [data, setData] = useState(getData());

    const inputEvent = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        // input data 
        setInput((preValue) => {
            if (name === "bookName") {
                return {
                    bookName: value,
                    authorName: preValue.authorName,
                    categoryName: preValue.categoryName

                }
            } else if (name === "authorName") {
                return {
                    bookName: preValue.bookName,
                    authorName: value,
                    categoryName: preValue.categoryName

                }
            } else {
                return {
                    bookName: preValue.bookName,
                    authorName: preValue.authorName,
                    categoryName: value
                }
            }
        })
    }
    // submit/add books
    const onSubmit = (e) => {
        e.preventDefault();
        if (!input) {

        } else {
            setData([...data, input]);
            setInput([]);
        }
    }
    // notification bar
    const notify = () => {
        toast("Book Added Successfully");
    }

    // useEffect for localstorage
    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(data));
    }, [data])


    // delete a book
    const deleteBook = (id) => {
        const updateBook = data.filter((val, index) => {
            return index !== id;
        })
        setData(updateBook);
    }
    return (
        <>
            <h1 className="heading_style"> Your Library</h1>
            <div className="main_div">

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicBookName">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control type="text" name="bookName" onChange={inputEvent} value={input.bookName}  autoComplete="off"   />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAuthor">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control type="text" name="authorName" onChange={inputEvent} value={input.authorName} autoComplete="off" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="categoryName" onChange={inputEvent} value={input.categoryName} autoComplete="off"  />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={onSubmit} onMouseLeave={notify} >
                        Add Book
                    </Button>
                </Form>


            </div>

            {
                data.map((val, index) => {
                    return <div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Book Name</th>
                                    <th>Author Name</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{val.bookName}</td>
                                    <td>{val.authorName}</td>
                                    <td>{val.categoryName}</td>
                                    <td><Button variant="danger" onClick={() => deleteBook(index)}>Delete</Button></td>
                                </tr>
                            </tbody>
                        </Table>              </div>
                })
            }
            <ToastContainer />
        </>
    )
}

export default Library;