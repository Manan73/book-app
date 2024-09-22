import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import BackIcon from './images/Back.svg';
import { useNavigate } from 'react-router-dom';
import CancelIcon from './images/Cancel.svg';
import SearchIcon from './images/Search.svg';

const BooksPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.state?.category; // Get the selected category from state

    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasMore, setHasMore] = useState(true); // To track if more books are available
    const containerRef = useRef(null); // Reference for the scrollable container

    useEffect(() => {
        fetchBooks(); // Fetch books whenever category, search term, or page changes
    }, [category, searchTerm, page]);

    const fetchBooks = async () => {
        if (loading) return; // Prevent multiple fetches

        setLoading(true);
        setError('');

        const searchQuery = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '';
        const response = await fetch(`http://skunkworks.ignitesol.com:8000/books?topic=${category}${searchQuery}&page=${page}`);

        if (response.ok) {
            const data = await response.json();
            setBooks(prevBooks => [...prevBooks, ...data.results]);
            setHasMore(data.next !== null); // Check if there's a next page
        } else {
            setError('Failed to fetch books');
        }

        setLoading(false);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setBooks([]); // Reset books when a new search is initiated
        setPage(1); // Reset to the first page for new search
    };

    const handleBookClick = (book) => {
        const { formats } = book; // Assuming formats is an object with keys for each format
        const availableFormats = ['text/html', 'application/pdf', 'text/plain'];
        let url;

        for (let format of availableFormats) {
            if (formats[format]) {
                url = formats[format];
                break;
            }
        }

        if (url) {
            window.open(url, '_blank');
        } else {
            alert('No viewable version available.');
        }
    };

    // Infinite scrolling logic
    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
        if (scrollHeight - scrollTop <= clientHeight + 10 && hasMore && !loading) {
            setPage(prev => prev + 1);
        }
    };

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={BackIcon}
                    onClick={() => navigate(-1)}
                    style={{ width: '24px', height: '24px', cursor: 'pointer', marginRight: '10px' }}
                    alt="Back"
                />
                <h3 style={{ color: "#5E56E7", fontFamily: "Montserrat", fontSize: "48px", margin: 0 }}>
                    {category}
                </h3>
            </div>

            <div style={{ position: 'relative', marginBottom: '20px', paddingRight: '10px' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                        padding: '10px 40px 10px 40px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        width: '100%',
                    }}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                    }}
                    onClick={() => handleSearch()}
                />
                {searchTerm && (
                    <img
                        src={CancelIcon}
                        alt="Cancel"
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                        }}
                        onClick={() => setSearchTerm('')}
                    />
                )}
            </div>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                style={{ overflowY: 'scroll', height: '400px', display: 'flex', flexWrap: 'wrap', backgroundColor: '#F8F7FF' }}
            >
                {books.map((book) => (
                    <div key={book.id} onClick={() => handleBookClick(book)} style={{
                        cursor: 'pointer', padding: '10px', margin: '10px',
                        width: '114px',
                        height: '162px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px 0 rgba(211, 209, 238, 0.5)',
                        display: 'flex',
                        flexDirection: 'column', 
                        alignItems: 'center',
                    }}>
                        {book.image && <img src={book.image} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />} 
                        <p style={{ color: "black", fontFamily: "Montserrat", fontSize: "12px" }}>{book.title}</p>
                        <p style={{ color: "#F0F0F6", fontFamily: "Montserrat", fontSize: "12px" }}>{book.author}</p>
                    </div>
                ))}
                {!hasMore && <p>No more books available.</p>}
            </div>
        </div>
    );
};

export default BooksPage;
