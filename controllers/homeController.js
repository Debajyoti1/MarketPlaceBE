module.exports.home = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Market Place B2B Backend - Debajyoti Dutta"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}