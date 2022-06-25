import axios from 'axios'
import React, { useEffect, useReducer } from 'react'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}

/**Using this herokou link we dont need to create our own proxy server to
 * solve the cors issue, lets us get around the cors issue
 */
const BASE_URL = `https://remotive.com/api/remote-jobs`
/**
 * Actions being taken care of
 */
function reducer(state, action) {

    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: [] }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs }
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] }

        default:
            return state;
    }
}

/**
 * Custom Hook to fetch jobs
 * 
 */

function useFetchJobs(params, page) {

    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

    /** Whenever our params or page change then we want to run this useEffect hook */
    useEffect(() => {
        /**Gives us a new cancel token */
        const cancelToken = axios.CancelToken.source()
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        console.log('useEffect params: ', params)
        axios.get(BASE_URL, {
            cancelToken: cancelToken.token,
            params: { markdown: true, page, ...params }
        }).then(res => {
            console.log('res.data: ', res.data)
            console.log('res.data.jobs: ', res.data.jobs)
            console.log('res.data.jobs.length: ', res.data.jobs.length)
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data.jobs } })
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
        })
        return () => {
            cancelToken.cancel()
        }
    }, [params, page])
    return state
}

export default useFetchJobs