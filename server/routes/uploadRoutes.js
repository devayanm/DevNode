const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinaryConfig');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                res.status(200).json({ url: result.secure_url });
            }
        ).end(req.file.buffer); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
