import { render } from '@testing-library/react';

import Footer from './Footer';

describe('DefaultFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Footer />);
    expect(baseElement).toBeTruthy();
  });
});
