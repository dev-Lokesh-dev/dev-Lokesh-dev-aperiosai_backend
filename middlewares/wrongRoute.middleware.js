const wrongRoute = ( req, res, next) => {
    res.status(404).json({ error: 'wrong route! please check the url' });
}

export {wrongRoute}