import React, { useRef } from "react";
import { useOnClickOutside } from "../../hooks";

//Styles
import "./style.scss";

const FloatingBox = ({ visible, setVisible, price, onConfirm }) => {
  const floatingBoxRef = useRef(null);
  useOnClickOutside(floatingBoxRef, () => setVisible(false));

  return (
    visible && (
      <div className="floating-box-container">
        <div className="box-details" ref={floatingBoxRef}>
          <div className="closing" onClick={() => setVisible(false)}>
            <span></span>
            <span></span>
          </div>
          <h4>السعر النهائي</h4>
          <div className="price">{price} ج.م</div>
          <div className="action-buttons">
            <div className="confirm-button">
              <button onClick={onConfirm}>تأكيد</button>
            </div>
            <div className="cancel-button">
              <button onClick={() => setVisible(false)}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FloatingBox;
