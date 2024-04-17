import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { jest, describe, expect } from '@jest/globals'
import IterationModal from './'

describe('Modal Component', () => {
  test('does not render when isOpen is false', () => {
    render(<IterationModal data={{ id: 'EM-1', title: 'Iteration-title' }} isOpen={false} />)
    const modalElement = document.querySelector('.modal')
    expect(modalElement).not.toBeInTheDocument()
  })

  test('renders when isOpen is true', () => {
    render(<IterationModal data={{ id: 'EM-1', title: 'Iteration-title' }} isOpen />)
    const modalElement = document.querySelector('.modal')
    expect(modalElement).toBeInTheDocument()
  })

  test('closes modal when overlay is clicked', () => {
    const onClose = jest.fn()
    render(<IterationModal data={{ id: 'EM-1', title: 'Iteration-title', selection: 'short' }} isOpen onClose={onClose} />)
    fireEvent.click(document.querySelector('.modal-overlay'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('triggers onConfirm with correct title length', () => {
    const onConfirm = jest.fn()
    render(<IterationModal data={{ id: 'EM-1', title: 'Iteration-title' }} isOpen onConfirm={onConfirm} />)
    fireEvent.click(screen.getByText('done'))
    expect(onConfirm).toHaveBeenCalledWith('short')
  })

  test('defult it select short onConfirm when title length has not changed', () => {
    const onConfirm = jest.fn()
    render(<IterationModal data={{ id: 'EM-1', title: 'Iteration-title' }} isOpen onConfirm={onConfirm} />)
    const buttonElement = screen.getByText('short')
    expect(buttonElement).toHaveClass('iteration-button-active')
  })

  test('updates title length when buttons are clicked', () => {
    render(<IterationModal data={{ id: 'EM-1', title: 'Iteration-title' }} isOpen />)
    fireEvent.click(screen.getByText('medium length'))
    const buttonElement = screen.getByText('medium length')
    expect(buttonElement).toHaveClass('iteration-button-active')
  })

  test('triggers onRemove when "remove" button is clicked', () => {
    const onRemove = jest.fn()
    render(<IterationModal data={{ id: 'EM-1', title: 'Iteration-title' }} isOpen onRemove={onRemove} />)
    fireEvent.click(screen.getByText('remove'))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})
