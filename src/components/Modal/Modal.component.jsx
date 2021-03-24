import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { Transition } from 'react-transition-group';
import Styled from './Modal.styles';

const Modal = ({ title, children, visible }) => {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = React.useRef(null);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const goBack = (event) => {
    event.stopPropagation();
    setIsVisible(false);
    setTimeout(() => {
      history.goBack();
    }, 400);
  };

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
          <Styled.Modal data-testid="modal">
            <Styled.Backdrop data-testid="modal-backdrop" onClick={goBack} />
            <Styled.Container ref={nodeRef} state={state}>
              <Styled.CloseButton
                data-testid="modal-close"
                type="button"
                onClick={goBack}
              >
                <IoCloseOutline />
              </Styled.CloseButton>
              <Styled.Title>{title}</Styled.Title>
              {children}
            </Styled.Container>
          </Styled.Modal>
        )}
      </Transition>
    </>
  );
};

export default Modal;
