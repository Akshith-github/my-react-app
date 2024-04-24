import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Result from './Result'; // Import the Result component
import Carousel from 'react-bootstrap/Carousel'; // Import the Carousel component from React Bootstrap
import useStore from './zustandstore/store';

function FormPage() {
  // const [currentFormData, setCurrentFormData] = useState({});
  const currentFormData = useStore(state => state.currentFormData);
  const setCurrentFormData = useStore(state => state.setCurrentFormData);
  
  // const [fetchApiResponse, setFetchApiResponse] = useState([]);
  const fetchApiResponse = useStore(state => state.fetchApiResponse);
  const setFetchApiResponse = useStore(state => state.setFetchApiResponse);

  // const [fetchError, setFetchError] = useState(null);
  const fetchError = useStore(state => state.fetchError);
  const setFetchError = useStore(state => state.setFetchError);

  const today = new Date().toISOString().split('T')[0]; // Get today's date in yyyy-MM-dd format
  // const [fetchFormData, setFetchFormData] = useState({ 'fetchType': 'date', 'date': today });
  const fetchFormData = useStore(state => state.fetchFormData);
  const setFetchFormData = useStore(state => state.setFetchFormData);

  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5); // Subtract 5 years
  
  // const [minDate, setMinDate] = useState('');
  const minDate = useStore(state => state.minDate); // Get the value of minDate
  const setMinDate = useStore(state => state.setMinDate); // Set the value of minDate

  const fetchData = async () => {
    try {
      const response = await axios.get('/apicall/fetch', { params: fetchFormData });
      const responseData = Array.isArray(response.data) ? response.data : [response.data];
      setFetchApiResponse(responseData);
      setFetchError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching data:', error);
      setFetchError(error.message); // Set error message
      setFetchApiResponse([]); // Clear the response data
    }
  };

  useEffect(() => {
    // Make API call when the component mounts with the current date
    if (fetchApiResponse == null || fetchApiResponse.length === 0) {
      fetchData(); 
    }// Call the fetchData function when the component mounts
  }, []);

  const handleFetchFormChange = (e) => {
    const { name, value } = e.target;
    // Reset other fields based on selection
    if (name === 'fetchType') {
      setFetchFormData({ start_date : ''});
      setFetchFormData({ end_date : ''});
      setFetchFormData({ count : ''});
      setFetchFormData({ date : ''});
      setFetchFormData({ [name]: value });
      resetCurrentFormData();
      resetMinDate();
    } else if (name === 'start_date' || name === 'end_date') {
      setFetchFormData({ date : ''});
      setFetchFormData({ count : ''});
      setFetchFormData({ [name]: value });
      if (name === 'start_date') {
        setMinDate(value);
      }
    } else if (name === 'date') {
      setFetchFormData({ start_date : ''});
      setFetchFormData({ end_date : ''});
      setFetchFormData({ count : ''});
      setFetchFormData({ [name]: value });
    } else if (name === 'count') {
      setFetchFormData({ start_date : ''});
      setFetchFormData({ end_date : ''});
      setFetchFormData({ date : ''});
      setFetchFormData({ [name]: value });
    }
     else {
      // setFetchFormData(prevState => ({
      //   ...prevState,
      //   count: '',
      //   start_date: '',
      //   end_date: '',
      //   [name]: value
      // }));
      setFetchFormData({ count : ''});
      setFetchFormData({ start_date : ''});
      setFetchFormData({ end_date : ''});
      setFetchFormData({ [name]: value });
    }
  };

  const handleCurrentFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredFormData = Object.fromEntries(
        Object.entries(currentFormData).filter(([key, value]) => key !== 'fetchType' && value !== null && value !== '')
      );

      const response = await axios.get('/apicall/current', { params: filteredFormData });
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
      const response = await axios.get('/apicall/fetch', { params: fetchFormData });
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
              <label>Select Details:</label>
              <select className="form-control" name="fetchType" onChange={handleFetchFormChange} value={fetchFormData.fetchType}>
                <option value="">Select</option>
                <option value="date">Date</option>
                <option value="between">Between Start and End Date</option>
                <option value="count">Count</option>
              </select>
            </div>
            {fetchFormData.fetchType === 'date' && (
              <div className="form-group">
                <label>Date:</label>
                <input type="date" className="form-control" name="date" value={fetchFormData.date} onChange={handleFetchFormChange} max={today} />
              </div>
            )}
            {fetchFormData.fetchType === 'between' && (
              <>
                <div className="form-group">
                  <label>Start Date:</label>
                  <input type="date" className="form-control" name="start_date" value={fetchFormData.start_date} onChange={handleFetchFormChange} max={today} />
                </div>
                <div className="form-group">
                  <label>End Date:</label>
                  <input type="date" className="form-control" name="end_date" value={fetchFormData.end_date} onChange={handleFetchFormChange} min={minDate} max={today} />
                </div>
              </>
            )}
            {fetchFormData.fetchType === 'count' && (
              <div className="form-group">
                <label>Count:</label>
                <input type="number" className="form-control" name="count" value={fetchFormData.count} onChange={handleFetchFormChange} />
              </div>
            )}
            <div className="form-group">
              <label>Thumbs: </label>
              <input type="checkbox" name="thumbs" value={fetchFormData.thumbs} onChange={handleFetchFormChange} />
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
