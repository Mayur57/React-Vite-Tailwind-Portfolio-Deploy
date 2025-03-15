import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Bestreads() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSnakeGameOpen, setIsSnakeGameOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false); // MISSING in your code


  const books = [
    { title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", year: 1999 },
    { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", year: 1997 },
    { title: "Calculus Made Easy", author: "Silvanus P. Thompson", year: 1910 },
    { title: "Ambani & Sons", author: " Hamish McDonald", year: 2010 },
    
  ];

  const blogs = [
    { title: "Artificial Intelligence for the win....maybe?", date: "2025-02-05", content: "So this Deepseek thing shook the Tech giants enough to make them think. But will it really change the world? I am not trusting AI to drive my car, Control Space Rockets, or worse, The Northrop Grumman B-21 Raider. " },
    { title: "Why Tailwind CSS is a Game-Changer", date: "2025-02-02", content: "Exploring how Tailwind CSS speeds up styling and improves design consistency across projects." },
    { title: "Nevermind.....", date: "2025-01-27", content: "Tariffs incoming, Brace for impact. Why is my Zerodha account going red? New design maybe?" },
    { title: "Youtube ilysm❤️ ", date: "2025-01-02", content: "For anyone who's 21, youtube has to be the most Goated platform. Although it has gotten a bit too bold to show me 5 unskippable ads on a 10 minute video. But i like the ASMR and Mukbang recommendations at 3 am." },
    { title: "Dinosaurs were just lizards who forgot to stop their bulk.", date: "2024-12-31", content: "Too bad they didn't have Ozempic." },
    { title: "We need to step up our game", date: "2024-12-26", content: "Not every startup which claims to be Revolutionary is actually Revolutionary. Want a startup idea? Here you go, Guaranteed {Insert a product category here} 10 Minute delivery. I'll take 2% Advisory shares. Pleasure doing business with you." },
    { title: "DJT", date: "2024-11-05", content: "Donald J. Trump wins the election. Again. Money printer goes Brrrrrrr. No more Ka-boom. It only goes Ka-ching. " },


  ];

  const booksPerPage = 3;
  const totalPages = Math.ceil(books.length / booksPerPage);

  const startIndex = currentPage * booksPerPage;
  const displayedBooks = books.slice(startIndex, startIndex + booksPerPage);

  
  return (
    <div className=" snap-section min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white relative">
      {/* Main Content */}
      {!isBlogOpen && (
        <div className="flex flex-col items-center justify-center gap-12 mt-[-10vh]">
          {/* Best Reads Box */}
          <section className="w-full max-w-[800px] h-[350px] bg-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-white">Best Reads</h2>
            <p className="text-gray-400 mb-4">Explore my favorite books and articles that have inspired me.</p>
            <div className="flex-grow">
              {displayedBooks.map((book, index) => (
                <div key={index} className="mb-2">
                  <p className="text-white font-semibold">{book.title}</p>
                  <p className="text-gray-400 text-sm">{book.author} - {book.year}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button 
                className="px-4 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              <button 
                className="px-4 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
              >
                Next
              </button>
            </div>
          </section>

          {/* Blogfolio Box */}
          <section className="w-full max-w-[800px] h-[250px] sm:h-[200px] bg-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Blogfolio/Shower Thoughts...? 🤔</h2>
              <p className="text-gray-400">
  A collection of my personal blog posts,<br /> 
  not that it matters but whatever.
</p>

            </div>
            <button 
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
              onClick={() => setIsBlogOpen(true)}
            >
              View More
            </button>
          </section>
        </div>
      )}

            {/* Blogfolio Full Page Overlay with Scroll */}
      {isBlogOpen && (
        <motion.div
          className="absolute inset-0 bg-gray-900 text-white flex flex-col items-center justify-center px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button 
            className="absolute top-4 right-6 text-3xl text-gray-400 hover:text-white transition"
            onClick={() => setIsBlogOpen(false)}
          >
            &times;
          </button>
          <h1 className="text-4xl font-bold mb-6">My Blogs</h1>
          <div className="w-full max-w-[700px] h-[75vh] overflow-y-auto p-4 space-y-6 bg-gray-800 rounded-xl shadow-lg">
            {blogs.map((blog, index) => (
              <div key={index} className="p-4 rounded-xl shadow-md bg-gray-700">
                <h3 className="text-xl font-bold">{blog.title}</h3>
                <p className="text-gray-400 text-sm">Date: {blog.date}</p>
                <p className="text-gray-300 mt-2">{blog.content}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Semi-Rectangle Box for Snake Game */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-0 left-0 w-full bg-gray-900 text-white px-6 py-4 rounded-t-3xl flex justify-between items-center shadow-lg"
      >
        <div>
          <h2 className="text-2xl font-bold">Too bored?</h2>
          <p className="text-gray-400 text-sm">Click to play the classic Snake Game</p>
        </div>
        <button
          className="text-white text-2xl hover:text-blue-400 transition-all duration-300"
          onClick={() => setIsSnakeGameOpen(true)}
        >
          →
        </button>
      </motion.div>

      {isSnakeGameOpen && <SnakeGame onCloseSnakeGame={() => setIsSnakeGameOpen(false)} />}
    </div>
  );
}


// Snake Game Component
const gridSize = 20;
const initialSnake = [{ x: 10, y: 10 }];
const initialFood = { x: 5, y: 5 };
const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

function SnakeGame({ onCloseSnakeGame }) {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState(directions.ArrowRight);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const gameAreaRef = React.useRef(null);

  // Prevent background scrolling when the game is running (Mobile Only)
React.useEffect(() => {
  const disableScroll = (e) => e.preventDefault();

  if (isRunning) {
    document.body.style.overflow = "hidden"; // Disable scrolling
    document.addEventListener("touchmove", disableScroll, { passive: false });
  } else {
    document.body.style.overflow = "auto"; // Enable scrolling when game quits
    document.removeEventListener("touchmove", disableScroll);
  }

  return () => {
    document.body.style.overflow = "auto";
    document.removeEventListener("touchmove", disableScroll);
  };
}, [isRunning]);


  // Handle keyboard input
  React.useEffect(() => {
    if (!isRunning) return;
    const handleKeyPress = (e) => {
      if (directions[e.key]) setDirection(directions[e.key]);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isRunning]);

  // Handle touch swipe input
  React.useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!isRunning) return;

      let touchEndX = e.changedTouches[0].clientX;
      let touchEndY = e.changedTouches[0].clientY;

      let diffX = touchEndX - touchStartX;
      let diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 0 && direction !== directions.ArrowLeft) {
          setDirection(directions.ArrowRight);
        } else if (diffX < 0 && direction !== directions.ArrowRight) {
          setDirection(directions.ArrowLeft);
        }
      } else {
        // Vertical swipe
        if (diffY > 0 && direction !== directions.ArrowUp) {
          setDirection(directions.ArrowDown);
        } else if (diffY < 0 && direction !== directions.ArrowDown) {
          setDirection(directions.ArrowUp);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchMove);
    };
  }, [isRunning, direction]);

  // Snake movement logic
  React.useEffect(() => {
    if (!isRunning) return;
    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= gridSize ||
          newHead.y < 0 ||
          newHead.y >= gridSize ||
          prevSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameOver(true);
          setIsRunning(false);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [isRunning, direction, food]);

  const handleStart = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection(directions.ArrowRight);
    setIsRunning(true);
    setGameOver(false);
  };

  const handleQuit = () => {
    setIsRunning(false);
    setGameOver(false);
    document.body.style.overflow = "auto"; // Restore scrolling when game is quit
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center text-white p-6 z-50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        onClick={onCloseSnakeGame}
      >
        &times;
      </button>
      <h1 className="text-3xl font-bold mb-4">Play with my Snake.</h1>
      <div
        ref={gameAreaRef}
        className="relative w-[90vw] max-w-[400px] h-[90vw] max-h-[400px] bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20">
          {Array.from({ length: gridSize }).map((_, row) =>
            Array.from({ length: gridSize }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                className="w-full h-full border border-gray-700"
              />
            ))
          )}
        </div>
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute w-[5%] h-[5%] bg-green-500 rounded-sm"
            style={{
              top: `${(segment.y / gridSize) * 100}%`,
              left: `${(segment.x / gridSize) * 100}%`,
            }}
          />
        ))}
        <div
          className="absolute w-[5%] h-[5%] bg-red-500 rounded-sm"
          style={{
            top: `${(food.y / gridSize) * 100}%`,
            left: `${(food.x / gridSize) * 100}%`,
          }}
        />
      </div>
      {gameOver && (
        <p className="text-red-400 mt-2">Game Over! Press Start to try again.</p>
      )}
      <div className="flex gap-4 mt-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Start Game
          </button>
        ) : (
          <button
            onClick={handleQuit}
            className="px-4 py-2 bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Quit Game
          </button>
        )}
      </div>
    </motion.div>
  );
}


