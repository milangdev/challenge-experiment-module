import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { jest, describe, expect } from '@jest/globals'
import ExperimentModule from './'

describe('ExperimentModule Component', () => {
  test('renders with initial state', () => {
    const data = { id: 1, lock: false }
    render(<ExperimentModule data={data} setModules={() => {}} />)
    expect(screen.getByTestId('experiment-module')).toBeInTheDocument()
  })

  test('opens and closes module when header is clicked', () => {
    const data = { id: 1, lock: false }
    render(<ExperimentModule data={data} setModules={() => {}} />)
    const header = screen.getByText('Experiment Module')
    fireEvent.click(header)
    expect(screen.getByText('Experiment Module').closest('.open')).toBeInTheDocument()
    fireEvent.click(header)
    expect(screen.queryByText('Experiment Module').closest('.open')).not.toBeInTheDocument()
  })

  test('shows modal when iteration is clicked', () => {
    const data = { id: 1, lock: false, iterations: [{ id: 'EM-1', title: 'Iteration 1' }] }
    render(<ExperimentModule data={data} setModules={() => {}} />)
    fireEvent.click(screen.getByText('Experiment Module'))
    fireEvent.click(screen.getByText('Iteration 1'))
    expect(document.querySelector('.modal-content')).toBeInTheDocument()
  })

  test('adds iteration when title is typed and "DONE" button is clicked', () => {
    const data = { id: 1, lock: false, iterations: [] }
    render(<ExperimentModule data={data} setModules={() => {}} />)
    fireEvent.click(screen.getByText('Experiment Module'))
    fireEvent.change(screen.getByPlaceholderText('Adding iteration...'), { target: { value: 'New Iteration' } })
    fireEvent.click(screen.getByText('DONE'))
  })

  test('locks module when "LOCK" button is clicked', () => {
    const data = { id: 1, lock: false, iterations: [{ id: 'EM-1', title: 'Iteration title' }] }
    const setModulesMock = jest.fn()
    render(<ExperimentModule data={data} setModules={setModulesMock} />)
    fireEvent.click(screen.getByText('Experiment Module'))
    fireEvent.click(screen.getByText('LOCK'))
    expect(screen.queryByText('LOCK')).not.toBeInTheDocument()
  })

  test('resets module when "RESET" button is clicked', () => {
    const data = { id: 1, lock: false, iterations: [{ id: 'EM-1', title: 'Iteration title' }] }
    const setModulesMock = jest.fn()
    render(<ExperimentModule data={data} setModules={setModulesMock} />)
    fireEvent.click(screen.getByText('Experiment Module'))
    fireEvent.click(screen.getByText('RESET'))
  })
})
