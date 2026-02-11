const Module = require("../models/Module");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Pdf = require("../models/Pdf");
const Quiz = require("../models/Quiz");

// Helper to verify module ownership
const verifyModuleOwnership = async (moduleId, tenantId) => {
	const module = await Module.findById(moduleId);
	if (!module) return null;

	// Check if the course of this module belongs to the tenant
	const course = await Course.findOne({ _id: module.courseId, tenantId });
	if (!course) return null;

	return module;
};

// Create Module
const createModule = async (req, res) => {
	const { courseId } = req.params;
	const { title, content } = req.body;

	if (!title) return res.status(400).json({ error: "Title is required" });
	// Content is optional on creation

	try {
		// Verify course belongs to tenant
		const course = await Course.findOne({ _id: courseId, tenantId: req.tenant._id });
		if (!course) return res.status(404).json({ error: "Course not found" });

		let processedContent = [];
		if (content && content.length > 0) {
			processedContent = await Promise.all(content.map(async (item) => {
				const { type, data } = item;
				let createdItem;
				if (type === "lesson") createdItem = await Lesson.create(data);
				else if (type === "quiz") createdItem = await Quiz.create(data);
				else if (type === "pdf") createdItem = await Pdf.create(data);
				else throw new Error(`Invalid content type: ${type}`);

				return { type, refId: createdItem._id };
			}));
		}

		const newModule = await Module.create({
			title,
			content: processedContent,
			courseId,
		});

		await Course.findByIdAndUpdate(courseId, { $addToSet: { modules: newModule._id } });

		res.status(201).json({ message: "Module created", module: newModule });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get Modules
const getAllModulesByCourse = async (req, res) => {
	const { courseId } = req.params;
	try {
		// Optional: check if course exists in tenant
		const course = await Course.findOne({ _id: courseId, tenantId: req.tenant._id });
		if (!course) return res.status(404).json({ error: "Course not found" });

		const modules = await Module.find({ courseId });

		// Populate content
		const populatedModules = await Promise.all(modules.map(async (module) => {
			const populatedContent = await Promise.all(module.content.map(async (item) => {
				let fullData;
				if (item.type === "lesson") fullData = await Lesson.findById(item.refId);
				else if (item.type === "quiz") fullData = await Quiz.findById(item.refId);
				else if (item.type === "pdf") fullData = await Pdf.findById(item.refId);
				return { type: item.type, refId: item.refId, data: fullData };
			}));
			return { ...module.toObject(), content: populatedContent };
		}));

		res.status(200).json(populatedModules);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Delete Module
const deleteModule = async (req, res) => {
	const { moduleId, courseId } = req.params;
	try {
		// IDOR Fix: Verify course belongs to tenant
		const course = await Course.findOne({ _id: courseId, tenantId: req.tenant._id });
		if (!course) return res.status(404).json({ error: "Course not found or access denied" });

		const module = await Module.findOne({ _id: moduleId, courseId });
		if (!module) return res.status(404).json({ error: "Module not found" });

		// Delete associated content
		await Promise.all(module.content.map(async (item) => {
			if (item.type === "lesson") await Lesson.findByIdAndDelete(item.refId);
			else if (item.type === "quiz") await Quiz.findByIdAndDelete(item.refId);
			else if (item.type === "pdf") await Pdf.findByIdAndDelete(item.refId);
		}));

		await Module.deleteOne({ _id: moduleId });
		await Course.findByIdAndUpdate(courseId, { $pull: { modules: moduleId } });

		res.status(200).json({ message: "Module deleted" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Add Content to Module
const addContent = async (req, res) => {
	const { moduleId, courseId } = req.params;
	const { content } = req.body;

	if (!content || !Array.isArray(content)) return res.status(400).json({ error: "Content array required" });

	try {
		// Verify Course & Tenant
		const course = await Course.findOne({ _id: courseId, tenantId: req.tenant._id });
		if (!course) return res.status(404).json({ error: "Course not found" });

		const module = await Module.findOne({ _id: moduleId, courseId });
		if (!module) return res.status(404).json({ error: "Module not found" });

		const newItems = await Promise.all(content.map(async (item) => {
			const { type, data } = item;
			let createdItem;
			if (type === "lesson") createdItem = await Lesson.create(data);
			else if (type === "quiz") createdItem = await Quiz.create(data);
			else if (type === "pdf") createdItem = await Pdf.create(data);
			else throw new Error(`Invalid type: ${type}`);
			return { type, refId: createdItem._id };
		}));

		const updatedModule = await Module.findByIdAndUpdate(
			moduleId,
			{ $push: { content: { $each: newItems } } },
			{ new: true }
		);

		res.status(200).json({ message: "Content added", module: updatedModule });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Delete Content
const deleteContent = async (req, res) => {
	const { moduleId, type, refId } = req.params;
	try {
		// IDOR Fix: Verify Module and Tenant Ownership
		const module = await verifyModuleOwnership(moduleId, req.tenant._id);
		if (!module) return res.status(404).json({ error: "Module not found or access denied" });

		// Ensure the content item actually belongs to this module
		const contentItem = module.content.find(item => item.refId.toString() === refId && item.type === type);
		if (!contentItem) {
			return res.status(404).json({ error: "Content item not found in this module" });
		}

		if (type === "lesson") await Lesson.findByIdAndDelete(refId);
		else if (type === "quiz") await Quiz.findByIdAndDelete(refId);
		else if (type === "pdf") await Pdf.findByIdAndDelete(refId);

		const updatedModule = await Module.findByIdAndUpdate(
			moduleId,
			{ $pull: { content: { type, refId } } },
			{ new: true }
		);
		res.status(200).json({ message: "Content deleted", module: updatedModule });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	createModule,
	getAllModulesByCourse,
	deleteModule,
	addContent,
	deleteContent
};
