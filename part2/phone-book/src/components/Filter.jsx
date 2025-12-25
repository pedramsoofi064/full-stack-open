const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      <div>
        filter shown with:
        <input onChange={(e) => handleFilterChange(e.target.value)} />
      </div>
    </div>
  );
};

export default Filter;
