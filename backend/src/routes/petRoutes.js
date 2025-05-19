const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middlewares/authMiddleware');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});
const upload = multer({ storage });

// Listar pets
router.get('/', async (req, res) => {
  const pets = await prisma.pet.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(pets);
});

// Criar pet
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  const { name, age, breed, whatsapp } = req.body;
  const image = req.file.filename;

  const pet = await prisma.pet.create({
    data: {
      name,
      age,
      breed,
      image,
      whatsapp,
      userId: req.user.id,
    },
  });

  res.status(201).json(pet);
});

// Marcar como adotado
router.patch('/:id/adopt', authenticateToken, async (req, res) => {
  const petId = parseInt(req.params.id);

  const pet = await prisma.pet.update({
    where: { id: petId },
    data: { adopted: true },
  });

  // Converte a imagem para preto e branco com Sharp
  const imagePath = path.join(__dirname, '..', '..', 'uploads', pet.image);
  const bwImagePath = imagePath.replace(/(\.\w+)$/, '-bw$1');

  await sharp(imagePath).grayscale().toFile(bwImagePath);
  fs.renameSync(bwImagePath, imagePath); // Sobrescreve a original

  res.json({ message: 'Pet marcado como adotado', pet });
});

module.exports = router;
