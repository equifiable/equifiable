import React from "react";

const Box = (props) => {
  const { title, btnClass, btnTitle, price, feature } = props;
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">{title}</h4>
      </div>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">
          ${price} <small className="text-muted">/ mo</small>
        </h1>
        <ul className="list-unstyled mt-3 mb-4">
          {feature &&
            feature.map((data, index) => {
              return <li key={index}>{data}</li>;
            })}
        </ul>
        <button type="button" className={`btn btn-lg btn-block ${btnClass}`}>
          {btnTitle}
        </button>
      </div>
    </div>
  );
};

export default Box;
