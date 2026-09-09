import React, { useState } from "react";

function App() {
  // Form Fields
  const [movieName, setMovieName] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [yearRelease, setYearRelease] = useState("Select a Year");
  const [movieRating, setMovieRating] = useState("5"); 
  const [castInput, setCastInput] = useState("");
  const [movieCast, setMovieCast] = useState([]);
  const [synopsis, setSynopsis] = useState("");

  // Data State
  const [movies, setMovies] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  // Add cast member
  const handleAddCast = () => {
    if (castInput.trim() !== "") {
      setMovieCast([...movieCast, castInput.trim()]);
      setCastInput("");
    }
  };

  // Clear function
  const handleClear = () => {
    setMovieName("");
    setMoviePoster("");
    setYearRelease("Select a Year");
    setMovieRating("5");
    setCastInput("");
    setMovieCast([]);
    setSynopsis("");
    setEditIndex(null);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // All fields are required
    if (
      !movieName.trim() ||
      !moviePoster.trim() ||
      yearRelease === "Select a Year" ||
      !movieRating ||
      !synopsis.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    // Years
    const validYears = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];
    if (!validYears.includes(yearRelease)) {
      setError("Please select a valid Year Release.");
      return;
    }

    // Rating
    const ratingNum = Number(movieRating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
      setError("Movie Rating should range from 1 to 10.");
      return;
    }

  
    if (movieCast.length === 0) {
      setError("The Movie Cast should have at least one value in its list.");
      return;
    }

    setError("");

    const movieData = {
      movieName,
      moviePoster,
      yearRelease,
      movieRating: ratingNum,
      movieCast,
      synopsis,
    };

    if (editIndex !== null) {
      const updatedMovies = [...movies];
      updatedMovies[editIndex] = movieData;
      setMovies(updatedMovies);
      setEditIndex(null);
    } else {
      setMovies([...movies, movieData]);
    }

    handleClear();
  };

  // Edit Function
  const handleEdit = (index) => {
    const movie = movies[index];
    setMovieName(movie.movieName);
    setMoviePoster(movie.moviePoster);
    setYearRelease(movie.yearRelease);
    setMovieRating(String(movie.movieRating));
    setMovieCast(movie.movieCast);
    setSynopsis(movie.synopsis);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete Function
  const handleDelete = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
  };

  // Form
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "10px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", textTransform: "uppercase", fontSize: "28px", marginBottom: "30px" }}>
        LIST OF MOVIES
      </h1>

      <hr style={{ border: "0", borderTop: "2px solid #000000a0", margin: "30px 0" }} />

      {error && <div style={{ color: "red", textAlign: "center", marginBottom: "15px", fontWeight: "bold" }}>{error}</div>}


      <form onSubmit={handleSubmit} style={{ width: "500px", margin: "0 auto 40px auto" }}>
        <div style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "110px", textAlign: "right", paddingRight: "10px", fontSize: "14px" }}>Movie Name:</label>
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            style={{ width: "250px", padding: "2px 4px", border: "1px solid #7f7f7f" }}
          />
        </div>

        <div style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "110px", textAlign: "right", paddingRight: "10px", fontSize: "14px" }}>Movie Poster:</label>
          <input
            type="text"
            value={moviePoster}
            onChange={(e) => setMoviePoster(e.target.value)}
            style={{ width: "250px", padding: "2px 4px", border: "1px solid #7f7f7f" }}
          />
        </div>

        <div style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "110px", textAlign: "right", paddingRight: "10px", fontSize: "14px" }}>Year Release:</label>
          <select 
            value={yearRelease} 
            onChange={(e) => setYearRelease(e.target.value)} 
            style={{ width: "120px", padding: "2px 4px", border: "1px solid #7f7f7f" }}
          >
            <option value="Select a Year">Select a Year</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
          </select>
        </div>

        <div style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "110px", textAlign: "right", paddingRight: "10px", fontSize: "14px" }}>Movie Rating:</label>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="range"
              min="1"
              max="10"
              value={movieRating}
              onChange={(e) => setMovieRating(e.target.value)}
              style={{ width: "150px", cursor: "pointer" }}
            />
            <span style={{ fontSize: "13px", minWidth: "20px" }}>{movieRating}</span>
          </div>
        </div>

        <div style={{ textAlign: "center", fontWeight: "bold", margin: "10px 0", fontSize: "14px" }}>
          Movie Cast:
        </div>

        <div style={{ marginBottom: "8px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
          <input
            type="text"
            value={castInput}
            onChange={(e) => setCastInput(e.target.value)}
            style={{ width: "250px", padding: "2px 4px", border: "1px solid #7f7f7f" }}
          />
          <button type="button" onClick={handleAddCast} style={{ padding: "2px 8px", fontSize: "13px", cursor: "pointer" }}>
            Add Cast
          </button>
        </div>

        <div style={{ textAlign: "center", fontWeight: "bold", margin: "10px 0", fontSize: "14px" }}>
          Sypnosis:
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            rows="5"
            style={{ width: "380px", padding: "4px", border: "1px solid #7f7f7f", resize: "vertical" }}
          />
        </div>

        <div style={{ textAlign: "center", display: "flex", justifyContent: "center", gap: "10px" }}>
          <button type="submit" style={{ padding: "3px 15px", fontSize: "13px", cursor: "pointer" }}>
            {editIndex !== null ? "Update" : "Submit"}
          </button>
          <button type="button" onClick={handleClear} style={{ padding: "3px 15px", fontSize: "13px", cursor: "pointer" }}>
            Clear
          </button>
        </div>
      </form>

      <hr style={{ border: "0", borderTop: "2px solid #000000a0", margin: "30px 0" }} />

      <MovieDisplay movies={movies} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

// Display Movies
function MovieDisplay({ movies, onEdit, onDelete }) {
  return (
    <div>
      {movies.map((movie, index) => {
        const recommendationText =
          movie.movieRating < 5 ? `${movie.movieRating} - Not Recommended` : `${movie.movieRating} - Highly Recommended`;

        return (
          <div
            key={index}
            style={{
              paddingTop: "10px",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            <h2 style={{ textTransform: "uppercase", fontSize: "22px", marginBottom: "15px" }}>
              MOVIE NUMBER : {index + 1}
            </h2>

            <div style={{ margin: "15px 0" }}>
              <img
                src={movie.moviePoster}
                alt="Poster"
                style={{ width: "200px", height: "auto", objectFit: "cover", border: "1px solid #ddd" }}
              />
            </div>

            <p style={{ margin: "6px 0", fontSize: "14px" }}>
              <strong>Movie Name:</strong> {movie.movieName}
            </p>
            <p style={{ margin: "6px 0", fontSize: "14px" }}>
              <strong>Year Release:</strong> {movie.yearRelease}
            </p>
            <p style={{ margin: "6px 0", fontSize: "14px" }}>
              <strong>Movie Rate:</strong> {recommendationText}
            </p>

            <div style={{ margin: "10px 0", fontSize: "14px" }}>
              <strong>Movie Cast:</strong>
              <ol style={{ listStylePosition: "inside", padding: 0, margin: "5px 0" }}>
                {movie.movieCast.map((castMember, cIdx) => (
                  <li key={cIdx}>{castMember}</li>
                ))}
              </ol>
            </div>

            <p style={{ margin: "10px auto", maxWidth: "600px", textAlign: "center", fontSize: "14px" }}>
              <strong>Sypnosis:</strong> {movie.synopsis}
            </p>

            <div style={{ margin: "15px 0", display: "flex", justifyContent: "center", gap: "10px" }}>
              <button onClick={() => onDelete(index)} style={{ padding: "2px 12px", fontSize: "12px", cursor: "pointer" }}>
                Delete
              </button>
              <button onClick={() => onEdit(index)} style={{ padding: "2px 12px", fontSize: "12px", cursor: "pointer" }}>
                Edit
              </button>
            </div>

            <hr style={{ border: "0", borderTop: "2px solid #000000a0", margin: "30px 0" }} />
            
          </div>
        );
      })}
    </div>
  );
}

export default App;
