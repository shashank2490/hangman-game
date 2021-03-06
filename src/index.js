import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.renderHangManGame = (containerId, history) => {
  ReactDOM.render(
    <App history={history} />,
    document.getElementById(containerId),
  );
};

window.unmountHangManGame = containerId => {
  if (document.getElementById(containerId))
    ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById('HangManGame-container')) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
