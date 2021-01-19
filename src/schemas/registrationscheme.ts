import * as yup from "yup"

const schema = yup.object().shape ({
    login: yup.string().required(),
    password: yup.string().min(4).max(10).required(),
    confirmPassword: yup.string().min(4).max(10).oneOf([yup.ref('password'), 'passwords doesn\'t match']).required()
})

export default  schema