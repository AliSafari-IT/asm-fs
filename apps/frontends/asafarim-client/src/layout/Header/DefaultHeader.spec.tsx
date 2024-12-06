import { render } from '@testing-library/react';

import Header from './Header';

describe('DefaultHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Header />);
    expect(baseElement).toBeTruthy();
  });
});
