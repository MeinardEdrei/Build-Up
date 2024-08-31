import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quizCreated, setQuizCreated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:education&maxResults=20');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data fetched:', data);

        const processedResources = data.items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          description: item.volumeInfo.description,
          infoLink: item.volumeInfo.infoLink,
          previewLink: item.volumeInfo.previewLink,
          thumbnail: item.volumeInfo.imageLinks?.thumbnail,
          buyLink: item.saleInfo?.buyLink
        }));

        setResources(processedResources);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBookSelect = (book) => {
    console.log('Book selected:', book.id);
    setSelectedBook(book);
    setQuizCreated(false); // Reset quiz state when a new book is selected
  };

  const handleFlashcardCreation = () => {
    console.log('Flashcard creation triggered for:', selectedBook.title);
    alert('Flashcard creation triggered');
    // Implement your logic for converting the book to flashcards here
  };

  const handleQuizCreation = () => {
    console.log('Quiz creation triggered for:', selectedBook.title);
    setQuizCreated(true); // Set quiz state to true to show quiz UI
  };

  if (loading) return <p className="text-center text-xl mt-8">Loading...</p>;
  if (error) return <p className="text-center text-xl mt-8 text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-8">
        <Link to="/" className="flex items-center">
          <img className="w-12 mr-3" src="/logo.png" alt="logo" />
          <h1 className="font-sans font-bold text-4xl">BuildUp</h1>
        </Link>
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign up
        </Link>
      </div>
      <div className="mb-8">
        <form className="relative max-w-2xl mx-auto">
          <input 
            className="w-full rounded-full border-2 border-gray-300 py-2 px-4 pl-10 focus:outline-none focus:border-blue-500" 
            type="text" 
            placeholder="Search"
          />
          <img 
            className="w-5 absolute left-3 top-1/2 transform -translate-y-1/2" 
            src="/magnifying-glass-solid.svg" 
            alt="Search Icon" 
          />
        </form>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-4">
          <h2 className="text-2xl font-bold mb-4">Educational Resources</h2>
          <ul className="space-y-2">
            {resources.length > 0 ? (
              resources.map(resource => (
                <li key={resource.id}>
                  <button 
                    onClick={() => handleBookSelect(resource)}
                    className="text-left hover:bg-gray-100 p-2 rounded w-full"
                  >
                    <p className="font-semibold">{resource.title}</p>
                    <p className="text-sm text-gray-600">by {resource.authors?.join(', ')}</p>
                  </button>
                </li>
              ))
            ) : (
              <p>No resources found.</p>
            )}
          </ul>
        </div>
        <div className="w-full md:w-2/3">
          {selectedBook ? (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedBook.title}</h2>
                <p className="text-gray-600 mb-4">by {selectedBook.authors?.join(', ')}</p>
                {selectedBook.thumbnail && (
                  <img src={selectedBook.thumbnail} alt={selectedBook.title} className="float-left mr-4 mb-4" />
                )}
                <p className="text-gray-700 mb-4">{selectedBook.description}</p>
                <div className="flex flex-wrap gap-2">
                  <a 
                    href={selectedBook.previewLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Preview Book
                  </a>
                  {selectedBook.buyLink && (
                    <a 
                      href={selectedBook.buyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Buy Book
                    </a>
                  )}
                  <a 
                    href={selectedBook.infoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    More Info
                  </a>
                  {/* <button 
                    onClick={handleFlashcardCreation} 
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Create Flashcards
                  </button> */}
                  {/* <button 
                    onClick={handleQuizCreation} 
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Create Quiz
                  </button> */}
                </div>
              </div>

              {/* Conditional rendering of quiz UI */}
              {quizCreated && (
                <div className="p-6 bg-gray-100 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Quiz for {selectedBook.title}</h3>
                  {/* Add your quiz UI components here */}
                  <p>Example Quiz Question 1: ...</p>
                  <p>Example Quiz Question 2: ...</p>
                  {/* Implement the actual quiz logic as needed */}
                </div>
              )}

              <iframe 
                src={`https://books.google.com/books?id=${selectedBook.id}&lpg=PP1&pg=PP1&output=embed`}
                width="100%" 
                height="500" 
                allowFullScreen
                title="Book Preview"
                className="border-t"
              ></iframe>
            </div>
          ) : (
            <p className="text-center text-xl text-gray-600">Select a book to view its details and preview</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
