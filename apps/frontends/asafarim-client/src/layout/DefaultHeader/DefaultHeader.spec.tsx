import { render } from '@testing-library/react';

import DefaultHeader from './DefaultHeader';

describe('DefaultHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DefaultHeader />);
    expect(baseElement).toBeTruthy();
  });
});
