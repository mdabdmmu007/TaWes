import React from "react";

export default function PageTitle({ title }) {
  return (
    <h2 className="text-center text-5xl mobile:text-3xl font-bold pt-6 pb-2 mobile:pt-2 mobile:pb-0">
      {title}
    </h2>
  );
}
