import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const DropdownSorterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const sortingOptions = [{
  value: 'highlight',
  title: 'Destaques',
  sortFn: (productA) => productA.fields.highlight ? -1 : 1,
}, {
  value: 'title-asc',
  title: 'Nome Ascendente',
  sortFn: (productA, productB) => productA.fields.title.localeCompare(productB.fields.title),
}, {
  value: 'title-desc',
  title: 'Nome Descentente',
  sortFn: (productA, productB) => productA.fields.title.localeCompare(productB.fields.title),
}, {
  value: 'price-asc',
  title: 'Preço Ascendente',
  sortFn: (productA, productB) => productA.fields.price - productB.fields.price,
}, {
  value: 'price-desc',
  title: 'Preço Descentente',
  sortFn: (productA, productB) => productA.fields.price - productB.fields.price,
}]

const DropdownSorter = ({ sortingBy, onSortingChange }) =>
  <DropdownSorterWrapper>
    <span>Ordenar: </span>
    <select onChange={onSortingChange} value={sortingBy}>
      {sortingOptions.map(sortingOption => (
        <option key={sortingOption.value} value={sortingOption.value}>{sortingOption.title}</option>
      ))}
    </select>
  </DropdownSorterWrapper>

DropdownSorter.propTypes = {
  sortingBy: PropTypes.string,
  onSortingChange: PropTypes.func,
}

export {
  sortingOptions,
  DropdownSorter,
}
