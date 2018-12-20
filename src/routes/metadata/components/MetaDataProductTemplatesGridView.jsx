import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import moment from 'moment'
import GridView from '../../../components/Grid/GridView'

import './MetaDataProjectTemplatesGridView.scss'

const MetaDataProductTemplatesGridView = props => {
  const { totalCount, criteria, pageNum,
    error, isLoading, infiniteAutoload, setInfiniteAutoload,
    applyFilters, productTemplates } = props

  const currentSortField = _.get(criteria, 'sort', '')
  // This 'little' array is the heart of the list component.
  // it defines what columns should be displayed and more importantly
  // how they should be displayed.
  const columns = [
    {
      id: 'id',
      headerLabel: 'ID',
      classes: 'item-id',
      sortable: false,
      renderText: item => {
        const url = `/metadata/productTemplates/${item.id}`
        const recentlyCreated = moment().diff(item.createdAt, 'seconds') < 3600
        return (
          <Link to={url} className="spacing">
            {recentlyCreated && <span className="blue-border" />}
            {item.id}
          </Link>
        )
      }
    }, {
      id: 'templateName',
      headerLabel: 'Template',
      classes: 'item-project-templates',
      sortable: false,
      renderText: item => {
        const url = `/metadata/productTemplates/${item.id}`
        return (
          <div className="spacing project-template-container">
            <div className="template-title">
              <Link to={url} className="link-title">{_.unescape(item.name)}</Link>
            </div>
          </div>
        )
      }
    }, {
      id: 'updatedAt',
      headerLabel: 'Updated At',
      sortable: false,
      classes: 'item-status-date',
      renderText: item => {
        const time = moment(item.updatedAt)
        return (
          <div className="spacing time-container">
            <div className="txt-normal">{time.year() === moment().year() ? time.format('MMM D, h:mm a') : time.format('MMM D YYYY, h:mm a')}</div>
          </div>
        )
      }
    }, {
      id: 'createdAt',
      headerLabel: 'Created At',
      sortable: false,
      classes: 'item-status-date',
      renderText: item => {
        const time = moment(item.createdAt)
        return (
          <div className="spacing time-container">
            <div className="txt-normal">{time.year() === moment().year() ? time.format('MMM D, h:mm a') : time.format('MMM D YYYY, h:mm a')}</div>
          </div>
        )
      }
    }, {
      id: 'status',
      headerLabel: 'Status',
      sortable: false,
      classes: 'item-disable-status',
      renderText: item => {
        return (
          <div className="spacing">
            { item.disabled ? 'Disabled' : 'Active' }
          </div>
        )
      }
    }, {
        id: 'hidden',
        headerLabel: 'Hidden',
        sortable: false,
        classes: 'item-hidden-status',
        renderText: item => {
          return (
            <div className="spacing">
              { item.hidden ? 'Hidden' : 'Visible' }
            </div>
          )
        }
      }
  ]
  console.log(productTemplates)

  const gridProps = {
    error,
    isLoading,
    columns,
    // onPageChange,
    // sortHandler,
    currentSortField,
    resultSet: productTemplates,
    totalCount,
    currentPageNum: pageNum,
    pageSize: 50,
    infiniteAutoload,
    infiniteScroll: true,
    setInfiniteAutoload,
    // projectsStatus,
    applyFilters
  }

  return (
    <div className="project-templates-grid-view">
      <GridView {...gridProps} />
    </div>
  )
}


MetaDataProductTemplatesGridView.propTypes = {
  currentUser: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  // onPageChange: PropTypes.func.isRequired,
  // sortHandler: PropTypes.func.isRequired,
  pageNum: PropTypes.number.isRequired,
  // criteria: PropTypes.object.isRequired,
  productTemplates: PropTypes.array.isRequired,
}

export default MetaDataProductTemplatesGridView
