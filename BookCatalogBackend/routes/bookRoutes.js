const router=require("express").Router();
const auth=require("../middleware/authMiddleware");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
}=require("../controllers/bookController");

router.get("/",getBooks);
router.get("/:id",getBookById);
router.post("/",auth,createBook);
router.put("/:id",auth,updateBook);
router.delete("/:id",auth,deleteBook);

module.exports=router;
