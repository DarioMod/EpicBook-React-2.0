
import "./style.css";

const NavInput = ({inputValue, setInputValue, searchBooks}) => {


const getInputValue = (e) => {
  setInputValue(e.target.value)
}

const bookResearch = () => {
  searchBooks(inputValue)
}




  return (
    <div className="d-flex align-items-center justify-content-center gap-2">
      <input 
      type="text"
      value={inputValue}
      onChange={getInputValue} />
      <button 
      className="btn btn-primary"
      onClick={bookResearch}> Cerca </button>
    </div>
  );
};


export default NavInput