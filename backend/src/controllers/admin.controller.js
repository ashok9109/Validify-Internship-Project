
// upload Excel controller
const uploadExcelController = async(req, res) =>{
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error "
        })
    }
};

module.exports = {uploadExcelController};

