function Rules() {
  return (
    <div className="page-container">
      <h2>How to Play Sudoku</h2>
      
      <section className="rules-section">
        <h3>Game Objective</h3>
        <p>Fill the grid so that each row, column, and sub-grid contains all numbers without repeating.</p>
      </section>

      <section className="rules-section">
        <h3>For 9x9 Sudoku:</h3>
        <ul>
          <li>Fill with numbers 1-9</li>
          <li>Each row must contain 1-9 exactly once</li>
          <li>Each column must contain 1-9 exactly once</li>
          <li>Each 3×3 sub-grid must contain 1-9 exactly once</li>
        </ul>
      </section>

      <section className="rules-section">
        <h3>For 6x6 Sudoku:</h3>
        <ul>
          <li>Fill with numbers 1-6</li>
          <li>Each row must contain 1-6 exactly once</li>
          <li>Each column must contain 1-6 exactly once</li>
          <li>Each 2×3 sub-grid must contain 1-6 exactly once</li>
        </ul>
      </section>

      <section className="credits-section">
        <h3>Credits</h3>
        <p><strong>Made by:</strong> Helen Wang</p>
        <div className="contact-links">
          <a href="mailto:wangyixuan@msn.com">📧 Email</a>
          <a href="https://github.com/Helenyixuanwang" target="_blank" rel="noopener noreferrer">💻 GitHub</a>
          <a href="https://www.linkedin.com/in/helenyixuanwang/" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
        </div>
      </section>
    </div>
  );
}

export default Rules;