import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=10`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSearchResults(data.items || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => fetchSearchResults(), 300);

    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    // Handle file upload here
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    // Handle file upload here
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div>
        <div className='flex m-8 justify-between'>
          <Link to="/" className='flex'>
            <img className='w-12 mx-3' src="/logo.png" alt="logo" />
            <h1 className='font-sans font-bold text-5xl'>BuildUp</h1>
          </Link>
          <Link className=''>Sign up</Link>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <form className="relative">
          <input
            className='w-[40rem] rounded-full border-2 border-black p-2 pl-10'
            type="text"
            placeholder='Search'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <img
            className='w-5 absolute left-3 top-1/2 transform -translate-y-1/2'
            src="/magnifying-glass-solid.svg"
            alt="Search Icon"
          />
        </form>
      </div>

      <div className='flex flex-col justify-center items-center text-center m-24'>
        <h1 className='font-bold text-3xl'>Transform Your Files into Powerful Study Tools</h1>
        <p className='mx-40 my-5'>At BuildUp, we make studying smarter and more efficient. Simply upload your documents, and we'll do the rest—turning them into interactive flashcards, engaging quizzes, and other study aids that help you master your material faster.</p>
      </div>

      <div className='flex flex-col justify-center items-center m-8'>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {searchQuery && !loading && !error && searchResults.length > 0 && (
          <div>
            <h2 className='font-bold text-2xl'>Search Results:</h2>
            <ul className="space-y-4">
              {searchResults.map(result => (
                <li key={result.id} className="border p-4 rounded-lg shadow-md">
                  <h3 className='font-bold text-xl'>{result.volumeInfo.title}</h3>
                  <p className='text-gray-700'>by {result.volumeInfo.authors?.join(', ')}</p>
                  <p className='text-gray-600'>{result.volumeInfo.description}</p>
                  <div className="flex space-x-2 mt-2">
                    {result.volumeInfo.previewLink && (
                      <a
                        href={result.volumeInfo.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white py-1 px-3 rounded-lg"
                      >
                        Preview
                      </a>
                    )}
                    {/* {result.saleInfo?.buyLink && (
                      <a
                        href={result.saleInfo.buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white py-1 px-3 rounded-lg"
                      >
                        Buy
                      </a>
                    )} */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className='m-32 flex justify-center h-60'>
        <div
          className={`border-2 border-dashed p-4 text-center ${dragging ? 'border-blue-500' : 'border-gray-300'}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            {files.length === 0 ? (
              <div className='flex flex-col justify-center items-center'>
                <p>Drag and drop files here, or click to select files</p>
                <img className='w-16 m-16' src="/upload.svg" alt="" />
              </div>
            ) : (
              <div>
                <p>{files.length} file(s) selected</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <h1 className='font-bold text-3xl'>Explore diverse free resources</h1>
        <p className='mx-24 my-5'>Dive into a vast collection of diverse and high-quality educational materials available for free. From detailed PDFs and comprehensive lessons to interactive tools and multimedia content, our curated selection offers something for everyone. Whether you're looking to enhance your skills, deepen your knowledge, or find valuable study aids, explore our extensive range of resources and unlock new opportunities for learning and growth.</p>
        <Link to="/categories" className='flex place-self-end mx-32 underline'>See all</Link>
        <div className='flex m-16 justify-center h-[35rem] space-x-4'>
          <img className='w-80 object-cover ' src="/sports.jpg" alt="sports" />
          <img className='w-80 object-cover' src="/programming.jpg" alt="programming" />
          <img className='w-80 object-cover' src="/cooking.webp" alt="cooking" />
          <img className='w-80 object-cover' src="/crypto.webp" alt="crypto" />
        </div>
      </div>
    </div>
  );
}

export default Home;
