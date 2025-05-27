"use client"

import { useState, useEffect } from "react"

export function useApi(url, options = { immediate: true }) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  })

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  useEffect(() => {
    if (options.immediate) {
      fetchData()
    }
  }, [url, options.immediate])

  return {
    ...state,
    refetch: fetchData,
  }
}

export function useApiMutation() {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  })

  const mutate = async (url, payload, method = "POST") => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setState({ data, loading: false, error: null })
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      })
      throw error
    }
  }

  return {
    ...state,
    mutate,
  }
}
