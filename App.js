import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryPage from './CategoryPage';
import BookPage from './BookPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CategoryPage />} />
                <Route path="/books" element={<BookPage />} />
            </Routes>
        </Router>
    );
}

export default App;
