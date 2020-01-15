function requestTransformer (error: boolean, message: string, data?: any) {
  return {
    error: error,
    data: data,
    message: message
  }
}

export default requestTransformer
