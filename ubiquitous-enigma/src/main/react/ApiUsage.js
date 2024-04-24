import React from 'react';

function ApiUsagePage() {
  return (
    <div className="container mt-5">
      <h1>API Usage</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>date</td>
            <td>YYYY-MM-DD</td>
            <td>today</td>
            <td>The date of the APOD image to retrieve</td>
          </tr>
          <tr>
            <td>start_date</td>
            <td>YYYY-MM-DD</td>
            <td>none</td>
            <td>The start of a date range, when requesting date for a range of dates. Cannot be used with date.</td>
          </tr>
          <tr>
            <td>end_date</td>
            <td>YYYY-MM-DD</td>
            <td>today</td>
            <td>The end of the date range, when used with start_date.</td>
          </tr>
          <tr>
            <td>count</td>
            <td>int</td>
            <td>none</td>
            <td>If this is specified then count randomly chosen images will be returned. Cannot be used with date or start_date and end_date.</td>
          </tr>
          <tr>
            <td>thumbs</td>
            <td>bool</td>
            <td>False</td>
            <td>Return the URL of video thumbnail. If an APOD is not a video, this parameter is ignored.</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
}

export default ApiUsagePage;
