import logo from './logo.svg';
import './App.css';
import PostEntry from './components/postEntry.js';
import GetEntry from './components/getEntry.js';
import DeleteEntry from './components/deleteEntry.js';
import Calendars from './components/calendars.js';
function App() {
  return (
    <div>
      <PostEntry />
      <GetEntry />
      <DeleteEntry />
    </div>
  )
}

export default App;
