export interface IerrorField {
  message: string;
  parameter: string;
}

function attributesValidationTransformer (validationErrors) {
  const validationNoValues = validationErrors.map((errorField: any): IerrorField => {
    return { message: errorField.msg, parameter: errorField.param }
  })

  return validationNoValues
}
export default attributesValidationTransformer
