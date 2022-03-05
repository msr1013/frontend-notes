
import ReactDOM from 'react-dom';


import App from './App';

import axios from 'axios'

axios.get('http://localhost:3001/notes').then(response => {
  const notes=response.data


  ReactDOM.render(

      <App notes={notes}/>,

    document.getElementById('root')
  );
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
