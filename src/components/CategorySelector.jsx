function CategorySelector({ category }) {
  return (
    <input
      className="category"
      type="text"
      value={category}
      placeholder="Category"
      readOnly
    />
  );
}

export default CategorySelector;
