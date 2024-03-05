import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Result from './Result'; // Import the Result component
import Carousel from 'react-bootstrap/Carousel'; // Import the Carousel component from React Bootstrap


function FormPage() {
    const [currentFormData, setCurrentFormData] = useState({});
    const [fetchFormData, setFetchFormData] = useState({});
    const [fetchApiResponse, setFetchApiResponse] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const today = new Date().toISOString().split('T')[0]; // Get today's date in yyyy-MM-dd format
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5); // Subtract 5 years
    // const minDate = fiveYearsAgo.toISOString().split('T')[0]; // Get the date 5 years ago in yyyy-MM-dd format
    const [minDate, setMinDate] = useState('');

    const handleFetchFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'count') {
            // If 'count' value is selected, reset all date values to empty strings
            setFetchFormData(prevState => ({
              ...prevState,
              start_date: '',
              end_date: '',
              count: value
            }));
            setMinDate(''); // Reset minDate as well
          } else {
            setFetchFormData(prevState => {
                const { count, ...rest } = prevState; // Destructure previous state without 'count'
                return {
                  ...rest,
                  [name]: value
                };
              });
              if (name === 'start_date' || name === 'end_date') {
                setMinDate(value);
              }
          }
      };
    
      const handleCurrentFormSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.get('http://localhost:8080/apicall/current', { params: currentFormData });
          const responseData = Array.isArray(response.data) ? response.data : [response.data];
          setFetchApiResponse(responseData);
          setFetchError(null); // Clear any previous errors
        } catch (error) {
          console.error('Error fetching data:', error);
          setFetchError(error.message); // Set error message
          setFetchApiResponse([]); // Clear the response data
        }
      };
    
      const handleFetchFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(fetchFormData);
          const response = await axios.get('http://localhost:8080/apicall/fetch', { params: fetchFormData });
          console.log(response.data);
          const responseData = Array.isArray(response.data) ? response.data : [response.data];
          setFetchApiResponse(responseData);
          setFetchError(null); // Clear any previous errors
        } catch (error) {
          console.error('Error fetching data:', error);
          setFetchError(error.message); // Set error message
          setFetchApiResponse([]); // Clear the response data
        }
      };

  return (
    
    <div className="container mt-5">
        {fetchError && (
            <div style={{ color: 'red' }}>
                <p>Failed to fetch data:</p>
                <p>{fetchError}</p>
            </div>
            )}
      <h1>Form Page</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Current API Call</h2>
          <form onSubmit={handleCurrentFormSubmit}>
            {/* Current API call form fields */}
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Fetch API Call</h2>
          <form onSubmit={handleFetchFormSubmit}>
            <div className="form-group">
              <label>Date:</label>
              <input type="date" className="form-control" name="date" value={fetchFormData.date} onChange={handleFetchFormChange}  max={today} />
            </div>
            <div className="form-group">
              <label>Start Date:</label>
              <input type="date" className="form-control" name="start_date" value={fetchFormData.start_date} onChange={handleFetchFormChange}  max={today} />
            </div>
            <div className="form-group">
              <label>End Date:</label>
              <input type="date" className="form-control" name="end_date" value={fetchFormData.end_date} onChange={handleFetchFormChange} min={minDate} max={today} />
            </div>
            <div className="form-group">
              <label>Count:</label>
              <input type="number" className="form-control" name="count" value={fetchFormData.count} onChange={handleFetchFormChange} />
            </div>
            <div className="form-group">
              <label>Thumbs: </label>
              <input type="checkbox"  name="thumbs" value={fetchFormData.thumbs} onChange={handleFetchFormChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      <div className="mt-5">
        <h2>API Response</h2>
        <Carousel>
          {fetchApiResponse.map((result, index) => (
            <Carousel.Item key={index}>
              <Result result={result} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <style jsx>{`
        .carousel-control-prev,
        .carousel-control-next {
          background-color: gray; /* Set background color to transparent */
          border: none; /* Remove border */
          border-radius: 50%; /* Make the buttons round */
          width: 40px; /* Set width of buttons */
          height: 40px; /* Set height of buttons */
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          width: 30px; /* Set width of control icons */
          height: 30px; /* Set height of control icons */
          filter: invert(100%); /* Invert the color of the carousel control icons */
        }
      `}</style>
    </div>
  );
}

export default FormPage;
