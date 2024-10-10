import React from "react";
import { Dropdown } from "react-bootstrap";
import { getFromLocalStorage } from "../../utility/localstorage";

export const CartItems = () => {
  const items = getFromLocalStorage("cart");

  return (
    <>
      {items &&
        items.map((item) => (
          <Dropdown.Item href="#/action-1">{item.price}</Dropdown.Item>
        ))}
    </>
  );
};
