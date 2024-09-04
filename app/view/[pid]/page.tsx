import React from "react";

const CategoryPage = ({ params }: { params: { pid?: string } }) => {
  const { pid } = params;

  return <div>Showing Pallette with ID: {pid}</div>;
};

export default CategoryPage;
