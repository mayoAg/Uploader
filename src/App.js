import Loader from './loader.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <h3>Welcome to File uploader (currently restricted to Tab Dellimitted file uploads)</h3>
      <h6>Choose file & then click "Load Selected File" button</h6>
      <Loader/>
    </div>
  );
}

export default App;
