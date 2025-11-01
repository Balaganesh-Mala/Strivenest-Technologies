import Blog from "../models/Blog.js";

/**
 * @desc Create a new blog post
 * @route POST /api/blogs
 */
export const createBlog = async (req, res) => {
  try {
    const { title, image, description, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const blog = await Blog.create({
      title,
      image,
      description,
      content,
      createdBy: req.user ? req.user.id : "Admin",
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Get all blogs
 * @route GET /api/blogs
 */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Get Blogs Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Get single blog by ID
 * @route GET /api/blogs/:id
 */
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Get Blog Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Update blog
 * @route PUT /api/blogs/:id
 */
export const updateBlog = async (req, res) => {
  try {
    const { title, image, description, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, image, description, content },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Delete blog
 * @route DELETE /api/blogs/:id
 */
export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
