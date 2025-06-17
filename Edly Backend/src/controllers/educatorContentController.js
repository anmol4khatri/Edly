const Lesson = require("../models/Lesson");
const Quiz = require("../models/Quiz");
const Pdf = require("../models/Pdf");
const Module = require("../models/Module");

const addContentToModule = async (req, res) => {
	const { moduleId } = req.params;
	const { content } = req.body;

	if (!moduleId) {
		return res.status(400).json({ error: "moduleId is required" });
	}

	if (!Array.isArray(content) || content.length === 0) {
		return res.status(400).json({ error: "Content must be a non-empty array" });
	}

	try {
		const newContentItems = await Promise.all(
			content.map(async (item) => {
				const { type, data } = item;
				let createdItem;

				if (type === "lesson") {
					createdItem = await Lesson.create(data);
				} else if (type === "quiz") {
					createdItem = await Quiz.create(data);
				} else if (type === "pdf") {
					createdItem = await Pdf.create(data);
				} else {
					throw new Error(`Invalid content type: ${type}`);
				}

				return { type, refId: createdItem._id };
			})
		);

		// Update the module with new content
		const updatedModule = await Module.findByIdAndUpdate(
			moduleId,
			{ $push: { content: { $each: newContentItems } } },
			{ new: true }
		);

		if (!updatedModule) {
			return res.status(404).json({ error: "Module not found" });
		}

		// Manually populate newly added content
		const populatedContent = await Promise.all(
			updatedModule.content.map(async (item) => {
				let fullData = null;

				if (item.type === "lesson") {
					fullData = await Lesson.findById(item.refId);
				} else if (item.type === "quiz") {
					fullData = await Quiz.findById(item.refId);
				} else if (item.type === "pdf") {
					fullData = await Pdf.findById(item.refId);
				}

				return {
					type: item.type,
					refId: item.refId,
					data: fullData || null
				};
			})
		);

		res.status(200).json({
			message: "Content added and module updated successfully",
			module: {
				...updatedModule.toObject(),
				content: populatedContent
			}
		});

	} catch (error) {
		res.status(500).json({ error: error.message || "Failed to add content to module" });
	}
};

const deleteContentById = async (req, res) => {
	const { type, refId } = req.params;
    console.log(type);
    console.log(refId);

	if (!type || !refId) {
		return res.status(400).json({ error: "type and refId are required" });
	}

	try {
		if (type === "lesson") {
			await Lesson.findByIdAndDelete(refId);
		} else if (type === "quiz") {
			await Quiz.findByIdAndDelete(refId);
		} else if (type === "pdf") {
			await Pdf.findByIdAndDelete(refId);
		} else {
			return res.status(400).json({ error: "Invalid content type" });
		}

		//  Remove this content from all modules that contain it
		const affectedModules = await Module.find({ "content.refId": refId, "content.type": type });

		// If no module references it, just respond
		if (affectedModules.length === 0) {
			return res.status(200).json({ message: "Content deleted. No module reference found." });
		}

		// Update all affected modules
		const updatedModules = await Promise.all(
			affectedModules.map(async (mod) => {
				// Remove the content reference
				mod.content = mod.content.filter(item => !(item.type === type && item.refId.toString() === refId));
				await mod.save();

				// Manually populate the remaining content
				const populatedContent = await Promise.all(mod.content.map(async (item) => {
					let data = null;
					if (item.type === "lesson") {
						data = await Lesson.findById(item.refId);
					} else if (item.type === "quiz") {
						data = await Quiz.findById(item.refId);
					} else if (item.type === "pdf") {
						data = await Pdf.findById(item.refId);
					}
					return {
						type: item.type,
						refId: item.refId,
						data: data || null
					};
				}));

				return {
					...mod.toObject(),
					content: populatedContent
				};
			})
		);

		res.status(200).json({
			message: "Content deleted and module(s) updated",
			affectedModules: updatedModules
		});
	} catch (err) {
		console.error("Error deleting content:", err);
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
    addContentToModule,
    deleteContentById
};
