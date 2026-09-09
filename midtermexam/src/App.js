import React, { useState } from "react";

function App() {
  // Form Fields State
  const [movieName, setMovieName] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [yearRelease, setYearRelease] = useState("Select a Year");
  const [movieRating, setMovieRating] = useState("");
  const [castInput, setCastInput] = useState("");
  const [movieCast, setMovieCast] = useState([]);
  const [synopsis, setSynopsis] = useState("");

  // Application Data State
  const [movies, setMovies] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Tracks if we are updating
  const [error, setError] = useState("");

  // Add individual cast member to the temporary list
  const handleAddCast = () => {
    if (castInput.trim() !== "") {
      setMovieCast([...movieCast, castInput.trim()]);
      setCastInput("");
    }
  };

  // Clear all fields function
  const handleClear = () => {
    setMovieName("");
    setMoviePoster("");
    setYearRelease("Select a Year");
    setMovieRating("");
    setCastInput("");
    setMovieCast([]);
    setSynopsis("");
    setEditIndex(null);
    setError("");
  };

  // Handle Form Submission (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: All fields are required
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

    // Validation: Year Release option check
    const validYears = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];
    if (!validYears.includes(yearRelease)) {
      setError("Please select a valid Year Release.");
      return;
    }

    // Validation: Movie Rating range from 1 to 10
    const ratingNum = Number(movieRating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
      setError("Movie Rating should range from 1 to 10.");
      return;
    }

    // Validation: Movie Cast should have at least one value
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
      // Update existing movie
      const updatedMovies = [...movies];
      updatedMovies[editIndex] = movieData;
      setMovies(updatedMovies);
      setEditIndex(null);
    } else {
      // Create new movie
      setMovies([...movies, movieData]);
    }

    // Clear fields after create/update action
    handleClear();
  };

  // Handle Edit Action
  const handleEdit = (index) => {
    const movie = movies[index];
    setMovieName(movie.movieName);
    setMoviePoster(movie.moviePoster);
    setYearRelease(movie.yearRelease);
    setMovieRating(movie.movieRating);
    setMovieCast(movie.movieCast);
    setSynopsis(movie.synopsis);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Delete Action
  const handleDelete = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
  };

  return (
    <div className="app-container" style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", textTransform: "uppercase", borderBottom: "2px solid #ccc", paddingBottom: "10px" }}>
        List of Movies
      </h1>

      {/* Error Notification */}
      {error && <div style={{ color: "red", textAlign: "center", marginBottom: "15px", fontWeight: "bold" }}>{error}</div>}

      {/* Form Section */}
      <form onSubmit={handleSubmit} style={{ background: "#f9f9f9", padding: "20px", border: "1px solid #ddd", marginBottom: "40px" }}>
        <div style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "130px", fontWeight: "bold" }}>Movie Name:</label>
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            style={{ flex: 1, padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "130px", fontWeight: "bold" }}>Movie Poster:</label>
          <input
            type="text"
            value={moviePoster}
            onChange={(e) => setMoviePoster(e.target.value)}
            placeholder="Image URL"
            style={{ flex: 1, padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "130px", fontWeight: "bold" }}>Year Release:</label>
          <select value={yearRelease} onChange={(e) => setYearRelease(e.target.value)} style={{ flex: 1, padding: "5px" }}>
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

        <div style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "130px", fontWeight: "bold" }}>Movie Rating:</label>
          <input
            type="number"
            min="1"
            max="10"
            value={movieRating}
            onChange={(e) => setMovieRating(e.target.value)}
            style={{ flex: 1, padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "12px", display: "flex", alignItems: "flex-start" }}>
          <label style={{ width: "130px", fontWeight: "bold", paddingTop: "5px" }}>Movie Cast:</label>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
              <input
                type="text"
                value={castInput}
                onChange={(e) => setCastInput(e.target.value)}
                placeholder="Add cast member"
                style={{ flex: 1, padding: "5px" }}
              />
              <button type="button" onClick={handleAddCast} style={{ padding: "5px 10px" }}>
                Add Cast
              </button>
            </div>
            <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
              {movieCast.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginBottom: "15px", display: "flex", alignItems: "flex-start" }}>
          <label style={{ width: "130px", fontWeight: "bold", paddingTop: "5px" }}>Synopsis:</label>
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            rows="4"
            style={{ flex: 1, padding: "5px" }}
          />
        </div>

        <div style={{ textAlign: "center", display: "flex", justifyContent: "center", gap: "10px" }}>
          <button type="submit" style={{ padding: "6px 20px", fontWeight: "bold" }}>
            {editIndex !== null ? "Update" : "Submit"}
          </button>
          <button type="button" onClick={handleClear} style={{ padding: "6px 20px" }}>
            Clear
          </button>
        </div>
      </form>

      {/* Display Component Section */}
      <MovieDisplay movies={movies} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

// Separate Component to Display Movies
function MovieDisplay({ movies, onEdit, onDelete }) {
  return (
    <div>
      {movies.map((movie, index) => {
        // Recommendation logic requirement
        const recommendationText =
          movie.movieRating < 5 ? `${movie.movieRating} - Not Recommended` : `${movie.movieRating} - Highly Recommended`;

        return (
          <div
            key={index}
            style={{
              borderTop: "2px solid #ccc",
              paddingTop: "20px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <h2 style={{ textTransform: "uppercase" }}>Movie Number : {index + 1}</h2>

            <div style={{ margin: "15px 0" }}>
              <img
                src={movie.moviePoster}
                alt="Poster"
                style={{ width: "200px", height: "auto", objectFit: "cover", border: "1px solid #ddd" }}
              />
            </div>

            <p style={{ margin: "8px 0" }}>
              <strong>Movie Name:</strong> {movie.movieName}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Year Release:</strong> {movie.yearRelease}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Movie Rate:</strong> {recommendationText}
            </p>

            <div style={{ margin: "10px 0" }}>
              <strong>Movie Cast:</strong>
              <ol style={{ listStylePosition: "inside", padding: 0, margin: "5px 0" }}>
                {movie.movieCast.map((castMember, cIdx) => (
                  <li key={cIdx}>{castMember}</li>
                ))}
              </ol>
            </div>

            <p style={{ margin: "10px 20px", textAlign: "justify" }}>
              <strong>Synopsis:</strong> {movie.synopsis}
            </p>

            <div style={{ margin: "15px 0", display: "flex", justifyContent: "center", gap: "10px" }}>
              <button onClick={() => onDelete(index)} style={{ padding: "4px 15px" }}>
                Delete
              </button>
              <button onClick={() => onEdit(index)} style={{ padding: "4px 15px" }}>
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;