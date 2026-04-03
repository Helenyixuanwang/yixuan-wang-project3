import './Cell.css';

function Cell({ value, isGiven, isSelected, isIncorrect, onChange, onClick, row, col, maxValue }) {
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Only allow numbers 1-maxValue or empty
    if (newValue === '' || (Number(newValue) >= 1 && Number(newValue) <= maxValue)) {
      onChange(row, col, newValue);
    }
    // Invalid input is silently ignored
  };

  const getCellClassName = () => {
    let className = 'sudoku-cell';
    if (isGiven) className += ' given';
    if (isSelected) className += ' selected';
    if (isIncorrect) className += ' incorrect';
    return className;
  };

  return (
    <div className={getCellClassName()} onClick={() => onClick(row, col)}>
      <input
        type="text"
        inputMode="numeric"
        value={value || ''}
        onChange={handleChange}
        disabled={isGiven}
        maxLength="1"
        className="cell-input"
        title={`Enter numbers 1-${maxValue} only`}  // hint for what range of number to enter
      />
    </div>
  );
}

export default Cell;