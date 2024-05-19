const Category = require('../models/Category')

// [ Manish ] -> learning aboult $ne 
// create category ka handler function [CRUD] 

exports.createCategory = async (req, resp) => {
    try{
        // pick data 
        const {name, description} = req.body;

        // validate data 
        if(!name || !description){
            return resp.status(400).json({
                success: false,
                message: "Category details are wrong"
            })
        }

        // push into DB 
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log("Category created: ",categoryDetails);

        // return response 
        return resp.status(200).json({
            success: true,
            message: "Category has been created successfully"
        })
    }
    catch(err) {
        return resp.status(500).json({
            success: false,
            message: "Category creation failed"
        })
    }
}


exports.showAllCategories = async (req, resp) => {
    try{
        const allCategories = await Category.find({}, {name: true, description: true, link: true});    // return all the Categories bcoz i haven't added any condition, but make sure that name and description is available
        
        
        return resp.status(200).json({
            success: true,
            categories: allCategories,
            message: "Categories fetched successfully"
        })
    }
    catch(err) {
        return resp.status(500).json({
            success: false,
            message: "Error occurred while fetching all Category"
        })
    }
}


// category page details loading 
exports.categoryPageDetails = async (req, resp) => {
    try {
        // get category id 
        const {categoryId} = req.body;

        // fetch list of all courses belonging to this category 
        const selectedCategory = await Category.findById(categoryId)
                                                .populate('courses')
                                                .exec();

        // validation
        if(!selectedCategory) {
            return resp.status(404).json({
                success: false,
                message: 'data related to this category is not found'
            })
        }

        // get courses for different categories 
        const differentCategories = await Category.find(
                                                        {
                                                            _id: {$ne: categoryId}
                                                        }
                                                    )
                                                    .populate('courses')
                                                    .exec();
        
        // get top selling courses 
        // Homework. find top seller category

        // return response 
        return resp.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
            },
        });
    } catch(err) {
        return resp.status(500).json({
            success: false,
            message: "fetching of category details has been failed"
        })
    }
}