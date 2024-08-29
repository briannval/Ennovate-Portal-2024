import React from 'react'
import Stats from './stats'

describe('<Stats />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Stats />)
  })
})