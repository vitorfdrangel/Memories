const Memory = require("../models/Memory");

const fs = require("fs");

// deletar Imagem do banco
const removeOldImage = (memory) => {
  fs.unlink(`public/${memory.src}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Imagem excluída do servidor!");
    }
  });
};

const createMemory = async (req, res) => {
  try {
    const { title, description } = req.body;

    const src = `images/${req.file.filename}`;

    if (!title || !description) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos." });
    }

    const newMemory = new Memory({
      title,
      src,
      description,
    });

    await newMemory.save();

    res.json({ msg: "Memória criada com sucesso!", newMemory });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Ocorreu um erro!");
  }
};

const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find();

    res.json(memories);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Ocorreu um erro!");
  }
};

const getMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada!" });
    }

    res.json(memory);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Ocorreu um erro!");
  }
};

const deleteMemory = async (req, res) => {
  try {
    const memoryDeleted = await Memory.findByIdAndDelete(req.params.id);

    if (!memoryDeleted) {
      return res.status(404).json({ msg: "Memória não encontrada!" });
    }

    removeOldImage(memoryDeleted);

    res.json({ msg: "Memória excluída com sucesso!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Ocorreu um erro!");
  }
};

module.exports = {
  createMemory,
  getMemories,
  getMemory,
  deleteMemory,
};
