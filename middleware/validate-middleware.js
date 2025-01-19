


const validate = (schema) => async (req, res, next) => {
    try {
        const x = await schema.parseAsync(req.body);
        req.body = x;
        next()
    } catch (error) {

        // res.status(400).json({ msg: error })

        const status = 400;
        const message = "fill the input correctly"
        const extraDetails = error.issues[0].message;

        const err = {
            status,
            message,
            extraDetails
        }

        next(err)
    }
}

module.exports = validate;