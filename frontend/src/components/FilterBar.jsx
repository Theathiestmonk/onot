import { useState } from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilterChange, categories = [] }) => {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
  });

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="minPrice">Min Price ($)</label>
        <input
          id="minPrice"
          type="number"
          min="0"
          value={filters.minPrice}
          onChange={(e) => handleChange('minPrice', e.target.value)}
          placeholder="0"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="maxPrice">Max Price ($)</label>
        <input
          id="maxPrice"
          type="number"
          min="0"
          value={filters.maxPrice}
          onChange={(e) => handleChange('maxPrice', e.target.value)}
          placeholder="100"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="minRating">Min Rating</label>
        <select
          id="minRating"
          value={filters.minRating}
          onChange={(e) => handleChange('minRating', e.target.value)}
        >
          <option value="">Any</option>
          <option value="4">4+ ⭐</option>
          <option value="3">3+ ⭐</option>
          <option value="2">2+ ⭐</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button className="filter-clear" onClick={clearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;

