const { eventModel,  commentModel} = require('../db/db');
const { createCommentSchema } = require('../requestSchema/comment');
const { validationError, successResponse } = require('../helper/responseTemplate');

const leaveComment = async (req, res) => {
    try {
        const { error: commentError, value: commentValue } = createCommentSchema.validate(req.body, {
            abortEarly: false,
        });

        if (commentError && commentError.details) {
            return res.status(422).json({ errors: commentError.details });
        }

        const { eventId, text } = commentValue;

        const event = await eventModel.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: { message: 'Event not found' } });
        }

        const newComment = new commentModel({
            text
        });

        let comment = await newComment.save();

        res.status(201).json(
            await successResponse('Comment successfully created', {
                comment,
            })
        );
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(422).json({ errors: await validationError(err) });
        }
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    leaveComment,
};