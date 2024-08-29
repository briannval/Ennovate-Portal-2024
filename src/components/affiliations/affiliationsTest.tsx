import React from 'react'
import Affiliations from './affiliations'

describe('<Affiliations />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Affiliations />)
  })
})