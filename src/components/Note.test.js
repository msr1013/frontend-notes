import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleable from './Toggleable'
import Note from './Note'

describe('<Toggleable />',() => {
  let container

  beforeEach(() => {
    container = render (
      <Toggleable buttonLabel="show..">
        <div className='testDiv'>
          toggleable content
        </div>
      </Toggleable>
    ).container

  })


  test('renders its children',() => {
    screen.findAllByAltText('togglable content')
  })

  test('at start the children are not displayed',() => {
    const div = container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display:none')
  })

  test('after clicking button ,children are displayed',() => {
    const button = screen.getByText('show...')
    userEvent.click(button)

    const div = container.querySelector('.toggleanleContent')
    expect(div).not.toHaveStyle('display:none')
  })

  test('toggled content can be closed',() => {
    const button = screen.getByText('show...')
    userEvent.click(button)

    const closedButton = screen.getByText('cancel')
    userEvent.click(closedButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display:none')
  })

})

test('renders content',() => {
  const note = {
    content:'Component testing is done with react-testing-library',
    important:true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Does not work anymore :(')

  expect(element).toBeDefined()

})

test('clicking button calls event handler once',async() => {
  const note = {
    content:'Component testing is done with react-testing-library',
    important:true
  }

  const mockHandler = jest.fn()

  render (
    <Note note={note} toggleImportance={mockHandler}/>
  )

  const button = screen.getByText('make not important')
  userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

})

