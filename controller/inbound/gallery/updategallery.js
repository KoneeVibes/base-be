const { v2: cloudinary } = require("cloudinary");
const { v4: uuidv4 } = require('uuid');
const Gallery = require("../../../model/gallery");

const updateGallery = async (req, res) => {
    const files = req.files || [];
    const { projectId, galleryId } = req.params || {};
    const { titles, descriptions } = req.body || {};

    // check for project and gallery id
    if (!projectId || !galleryId) {
        return res.status(400).json({
            status: "fail",
            message: "Project Id or Gallery Id not found. Contact Support.",
        });
    };

    // check is any files were uploaded
    if (!Array.isArray(files) || files.length === 0) {
        return res.status(400).json({
            status: "fail",
            message: "No images uploaded.",
        });
    };

    try {
        const foundGallery = await Gallery.findOne({
            id: galleryId,
            project: projectId,
            status: "active",
        });

        if (!foundGallery) {
            return res.status(404).json({
                status: "fail",
                message: "Gallery not found.",
            });
        }

        const oldFilename = foundGallery.url?.split('/').pop();
        console.log(oldFilename);
        let updatedGallery = null;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const title = titles[i] || "";
            const description = descriptions[i] || "";

            console.log(file.originalname);

            const galleryDoc = {
                url: file.path,
                title,
                description,
                project: projectId,
            };

            if (file.originalname === oldFilename) {
                updatedGallery = await Gallery.findOneAndUpdate(
                    { id: galleryId, project: projectId, status: "active" },
                    { $set: galleryDoc },
                    { new: true }
                );
                const oldId = oldFilename.split('.')[0];
                await cloudinary.uploader.destroy(`gallery/${oldId}`);
            } else {
                await Gallery.updateOne(
                    { url: file.path },
                    {
                        $set: {
                            ...galleryDoc,
                            id: uuidv4(),
                            status: "active",
                        }
                    },
                    { upsert: true }
                );
            }
        };
        return res.status(200).json({
            status: "success",
            message: "Gallery update operation completed.",
            data: updatedGallery,
        });
    } catch (error) {
        console.error("Update Gallery Error:", error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue updating the gallery. Please retry.",
        });
    }
};

module.exports = updateGallery;
