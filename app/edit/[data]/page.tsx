import React from "react";

function page({ params }: { params: { data?: string } }) {
  let data = params.data;

  return <div>Editing Color Code {data}</div>;
}

export default page;
