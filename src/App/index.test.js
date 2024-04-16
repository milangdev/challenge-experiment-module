import { render, screen } from '@testing-library/react'
import App from '.'

test('renders modules in the layout', () => {
  render(<App />)
  const modules = screen.getAllByTestId('experiment-module')
  expect(modules.length).toBe(3)
})
