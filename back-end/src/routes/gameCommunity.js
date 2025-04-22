const express = require('express');
const router = express.Router();
const prisma = require('../../prisma');
const tokenAuth = require('../middleware/TokenAuth');

// Get all communities
router.get('/all', async (req, res, next) => {
    try {
      const communities = await prisma.gameCommunity.findMany();

      if (!communities || communities.length === 0) {
        return res.status(404).json({ error: 'No communities found' });
      }

      res.status(200).json(communities);
    } catch (error) {
      next(error);
    }
  });

// Get single community by ID
router.get('/:id', async (req, res, next) => {
    try {
      const id = +req.params.id;
      const community = await prisma.gameCommunity.findUnique({ where: { id } });

      if (!community) return res.status(404).json({ error: 'Community not found' });

      res.status(200).json(community);
    } catch (error) {
      next(error);
    }
  });

// Create community
router.post('/create', tokenAuth, async (req, res, next) => {
  try {
    const { gameName, description, coverImage } = req.body;

    if (!gameName) return res.status(400).json({ error: 'Missing game name' });

    const existing = await prisma.gameCommunity.findUnique({ where: { gameName } });
    if (existing) return res.status(400).json({ error: 'Community already exists' });

    const newCommunity = await prisma.gameCommunity.create({
      data: { gameName, description, coverImage },
    });

    res.status(201).json(newCommunity);
  } catch (error) {
    next(error);
  }
});

// Update community
router.put('/update/:id', tokenAuth, async (req, res, next) => {
    try {
      const id = +req.params.id;
      const { gameName, description, coverImage, isActive } = req.body;
      const existing = await prisma.gameCommunity.findUnique({ where: { id } });

      if (!existing) return res.status(404).json({ error: 'Community not found' });
  
      const updated = await prisma.gameCommunity.update({
        where: { id },
        data: { gameName, description, coverImage, isActive },
      });

      res.status(200).json({ message: 'Community updated', updated });
    } catch (error) {
      next(error);
    }
  });

// Delete community 
router.delete('/delete/:id', tokenAuth, async (req, res, next) => {
  try {
    const id = +req.params.id;
    const existing = await prisma.gameCommunity.findUnique({ where: { id } });

    if (!existing) return res.status(404).json({ error: 'Community not found' });

    await prisma.gameCommunity.delete({ where: { id } });
    
    res.status(200).json({ message: 'Community deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
