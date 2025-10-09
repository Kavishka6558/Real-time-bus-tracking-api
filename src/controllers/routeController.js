import { Route, Trip, Bus } from '../models/index.js';

// Get all routes with pagination
export const getRoutes = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const routes = await Route.findAll({
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    const count = await Route.count();
    res.json({
      routes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get route by ID with scheduled trips
export const getRouteById = async (req, res) => {
  try {
    const route = await Route.findByPk(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });

    const trips = await Trip.findAll({
      where: { routeId: req.params.id },
      include: [{ model: Bus, as: 'Bus' }],
    });
    res.json({ route, trips });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create route
export const createRoute = async (req, res) => {
  try {
    const { code, name, origin, destination, stops, distanceKm, estimatedDurationMin } = req.body;
    const route = await Route.create({ code, name, origin, destination, stops, distanceKm, estimatedDurationMin });
    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update route
export const updateRoute = async (req, res) => {
  try {
    const { code, name, origin, destination, stops, distanceKm, estimatedDurationMin } = req.body;
    const route = await Route.findByPk(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });

    await route.update({ code, name, origin, destination, stops, distanceKm, estimatedDurationMin });
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete route
export const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByPk(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });

    await route.destroy();
    res.json({ message: 'Route deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};