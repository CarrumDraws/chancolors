import React from "react";

const CategoryPage = ({ params }: { params: { uid?: string } }) => {
  const { uid } = params;

  return <div>Showing product with ID: {uid}</div>;
};

export default CategoryPage;
