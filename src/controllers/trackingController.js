import { Bus, Route } from '../models/index.js';

// Get current location for a bus
export const getBusLocation = async (req, res) => {
  try {
    const bus = await Bus.findOne({ where: { busId: req.params.busId } });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json({ busId: bus.busId, currentLocation: bus.currentLocation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all buses for a route with locations
export const getRouteLocations = async (req, res) => {
  try {
    const buses = await Bus.findAll({
      where: { routeId: req.params.routeId },
      include: [{ model: Route, as: 'Route' }],
    });
    res.json(buses.map(bus => ({
      busId: bus.busId,
      currentLocation: bus.currentLocation,
      status: bus.status,
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};