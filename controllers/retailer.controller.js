import Retailer from '../models/retailer.model.js';
import { retailerListQuerySchema } from '../validations/retailer.validation.js';
import mongoose from 'mongoose';

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI/180;
  const dLon = (lon2 - lon1) * Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

export const getRetailers = async (req, res, next) => {
  try {
    const { search, category, lat, lng, radiusKm, page = 1, limit = process.env.DEFAULT_PAGE_SIZE || 10 } = retailerListQuerySchema.parse(req.query);
    
    const query = {};

    if (search?.trim()) {
      query.name = { $regex: new RegExp(search.trim(), 'i') };
    }

    if (category?.trim()) {
      const categories = category.split(',').map(c => c.trim());
      query.category = { $in: categories };
    }

    let retailers = await Retailer.find(query);

    if (lat !== undefined && lng !== undefined) {
      retailers = retailers.map(r => ({
        ...r.toObject(),
        distance: haversineDistance(lat, lng, r.latitude, r.longitude)
      })).sort((a, b) => a.distance - b.distance);

      if (radiusKm !== undefined) {
        retailers = retailers.filter(r => r.distance <= radiusKm);
      }
    }

    const total = retailers.length;
    const paginated = retailers.slice((page - 1) * limit, page * limit);

    res.json({ total, page: Number(page), limit: Number(limit), data: paginated });
  } catch (err) {
    next(err);
  }
};

export const getRetailerById = async (req, res, next) => {
  try {
    if(!req.params.id) return res.status(400).json({ error: 'Retailer ID is required' });

    const retailer = await Retailer.findById(req.params.id);
    if (!retailer) return res.status(404).json({ error: 'Retailer not found' });

    res.json(retailer);
  } catch (err) {
    next(err);
  }
};

export const getWhatsappLink = async (req, res, next) => {
  try {
    if(!req.params.id) return res.status(400).json({ error: 'Retailer ID is required' });

    const retailer = await Retailer.findById(req.params.id);
    if (!retailer) return res.status(404).json({ error: 'Retailer not found' });

    const link = `https://wa.me/${retailer.phoneNumber}?text=Hi`;
    res.json({ whatsappLink: link });
  } catch (err) {
    next(err);
  }
};
