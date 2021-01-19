import * as yup from "yup"

const schema = yup.object().shape ({
    login: yup.string().required(),
    password: yup.string().min(4).max(10).required()
})

export default  schema