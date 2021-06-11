import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

// import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class BallsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            balls: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllBalls().then(balls => {
            this.setState({
                balls: balls.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { balls, isLoading } = this.state
        console.log('TCL: BallsList -> render -> balls', balls)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Colour',
                accessor: 'colour',
                filterable: true,
            },
            {
                Header: 'Xcoord',
                accessor: 'xcoord',
                filterable: true,
            },
            {
                Header: 'Yoord',
                accessor: 'ycoord',
                filterable: true,
            },
            {
                Header: 'Distance',
                accessor: 'dist',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
        ]

        let showTable = true
        // if (!balls.colour) {
        //     showTable = false
        // }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={balls}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default BallsList