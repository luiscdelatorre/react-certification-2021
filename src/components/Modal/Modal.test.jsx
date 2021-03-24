import {
  act,
  fireEvent,
  queryByTestId,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Modal from './Modal.component';

describe('Modal Component', () => {
  it('Popup should be hidden as initial state', () => {
    const { container } = render(<Modal title="Foo" visible={false} />);
    const modal = queryByTestId(container, 'modal');

    expect(modal).toBeNull();
  });

  it('Popup should be visible as initial state', () => {
    const { container } = render(<Modal title="Foo" visible />);
    const modal = queryByTestId(container, 'modal');

    expect(modal).toBeInTheDocument();
  });

  it('Should render children', () => {
    render(
      <Modal title="Foo" visible>
        Bar
      </Modal>
    );
    expect(screen.getByText('Foo')).toBeInTheDocument();
    expect(screen.getByText('Bar')).toBeInTheDocument();
  });

  it('Should close modal', async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Modal title="Foo" visible />
        </BrowserRouter>
      )
    );
    const buttonClose = screen.queryByTestId('modal-close');
    fireEvent.click(buttonClose);
    await waitForElementToBeRemoved(() => screen.queryByTestId('modal'));
    expect(screen.queryByTestId('modal')).toBeNull();
  });
});
