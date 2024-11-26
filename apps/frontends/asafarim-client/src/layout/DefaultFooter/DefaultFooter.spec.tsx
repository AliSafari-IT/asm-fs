import { render } from '@testing-library/react';

import DefaultFooter from './DefaultFooter';

describe('DefaultFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DefaultFooter />);
    expect(baseElement).toBeTruthy();
  });
});
