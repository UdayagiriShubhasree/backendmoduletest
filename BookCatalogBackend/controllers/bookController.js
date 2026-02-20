const Book = require("../models/Book");

exports.createBook = async(req,res)=>{
  try{
    const book = await Book.create(req.body);
    res.status(201).json(book);
  }catch{
    res.status(500).json({message:"Server error"});
  }
};

exports.getBooks = async(req,res)=>{
  const books = await Book.find();
  res.json(books);
};

exports.getBookById = async(req,res)=>{
  const book = await Book.findById(req.params.id);
  res.json(book);
};

exports.updateBook = async(req,res)=>{
  const book = await Book.findByIdAndUpdate(
    req.params.id, req.body, {new:true});
  res.json(book);
};

exports.deleteBook = async(req,res)=>{
  await Book.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
};
