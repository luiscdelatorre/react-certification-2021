import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import Styled from './Popup.styles';

const Popup = ({ children, visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const closePopup = () => {
    onClose(false);
  };

  const nodeRef = React.useRef(null);
  return (
    <>
      <Transition
        in={isVisible}
        mountOnEnter
        unmountOnExit
        timeout={400}
        nodeRef={nodeRef}
      >
        {(state) => (
          <>
            <Styled.Backdrop state={state} data-testid="backdrop" onClick={closePopup} />
            <Styled.PopupContainer ref={nodeRef} state={state} data-testid="popup">
              {children}
            </Styled.PopupContainer>
          </>
        )}
      </Transition>
    </>
  );
};

export default Popup;
