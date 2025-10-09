import { Bus, Route } from '../models/index.js';

// Get all buses with optional filters
export const getBuses = async (req, res) => {
  try {
    const { routeId, status, page = 1, limit = 10 } = req.query;
    const where = {};
    if (routeId) where.routeId = routeId;
    if (status) where.status = status;

    const buses = await Bus.findAll({
      where,
      include: [{ model: Route, as: 'Route' }],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    const count = await Bus.count({ where });
    res.json({
      buses,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bus by ID
export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findByPk(req.params.id, {
      include: [{ model: Route, as: 'Route' }],
    });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create bus
export const createBus = async (req, res) => {
  try {
    const { busId, registrationNo, operatorName, capacity, routeId } = req.body;
    const bus = await Bus.create({ busId, registrationNo, operatorName, capacity, routeId });
    res.status(201).json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update bus location
export const updateBusLocation = async (req, res) => {
  try {
    const { lat, lng, timestamp } = req.body;
    const bus = await Bus.findByPk(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    bus.currentLocation = { lat, lng, timestamp: timestamp || new Date() };
    await bus.save();
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update bus
export const updateBus = async (req, res) => {
  try {
    const { registrationNo, operatorName, capacity, routeId, status } = req.body;
    const bus = await Bus.findByPk(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    await bus.update({ registrationNo, operatorName, capacity, routeId, status });
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete bus
export const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByPk(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    await bus.destroy();
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};